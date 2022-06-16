import { Injectable } from '@angular/core';
import { HttpRequest, HttpXsrfTokenExtractor, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { EnvService } from './env.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dialogObj: any;

  constructor(
    private _authService: AuthService,
    private cookieService: CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private envService: EnvService,
    private dialog: MatDialog,
  ) {

  }

  //for APIGEE API Communication
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let accessToken = '';
    let idToken = '';
    let refreshToken = '';
    accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    idToken = this.cookieService.get('IDM_IDTOKEN');
    refreshToken = this.cookieService.get('IDM_REFRESSACCESSTOKEN');
    if (this._authService.loggedIn() && this.envService.environment) {
      const authReq = request.clone({
        setHeaders: {
          'X_MOF_ClientID': this.envService.environment.clientId,
          'X_MOF_RqUID': this.envService.environment.ruId,
          'Authorization': 'Bearer ' + accessToken,
          'withCredentials': 'true',
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': '*',
          // 'Access-Control-Allow-Headers': '*',
          // 'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': "1728000",
        }
      });
      return next.handle(authReq).pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse && (error.status === 500 || error.status === 501)) {
          // display error popup message
          this.dialogObj = {
            message : 'ServiceUnavailable',
            mnBtnAction : 'close',
            mnBtntext: 'OK'
          }
          this.handleServerError();
        }
        return throwError(error);
      }));
      // return next.handle(authReq).pipe(catchError(error => {
      //   if (error instanceof HttpErrorResponse && error.status === 401) {
      //     console.log('Token has expired');
      //     // return this.handle401Error(authReq, next);
      //     const redirectUrl = environment.idmLoginURL;
      //     console.log('redirectUrl ➼ ', redirectUrl);
      //     window.location.href = redirectUrl;
      //   }
      //   return throwError(error);
      // }));
    } else {
      request = request.clone({
        setHeaders: ({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        })
      });
      return next.handle(request);
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.cookieService.get('IDM_ACCESSTOKEN'); // Refresh Token
      if (token)
        return this._authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            // Set New Token
            this.cookieService.set('IDM_ACCESSTOKEN', token);
            this.cookieService.set('IDM_REFRESSACCESSTOKEN', token);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('X_MOF_ClientID', token) });
  }

  private handleServerError() {
    this.dialog.open(AlertModalComponent, { 
      data: this.dialogObj
    });
  }

}