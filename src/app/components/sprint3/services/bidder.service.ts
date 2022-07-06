import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/env.service';
import { AuctionService } from 'src/app/service/auction.service';


@Injectable({
  providedIn: 'root'
})
export class BidderService {
  XCSRFToken: any;
  constructor(
    private http: HttpClient,
    private envService: EnvService,
    public auctionServc: AuctionService,
  ) { }

  getAuctionList(page: any, filters: any): Observable<any> {
    // let retRole = this.auctionService.getLoggedUserRole();
    let config1 = '', config2 = '';
    // let role = retRole;
    // console.log(retRole);
    config1 = "?$expand=page1tolistnav";
    config2 = " and ScreenNav eq 'A'";
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;

    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidType !== '' ? " and BidType eq '" + filters.BidType + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '') + (filters.Msgty !== '' ? " and Msgty eq '" + filters.Msgty + "'" : '');
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

  getAuctionDetail(auctionId?:any):Observable<any>{
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
    return this.http.get<any>(this.envService.environment.apiBidderAuctions+"/"
    +auctionId+"?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav&$format=json",httpOptions);
  }

  makeParticipateIn(participationDetails?:any):Observable<any>{
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string,
      },
      params: {
      }
    };
    if(httpOptions){
      console.log(httpOptions);
    }
    return this.http.post<any>(this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(participationDetails),httpOptions);
  }
}
