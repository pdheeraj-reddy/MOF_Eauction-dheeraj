import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root'
})
export class CommitteeHeadService {
  XCSRFToken: any;
  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) { }

  getOpenOfferList(auctionId: string): Observable<any> {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch'
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(
      this.envService.environment.apiOfferReport.replace('{auctionId}', btoa(auctionId)), httpOptions);
  }

  getHighestOffer(auctionId: string): Observable<any> {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch'
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(
      this.envService.environment.apiOfferReport.replace('{auctionId}', btoa(auctionId) + "L"), httpOptions);
  }

  updateOpenOfferStatus(data: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken || localStorage.getItem("x-csrf-token"),
      },
    };
    return this.http.post<any>(this.envService.environment.apiOpenOfferStatus
      , JSON.stringify(data), httpOptions);
  }

  downloadAuctionImages(fileId: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      }
    };
    return this.http.get<any>(
      this.envService.environment.apiFilenetURL + '/' + fileId
      , httpOptions);
  }
}
