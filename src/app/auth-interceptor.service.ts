import { Injectable } from '@angular/core';
import { HttpRequest, HttpXsrfTokenExtractor, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,  Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _authService: AuthService,
    private cookieService:CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  //for APIGEE API Communication
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = '';
    let idToken = '';
    let refreshToken = '';
    accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    idToken = this.cookieService.get('IDM_IDTOKEN');
    refreshToken = this.cookieService.get('IDM_REFRESSACCESSTOKEN');

    if(this._authService.loggedIn()){
      const authReq = request.clone( {
      setHeaders: {
          // ------- For Development
          'X_MOF_ClientID': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
          'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
          // ------- For Pre-Prod
          // 'X_MOF_ClientID': '7iKt89yh9aSb47xpBHrbxF3tRf3BliFY',
          // 'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
          // ------- For Prod
          // 'X_MOF_ClientID': '7iKt89yh9aSb47xpBHrbxF3tRf3BliFY',
          // 'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
          // ------- Common
          // 'IDM_Token': accessToken,
          // 'X_User_Role': 'InteriorMarketer',
          'Authorization': 'Bearer ' + accessToken,
          'withCredentials': 'true',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'*',
          'Access-Control-Allow-Headers':'*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age' : "1728000",
          //'X-Requested-With': 'X'
        }
      });
      return next.handle(authReq);
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
      request = request.clone( {
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

}