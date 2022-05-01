import { Injectable } from '@angular/core';
import { HttpRequest, HttpXsrfTokenExtractor, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,  Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private cookieService:CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  //for Local SAP API Communication
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    let idToken = this.cookieService.get('IDM_IDTOKEN');
    
    if(!!accessToken && !!idToken){
      const AuthRequest = request.clone( {
      setHeaders: {
        'Authorization': 'Basic QUJBQUJBUEVSOlNhcEAxMjM0NQ==',
        'X_MOF_ClientID': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        'withCredentials': 'true',
        'Cookie': 'sap-usercontext=sap-client=100',
        'Content-Type': 'application/json',
        }
      });
     return next.handle(AuthRequest);
    } else {
      request = request.clone( {
        setHeaders: ({
          'Authorization': 'Basic QUJBQUJBUEVSOlNhcEAxMjM0NQ==',
          'X_MOF_ClientID': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
          'X_MOF_RqUID': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
          'withCredentials': 'true',
          'Cookie': 'sap-usercontext=sap-client=100',
          'Content-Type': 'application/json',
          })
        });
      return next.handle(request);
    }
  }

}