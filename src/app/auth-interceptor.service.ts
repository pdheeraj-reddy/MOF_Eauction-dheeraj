import { Injectable } from '@angular/core';
import { HttpRequest, HttpXsrfTokenExtractor, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,  Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private cookieService:CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  //for APIGEE API Communication
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = '';
    let idToken = '';
    accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    idToken = this.cookieService.get('IDM_IDTOKEN');

    if(this._authService.loggedIn()){
      const AuthRequest = request.clone( {
      setHeaders: {
          // ------- For Development
          // 'X_MOF_ClientID': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
          // 'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
          // ------- For Pre-Prod
          'X_MOF_ClientID': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
          'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
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
     return next.handle(AuthRequest);
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

}