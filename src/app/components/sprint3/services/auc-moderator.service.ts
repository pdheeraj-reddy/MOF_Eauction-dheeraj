import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { EnvService } from 'src/app/env.service';
import { BidderService } from './bidder.service';

@Injectable({
  providedIn: 'root'
})
export class AucModeratorService {

  constructor( 
    private http: HttpClient,
    private envService: EnvService,
    private cookieService:CookieService,
    private bidder : BidderService,
  ) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  postAppporRej(data:any,action: any):Observable<any>{
    let data1 = {
    "AucId": data.AucId,
    "BidderId": data.BidderId,
    "ZzUserAction": action
    }

    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.bidder.XCSRFToken
      },
      params: {
      }
    };
    return this.http.post<any>( 
      // 'https://10.13.85.56:9443' + 
      this.envService.environment.apiAppRej
      , data1
      , httpOptions);

  }

  getLatestBiddetails(ObjectId: string, PageNo: string) : Observable<any> {

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'InteriorMarketer',
      },
      params: {
      },
      observe: 'response' as 'body'
    };

    return this.http.get<any>( 
      this.envService.environment.apiLatestBid + 
      "?$expand=pagetoaucbiddernav" + 
      "&$filter=(ObjectId eq '" + ObjectId + "' and PageNo eq '" + PageNo + "' )&$format=json" 
      , httpOptions);


  }
}
