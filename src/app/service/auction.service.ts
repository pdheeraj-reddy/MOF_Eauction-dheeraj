import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  loggedUser : any;
  loggedUserRole : any;

  constructor( 
    private http: HttpClient,
    private cookieService:CookieService 
  ) { }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  hasUserRole(role: string){
    if(this.loggedUser.roles == role){
      return true;
    }
    return false;
  }

  getLoggedUserRole(){
    this.loggedUserRole = {
      isSalesHead : this.hasUserRole("EAuction_SalesCommitteeChairman"),
      isSalesSecretary : this.hasUserRole("EAuction_SalesCommitteSecretary"),
      isInteriorMarketer : this.hasUserRole("EAuction_InteriorMarketer"),
      isAuctionModerator : this.hasUserRole("EAuction_AuctionManager"),
      isSalesMember : this.hasUserRole("EAuction_SalesCommitteeMember"),
      isPricingMember : this.hasUserRole("EAuction_PricingCommitteeMember"),
      isPricingSecretary : this.hasUserRole("EAuction_PricingCommitteSecretary"),
      isPricingHead : this.hasUserRole("EAuction_PricingCommitteeChairman")
    }
    return this.loggedUserRole
  }

  //for getting Auction List with Filters
  getAuctionList(page: any, filters: any): Observable<any> {
    let role = '', config1 = '', config2 = '';
    if (this.loggedUserRole.isInteriorMarketer) {
      role = "InteriorMarketer";
      config1 = "?$expand=pagetolistnav";
      config2 = "";
    } else if(this.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.loggedUserRole.isPricingHead){
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    }
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;

    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidType !== '' ? " and BidType eq '" + filters.BidType + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '') + (filters.Msgty !== '' ? " and Msgty eq '" + filters.Msgty + "'" : '');
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
      // 'http://10.13.85.57:9001' + 
      environment.apiAuctionURL + 
      config1 + 
      "&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "'" + $filters + config2 + ")&$format=json" 
      , httpOptions);
    
  }

  // for getting Auction details for ObjectId
  getAuctionDetails(ObjectId: string, DraftId?: string): Observable<any> {
    let role = '', config1 = '', config2 = '';
    if (this.loggedUserRole.isInteriorMarketer) {
      role = "InteriorMarketer";
      config1 = "?$expand=pagetolistnav";
      config2 = "";
    } else if(this.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if(this.loggedUserRole.isPricingHead){
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    }
    let $filters = (ObjectId !== '' ? " and ObjectId eq '" + ObjectId + "'" : '') + (DraftId !== '' ? " and DraftId eq '" + DraftId + "'" : '');
    console.log('$filters ', $filters);
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': role,
      },
      params: {
      }
    };
    return this.http.get<any>( 
      // 'https://10.13.85.56:9443' + 
      environment.apiAuctionURL + '/' + ObjectId +
      "?$expand=listtoproductnav,listtoattachnav" +
      "&$format=json" 
      , httpOptions);
    
  }

  //for creating Auction as Draft
  createAuction(createAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem("x-csrf-token") as string
      },
      params: {
      }
    };
    return this.http.post<any>( 
      // 'https://10.13.85.56:9443' + 
      environment.apiAuctionURL
      , JSON.stringify(createAuctionRequest)
      , httpOptions);
    
  }

  //for creating Auction as Draft
  uploadAuctionImages(fileNetAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem("x-csrf-token") as string
      },
      params: {
      }
    };
    return this.http.post<any>( 
      // 'http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_FILENET_SRV/FileAttachmentSet'
      environment.apiFilenetURL
      , JSON.stringify(fileNetAuctionRequest)
      , httpOptions);
    
  }

  //for Download
  downloadAuctionImages(fileId: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem("x-csrf-token") as string
      },
      params: {
      }
    };
    return this.http.get<any>( 
      environment.apiFilenetURL + '/' + fileId 
      , httpOptions);
  }

  //for Download
  deleteAuctionImages(fileId: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': localStorage.getItem("x-csrf-token") as string
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.delete<any>( 
      environment.apiFilenetURL + '/' + fileId 
      , httpOptions);
  }
  
  public logout() {
    this.cookieService.deleteAll('/', '.mof.gov.sa');
    localStorage.clear();
    const redirectUrl = environment.idmLogoutUrl;
    window.location.href = redirectUrl;
    // this.router.navigate(['/']);
  }

}