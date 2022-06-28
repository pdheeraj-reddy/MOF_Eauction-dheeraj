import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { AuctionService } from 'src/app/service/auction.service';
import { EnvService } from 'src/app/env.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuctionModeratorService {
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    public auctionServc: AuctionService,
    private envService: EnvService,
  ) {}

  //for getting Auction List with Filters
  getAuctionList(page: any, filters: any): Observable<any> {
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;
    const userid = page.userId ? page.userId : '1827879980';
    console.log(filters, 'hari');

    let $filters =
      (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') +
      (filters.ObjectId !== ''
        ? " and ObjectId eq '" + filters.ObjectId + "'"
        : '') +
      (filters.Description !== ''
        ? " and Description eq '" + filters.Description + "'"
        : '') +
      (filters.BidType !== ''
        ? " and BidType eq '" + filters.BidType + "'"
        : '') +
      (filters.StartDate !== ''
        ? " and ZzAucSrtDt eq '" + filters.StartDate + "'"
        : '') +
      (filters.EndDate !== ''
        ? " and ZzAucEndDt eq '" + filters.EndDate + "'"
        : '');
    console.log('$filters ', $filters);

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        X_User_Role: 'AuctionManager',
      },
      params: {},
      observe: 'response' as 'body',
    };
    let userRole = this.getUserInfo();
    var url;
    if (userRole.roles == 'EAuction_AuctionManager') {
      url =
        this.envService.environment.apiAuctionURL +
        '?$expand=page1tolistnav' +
        "&$filter=(PageLimit eq '" +
        pageLimit +
        "' and PageNo eq '" +
        pageNumber +
        "' and ScreenNav eq 'R" +
        "'" +
        $filters +
        ')&$format=json';
    } else {
      url =
        this.envService.environment.apiAuctionURL +
        '?$expand=page1tolistnav' +
        "&$filter=(PageLimit eq '" +
        pageLimit +
        "' and PageNo eq '" +
        pageNumber +
        "'" +
        $filters +
        ')&$format=json';
    }

    return this.http.get<any>(url, httpOptions);
  }

  public getUserInfo() {
    return localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') as string)
      : '';
  }

  // for getting Auction details for ObjectId
  getAuctionDetails(ObjectId: string, DraftId?: string): Observable<any> {
    let $filters =
      (ObjectId !== '' ? " and ObjectId eq '" + ObjectId + "'" : '') +
      (DraftId !== '' ? " and DraftId eq '" + DraftId + "'" : '');
    console.log('$filters ', $filters);
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        X_User_Role: 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    let queryId = (DraftId && DraftId != '0') ? DraftId : ObjectId;
    console.log('queryId for Encrypt');
    let encyptQueryId = CryptoJS.AES.encrypt(queryId.trim(), 'sathya'.trim()).toString();
    return this.http.get<any>(
      // 'https://10.13.85.56:9443' +
      this.envService.environment.apiAuctionURL +
      '/' +
      ObjectId +
      '?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav' +
      '&$format=json',
      httpOptions
    );
  }

  getCommitteeMembersBasedOnRole(role: String): Observable<any> {
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        X_User_Role: 'AuctionManager',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>(
      // 'https://10.13.85.56:9443' +
      this.envService.environment.apiCommiteeURL +
      '?$filter=EmployeeRole eq' +
      "'" +
      role +
      "'" +
      ' &$format=json ',
      httpOptions
    );
  }

  approveOrRejectAuction(payload: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.auctionServc.XCSRFToken as string,
        'X-Requested-With': 'X',
        X_User_Role: 'AuctionManager',
      },
      params: {},
    };
    return this.http.post<any>(
      this.envService.environment.apiAuctionURL + '/approve',
      JSON.stringify(payload),
      httpOptions
    );
  }
}
