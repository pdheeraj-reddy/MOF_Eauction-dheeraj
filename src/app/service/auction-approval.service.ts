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
    return this.http.get<any>( 
      // 'https://10.13.85.56:9443' + 
      environment.apiAuctionURL + '/' + ObjectId +
      "?$expand=listtoproductnav,listtoattachnav" +
      "&$format=json" 
      , httpOptions);
    
  }

  approveOrRejectAuction(payload: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers':
          'X-CSRF-Token, Origin, X-Requested-With, Content-Type, Accept',
        Authorization: 'Basic QUJBQUJBUEVSOlNhcEAxMjM0NQ==',
        X_MOF_ClientID: '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        X_MOF_RqUID: '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        withCredentials: 'true',
        Cookie: 'sap-usercontext=sap-client=100',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.auctionServc.XCSRFToken as string,
      }),
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
