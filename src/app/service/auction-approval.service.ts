import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from './auction.service';

@Injectable({
  providedIn: 'root',
})
export class AuctionApprovalService {
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    public auctionServc: AuctionService,
    ) {}

  getAuctionDetails(ObjectId: string,): Observable<any> {
    let role = '', config1 = '', config2 = '';
    if (this.auctionServc.loggedUserRole.isInteriorMarketer) {
      role = "InteriorMarketer";
      config1 = "?$expand=pagetolistnav";
      config2 = "";
    } else if(this.auctionServc.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.auctionServc.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.auctionServc.loggedUserRole.isPricingHead){
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    }
    let $filters = (ObjectId !== '' ? " and ObjectId eq '" + ObjectId + "'" : '');
    console.log('$filters ', $filters);
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': role,
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    let queryId = ObjectId;
    console.log('queryId for Encrypt');
    //let encyptQueryId = CryptoJS.AES.encrypt(queryId.trim(), 'sathya'.trim()).toString();
    return this.http.get<any>( 
      // 'https://10.13.85.56:9443' + 
      environment.apiAuctionURL + '/' + btoa(ObjectId) +
      "?$expand=listtoproductnav,listtoattachnav" +
      "&$format=json" 
      , httpOptions);
    
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
      environment.apiAuctionURL + '/approve',
      JSON.stringify(payload),
      httpOptions
    );
  }

  getCommitteeMembersBasedOnRole(role: String){
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        // 'X_User_Role': role,
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>( 
      environment.apiAuctionURL + '/committees' + "$filter = EmployeeRole eq '" + role
      + "?$format=json", 
      httpOptions
      );
    // return this.http.get<any>(
    //   'http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet?' +
    //     "$filter=EmployeeRole eq '" +
    //     role +
    //     "'&$format=json",
    //   httpOptions
    // );
  }

}
