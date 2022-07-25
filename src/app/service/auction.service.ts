import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { EnvService } from '../env.service';
import * as CryptoJS from 'crypto-js';
import { AlertModalComponent } from '../shared/components/alert-modal/alert-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  loggedUser: any;
  loggedUserRole: any;
  XCSRFToken: any;
  unsaved: boolean = false;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private envService: EnvService,
    private translate: TranslateService,
    public dialog: MatDialog,
  ) { }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  hasUserRole(role: string) {
    let isvalidRole;
    if (typeof this.loggedUser.roles === "string") {
      isvalidRole = !!(this.loggedUser.roles == role);
    } else {
      isvalidRole = !!(this.loggedUser.roles.find((r: any) => r == role));
    }
    return isvalidRole;
  }

  getLoggedUserRole() {
    this.loggedUserRole = {
      isSalesHead: this.hasUserRole("EAuction_SalesCommitteeChairman"),
      isSalesSecretary: this.hasUserRole("EAuction_SalesCommitteSecretary"),
      isInteriorMarketer: this.hasUserRole("EAuction_InteriorMarketer"),
      isAuctionModerator: this.hasUserRole("EAuction_AuctionManager"),
      isSalesMember: this.hasUserRole("EAuction_SalesCommitteeMember"),
      isPricingMember: this.hasUserRole("EAuction_PricingCommitteeMember"),
      isPricingSecretary: this.hasUserRole("EAuction_PricingCommitteSecretary"),
      isPricingHead: this.hasUserRole("EAuction_PricingCommitteeChairman"),
      isBidder: this.hasUserRole("EAuction_Bidder"),
    }
    console.log('loggedUserRole In ➼ ', this.loggedUserRole);
    return this.loggedUserRole
  }

  getLoggedUserEAucRole() {
    let currentUserRole = this.loggedUser, role = '';
    if (currentUserRole.roles) {
      if (typeof currentUserRole.roles === "string") {
        role = currentUserRole.roles;
      } else {
        role = currentUserRole.roles.find((r: any) => r.includes("EAuction"));
      }
    }
    console.log('getLoggedUserEAucRole ', role);
    return role;
  }

  //for getting Auction List with Filters
  getAuctionList(page: any, filters: any): Observable<any> {
    let role = '', config1 = '', config2 = '';
    if (this.loggedUserRole.isInteriorMarketer) {
      role = "InteriorMarketer";
      config1 = "?$expand=pagetolistnav";
      config2 = "";
    } else if (this.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if (this.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if (this.loggedUserRole.isPricingHead) {
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
    console.log('apiAuctionURL', this.envService.environment.apiAuctionURL);
    return this.http.get<any>(
      this.envService.environment.apiAuctionURL +
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
    } else if (this.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if (this.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
      config1 = "?$expand=page1tolistnav";
      config2 = " and ScreenNav eq 'R'";
    } else if (this.loggedUserRole.isPricingHead) {
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
      },
      observe: 'response' as 'body'
    };
    let queryId = (DraftId && DraftId != '0') ? DraftId : ObjectId;
    console.log('queryId for Encrypt');
    //let encyptQueryId = CryptoJS.AES.encrypt(queryId.trim(), 'sathya'.trim()).toString();
    return this.http.get<any>(
      this.envService.environment.apiAuctionURL + '/' + queryId +
      "?$expand=listtoproductnav,listtoattachnav" +
      "&$format=json"
      , httpOptions);

  }

  //for getting Auction Moderators List with Filters
  getAuctionModeratorsList(): Observable<any> {
    let role = '';
    if (this.loggedUserRole.isInteriorMarketer) {
      role = "InteriorMarketer";
    } else if (this.loggedUserRole.isAuctionModerator) {
      role = "AuctionManager";
    } else if (this.loggedUserRole.isPricingMember) {
      role = "AuctionManager";
    } else if (this.loggedUserRole.isPricingHead) {
      role = "AuctionManager";
    }

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
      this.envService.environment.apiAuctionURL + '/moderators' + "?$format=json", httpOptions);

  }

  //for creating Auction as Draft
  createAuction(createAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      }
    };
    return this.http.post<any>(
      this.envService.environment.apiAuctionURL
      , JSON.stringify(createAuctionRequest)
      , httpOptions);

  }

  //for creating Auction as Draft
  uploadAuctionImages(fileNetAuctionRequest: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      }
    };
    return this.http.post<any>(
      this.envService.environment.apiFilenetURL
      , JSON.stringify(fileNetAuctionRequest)
      , httpOptions);

  }

  //for Download
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

  //for Download
  deleteAuctionImages(fileId: any): Observable<any> {
    const httpOptions = {
      headers: {
        'X-CSRF-TOKEN': this.XCSRFToken as string
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.delete<any>(
      this.envService.environment.apiFilenetURL + '/' + fileId
      , httpOptions);
  }

  public logout() {
    this.cookieService.deleteAll('/', '.mof.gov.sa');
    localStorage.clear();
    const redirectUrl = this.envService.environment.idmLogoutUrl;
    window.location.href = redirectUrl;
    // this.router.navigate(['/']);
  }

  public getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  public handleUnsavedError() {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(AlertModalComponent, {
        data: {
          message: 'changes_not_saved',
          mnBtntext: this.translate.instant('auctioncreate.auctionproduct.section1_subheading1_opt2'),
          mnBtntext1: this.translate.instant('auctioncreate.auctionproduct.section1_subheading1_opt1'),
          confirm: true,
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.unsaved = false;
          resolve(true);
        }
      });
    })
  }

}