import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  // getToken(): Observable<string> {
  //   const httpOptions = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     params: {
  //     }
  //   };
  //   return this.http.get<string>(environment.loginURL , httpOptions);
  // }

}