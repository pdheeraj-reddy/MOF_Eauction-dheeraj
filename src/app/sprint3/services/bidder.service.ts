import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvService } from 'src/app/env.service';


@Injectable({
  providedIn: 'root'
})
export class BidderService {
  XCSRFToken: any;
  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) { }

  getAuctionList(page: any, filters: any): Observable<any> {
    let role = '', config1 = '', config2 = '';
    role = "AuctionManager";
    config1 = "?$expand=page1tolistnav";
    config2 = " and ScreenNav eq 'A'";
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;

    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidMethod !== '' ? " and BidMethod eq '" + filters.BidMethod + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '') + (filters.Msgty !== '' ? " and Msgty eq '" + filters.Msgty + "'" : '');
    console.log('$filters ', $filters);

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    console.log('apiBidderAuctions', this.envService.environment.apiBidderAuctions);
    return this.http.get<any>(
      this.envService.environment.apiBidderAuctions +
      config1 +
      "&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "'" + $filters + config2 + ")&$format=json"
      , httpOptions);

  }

  getAuctionDetail(auctionId?: any): Observable<any> {
    console.log("Function called");
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiBidderAuctions + "/"
      + btoa(auctionId) + "?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav&$format=json", httpOptions);
  }

  downloadAuctionImages(fileId: any): Observable<any> {

    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      }
    };
    return this.http.get<any>(this.envService.environment.apiFilenetURL + '/' + fileId, httpOptions)
  }

  makeParticipateIn(auctionId?: any): Observable<any> {
    let participationDetails = {
      "AucId": auctionId,
      "ZzUserAction": "P"
    }
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    if (httpOptions) {
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(participationDetails), httpOptions);
  }
  manualAuctionStart(auctionId: any) {
    let participationDetails = {
      "AucId": auctionId,
      "ZzUserAction": "O"
    }
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    if (httpOptions) {
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(participationDetails), httpOptions);
  }
  submitBid(auctionId?: any, bidAmt?: any): Observable<any> {
    let bidDetails = {
      "AucId": auctionId,
      "BidderValue": bidAmt,
      "ZzUserAction": "B"
    }
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    if (httpOptions) {
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(bidDetails), httpOptions);
  }
  uploadFile(file: any) {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    return this.http.post<any>(this.envService.environment.apiFilenetURL
      , JSON.stringify(file), httpOptions);
  }
  submitFbga(auctionId?: any): Observable<any> {
    let bidDetails = {
      "AucId": auctionId,
      "ZzUserAction": "F"
    }
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    if (httpOptions) {
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(bidDetails), httpOptions);
  }
  getInvoiceDetails(auctionId: any) {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiFinalInvoiceReport +
      "/" + btoa(auctionId) + "/awardedBidderInvoices?", httpOptions)
  }

  getNoOfParticipants(auctionId: any, auctionStatus: any): Observable<any> {

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiBidderParticipantsBids +
      "?auctionId=" + btoa(auctionId) + "&status=" + auctionStatus, httpOptions)

  }
  getMyAuctionsList(filters: any, pageLimit: any, status: string, pageNumber?: number): Observable<any> {

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiBidderMyAuctions +
      "?$expand=page1tolistnav" +
      "&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "' and ScreenNav eq 'M'" + filters + ")&$format=json", httpOptions)

  }

  getMyInvoiceList(): Observable<any> {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiBidderMyInvoices, httpOptions)
  }

  getOfferList(auctionId: string): Observable<any> {
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
    return this.http.get<any>(this.envService.environment.apiSendInvoice.replace('{auctionId}', btoa(auctionId)) + "&$format=json", httpOptions);
  }

  downloadInvoice(auctionId: string) {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch'
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(this.envService.environment.apiSendInvoice.replace('{auctionId}', btoa(auctionId)), httpOptions);
  }
}
