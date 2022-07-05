import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let role = '';
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
    console.log('apiBidderAuctions', this.envService.environment.apiBidderAuctions);
    return this.http.get<any>(
      this.envService.environment.apiBidderAuctions +
      "?$expand=page1tolistnav&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "'" + $filters + ")&$format=json"
      , httpOptions);

  }
}
