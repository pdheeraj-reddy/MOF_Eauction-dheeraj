import { HttpClient, HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor( 
    private http: HttpClient,
    handler: HttpBackend,
    private cookieService:CookieService 
  ) {
    this.http = new HttpClient(handler);
   }

  //for creating Auction as Draft
  uploadAuctionImages(fileNetAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        "Authorization" : "Basic RXRpdGU6dHMhIWh2TjJLJEE="
      },
      params: {
      }
    };
    return this.http.post<any>( 
      // 'https://10.13.85.56:9443' + 
      environment.apiFilenetURL
      , JSON.stringify(fileNetAuctionRequest)
      , httpOptions);
    
  }

}