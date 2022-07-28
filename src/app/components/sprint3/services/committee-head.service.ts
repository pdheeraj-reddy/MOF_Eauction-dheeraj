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
      this.envService.environment.apiOfferReport.replace('{auctionId}', auctionId), httpOptions);
  }

  updateOpenOfferStatus(data: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken || localStorage.getItem("x-csrf-token"),
      },
    };
    if (httpOptions) {
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiOpenOfferStatus
      , JSON.stringify(data), httpOptions);
  }
}
