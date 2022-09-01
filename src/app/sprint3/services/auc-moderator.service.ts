import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { EnvService } from 'src/app/env.service';
import { BidderService } from './bidder.service';

@Injectable({
  providedIn: 'root'
})
export class AucModeratorService {
  XCSRFToken: any;

  constructor(
    private http: HttpClient,
    private envService: EnvService,
    private bidder: BidderService,
  ) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  postAppporRej(data: any, action?: any): Observable<any> {


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
      , data
      , httpOptions);

  }

  getLatestBiddetails(ObjectId: string, PageNo: string): Observable<any> {

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
      "" + btoa(ObjectId) + "/bidders?pageNumber=" + PageNo
      , httpOptions);


  }

  getSendInvoice(auctionId: string) {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiSendInvoice.replace('{auctionId}', btoa(auctionId)), httpOptions);
  }

  sendInvoice(auctionId?: any, bidderId?: any): Observable<any> {
    let invoiceDetails = {
      "AucId": auctionId,
      "BidderId": bidderId,
      "ZzUserAction": "N"
    }
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(invoiceDetails), httpOptions);
  }

  downloadAuctionImages(fileId: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      }
    };
    return this.http.get<any>(this.envService.environment.apiFilenetURL + '/' + fileId, httpOptions);
  }
}
