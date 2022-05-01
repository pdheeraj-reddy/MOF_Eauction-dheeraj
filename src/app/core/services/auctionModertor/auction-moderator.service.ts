import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuctionModeratorService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // for getting Auction details for ObjectId
  getAuctionDetailsApiGee(ObjectId: string, DraftId?: string): Observable<any> {
    let $filters =
      (ObjectId !== '' ? " and ObjectId eq '" + ObjectId + "'" : '') +
      (DraftId !== '' ? " and DraftId eq '" + DraftId + "'" : '');
    console.log('$filters ', $filters);
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
      },
      params: {},
    };
    return this.http.get<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiAuctionURL +
        '/' +
        ObjectId +
        '?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav' +
        '&$format=json',
      httpOptions
    );
  }

  //for creating Auction as Draft
  createAuctionApiGee(createAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem('x-csrf-token') as string,
      },
      params: {},
    };
    return this.http.post<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiAuctionURL,
      JSON.stringify(createAuctionRequest),
      httpOptions
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

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
        environment.apiAuctionURL +
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
        environment.apiAuctionURL +
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
      params: {},
    };
    return this.http.get<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiAuctionURL +
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
      params: {},
    };
    return this.http.get<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiCommiteeURL +
        '/' +
        '?$filter=EmployeeRole eq' +
        "'" +
        role +
        "'" +
        ' &$format=json ',
      httpOptions
    );
  }

  //for creating Auction as Draft
  createAuction(createAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem('x-csrf-token') as string,
      },
      params: {},
    };
    return this.http.post<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiAuctionURL,
      JSON.stringify(createAuctionRequest),
      httpOptions
    );
  }

  approveOrRejectAuction(payload: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem('x-csrf-token') as string,
        'X-Requested-With': 'X',
        X_User_Role: 'AuctionManager',
      },
      params: {},
    };
    return this.http.post<any>(
      // 'https://10.13.85.56:9443' +
      environment.apiAuctionURL + '/approve',
      JSON.stringify(payload),
      httpOptions
    );
  }
}
