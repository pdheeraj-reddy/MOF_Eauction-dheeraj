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

  //for getting Auction List with Filters
  getAuctionList(page: any, filters: any): Observable<any> {
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;

    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidType !== '' ? " and BidType eq '" + filters.BidType + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '') + (filters.Msgty !== '' ? " and Msgty eq '" + filters.Msgty + "'" : '');
    console.log('$filters ', $filters);

    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'InteriorMarketer',
      },
      params: {
      },
      observe: 'response' as 'body'
    };
    return this.http.get<any>( 
      // 'http://10.13.85.57:9001' + 
      environment.apiAuctionURL + 
      "?$expand=pagetolistnav" + 
      "&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "'" + $filters + ")&$format=json" 
      , httpOptions);
    
  }

  // for getting Auction details for ObjectId
  getAuctionDetails(ObjectId: string, DraftId?: string): Observable<any> {    
    let $filters = (ObjectId !== '' ? " and ObjectId eq '" + ObjectId + "'" : '') + (DraftId !== '' ? " and DraftId eq '" + DraftId + "'" : '');
    console.log('$filters ', $filters);
    const httpOptions = {
      headers: {
        'x-csrf-token': 'fetch',
        'X_User_Role': 'InteriorMarketer',
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
    // const redirectUrl = 'https://ry1drvemksr1.mof.gov.sa:50301/irj/servlet/prt/portal/prtroot/pcd!3aportal_content!2fmof.gov.sa.f_mof_base!2fmof.gov.sa.f_iviews!2fmof.gov.sa.i_auction';
    const redirectUrl = 'https://ry1drvemksr1.mof.gov.sa/sap/public/bc/icf/logoff?sap-client=100';
    window.location.href = redirectUrl;
    // this.router.navigate(['/']);
  }

}