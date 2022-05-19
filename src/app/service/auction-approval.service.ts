import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuctionApprovalService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //for Local SAP API Communication
  getAuctionList(page: any, filters: any): Observable<any> {
    console.log('page ', page, ' filters ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    const pageNumber = page.pageNumber;

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
        : '');
    console.log('$filters ', $filters);

    const httpOptions = {
      headers: {
        Authorization: 'Basic QUJBQUJBUEVSOlNhcEAxMjM0NQ==',
        X_MOF_ClientID: '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        X_MOF_RqUID: '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        withCredentials: 'true',
        Cookie: 'sap-usercontext=sap-client=100',
        'Content-Type': 'application/json',
        'x-csrf-token': 'fetch',
      },
      params: {},
      observe: 'response' as 'body',
    };
    return this.http.get<any>(
      '/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet?$expand=pagetolistnav' +
        "&$filter=(PageLimit eq '" +
        pageLimit +
        "' and PageNo eq '" +
        pageNumber +
        "'" +
        $filters +
        ')&$format=json',
      httpOptions
    );
  }

  getAuctionDetails(ObjectId: any): Observable<any> {
    const httpOptions = {
      headers: {
        Authorization: 'Basic QUJBQUJBUEVSOlNhcEAxMjM0NQ==',
        X_MOF_ClientID: '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        X_MOF_RqUID: '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        withCredentials: 'true',
        Cookie: 'sap-usercontext=sap-client=100',
        'Content-Type': 'application/json',
      },
      params: {},
    };
    return this.http.get<any>(
      'http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet?$expand=listtoproductnav,listtoattachnav' +
        "&$filter=ObjectId eq '" +
        ObjectId +
        "'&$format=json",
      httpOptions
    );
  }

  createAuction(createAuctionRequest: any): Observable<any> {
    const csrfToken = localStorage.getItem('x-csrf-token');
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
        'X-CSRF-Token': csrfToken as string,
      }),
      params: {},
    };
    return this.http.post<any>(
      '/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet',
      JSON.stringify(createAuctionRequest),
      httpOptions
    );
  }

  // getPreAuctionApproval(ObjectId: any): Observable<any> {
  //   let idToken =
  //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IkE1OUMyOEYxMUUwM0MzMzRFMDkyQjAxOERENEM0NDA3MkRGMzlBQzkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJwWndvOFI0RHd6VGdrckFZM1V4RUJ5M3ptc2sifQ.eyJuYmYiOjE2NDIwNTg2NDIsImV4cCI6MTY0NzI0MjY0MiwiaXNzIjoiaHR0cHM6Ly8xMC4xNC44LjYxOjgwNTUiLCJhdWQiOiJNb2JpbGVCdXNpbmVzc0FQUEFwaSIsImNsaWVudF9pZCI6IjY2NzE5OTU3ZGYzZDRkZGU5ZDJhOTJiNDUxMDczZjU1Iiwic3ViIjoiMTQ5MzEiLCJhdXRoX3RpbWUiOjE2NDIwNTg2NDAsImlkcCI6ImxvY2FsIiwicm9sZSI6WyJWaWV3Q29udHJhY3RMaXN0IiwiUmVxdWVzdEVtcGxveW1lbnRGZWVzIiwiTmV3TW9uYWZhc2F0X1N1cHBsaWVyIiwiTW9uYWZhc2F0VXNlciIsIlZpZXdGaW5hbmNpYWxDbGFpbUxpc3QiLCJVc2VyTWFuYWdlbWVudCIsIlN1YnNjcmlwdGlvbnMiLCJMQ19DbGllbnQiLCJOZXdNb25hZmFzYXRfVmlld1JlcXVpcmVkUHJvZHVjdHMiLCJDcmVhdGVGaW5hbmNpYWxDbGFpbSIsIlZpZXdEZWJ0Rm9yUHJpdmF0ZVNlY3RvciIsIkVNYXJrZXRfUHJpdmF0ZVNlY3RvclVzZXIiLCJCYW5raW5nU2VjdG9ySW5xdWlyeSIsIkVBdWN0aW9uX0V4dGVybmFsTWFya2V0ZXIiLCJFQXVjdGlvbl9TYWxlc0NvbW1pdHRlZUNoYWlybWFuIiwiQ3JlYXRlQmlsbENsYWltIiwiU2hvd0ZpbmFuY2lhbEJpbGxDbGFpbSIsIkJhbmtHdWFyYW50ZWVSZXF1ZXN0c01hbmFnZW1lbnQiLCJDcmVhdGVFZGl0RXhjbHVkZU9yZGVyIiwiVmlld0V4Y2x1ZGVPcmRlciIsIkVBdWN0aW9uX0JpZGRlciIsIkFxYXJhdEV0aW1hZF9BcWFyUmVxdWVzdGVyIiwiVmlld0NvbnRyYWN0UmVnaXN0cmF0aW9uT3JkZXJzIiwiVXBsb2FkQ29udHJhY3RSZWdpc3RyYXRpb25PcmRlciIsIkFQSV9EZXZlbG9wZXIiLCJEaWdpdGFsU2lnbnR1cmVfQ29udHJhY3RzLU1pbGVzdG9uZXNBcHByb3ZhbCIsIkRpZ2l0YWxTaWdudHVyZV9TaWduaW5nQ29udHJhY3RzIiwiQ3JlYXRlQ29udHJhY3RSZXF1ZXN0Tm90UmVnaXN0ZXJJbkV0aW1hZCJdLCJ1c2VyQ2F0ZWdvcnkiOiI2IiwiZnVsbG5hbWUiOiLYrtin2YTYryDYudio2K_Yp9mE2YTZhyDYtNmK2K4g2KfZhNi12KfZgdmKIiwiZmlyc3ROYW1lIjoi2K7Yp9mE2K8iLCJzZWNvbmROYW1lIjoi2LnYqNiv2KfZhNmE2YciLCJ0aGlyZE5hbWUiOiLYtNmK2K4iLCJsYXN0TmFtZSI6Itin2YTYtdin2YHZiiIsImVuZ2xpc2hGdWxsbmFtZSI6IkZhaGFkIE1vaGFtbWVkIE11YXRoIEtoYWxpZCIsImVuZ2xpc2hGaXJzdE5hbWUiOiJGYWhhZCIsImVuZ2xpc2hTZWNvbmROYW1lIjoiTW9oYW1tZWQiLCJlbmdsaXNoVGhpcmROYW1lIjoiTXVhdGgiLCJlbmdsaXNoTGFzdE5hbWUiOiJLaGFsaWQiLCJlbWFpbCI6ImFsc2hpbWFhc2FtZWhAZ21haWwuY29tIiwibW9iaWxlIjoiMDUwNDIxNjYxOCIsIm5hdGlvbmFsaXR5Ijoi2KfZhNmF2YXZhNmD2Kkg2KfZhNi52LHYqNmK2Kkg2KfZhNiz2LnZiNiv2YrYqSIsIm5hdGlvbmFsaXR5Q29kZSI6IlNBIiwiZGF0ZU9mQmlydGgiOiIyMC8wMS8xOTU4IiwiZGF0ZU9mQmlydGhIaWpyaSI6IjAxLzA3LzEzNzciLCJpZEV4cGlyeURhdGVTdHJpbmciOiIxOC8wMi8yMDI3IiwiaWRFeHBpcnlEYXRlU3RyaW5nSGlqcmkiOiIxMS8wOS8xNDQ4IiwiZ2VuZGVyIjoiMSIsImdlbmRlclN0cmluZyI6Ik1hbGUiLCJpc1NlbWlHb3ZBZ2VuY3kiOiIwIiwibGFzdExvZ2luR2F0ZSI6IlByaXZhdGVTZWN0b3IiLCJBZ2VuY3lUeXBlSWQiOiIxIiwic2VsZWN0ZWRDUiI6IjEwMTAwMDAxNTQs2LTYsdmD2Kkg2K7Yp9mE2K8g2LnYqNiv2KfZhNmE2Ycg2KfZhNi12KfZgdmKLEZhbHNlIiwicGVybWlzc2lvbiI6WyLYpdiv2KfYsdipINin2YTZhdiz2KrYrtiv2YXZitmGLGh0dHBzOi8vMTAuMTQuOC42MTo4MDU1L1VzZXJzLFVzZXJNYW5hZ2VtZW50LnBuZywyLCIsItil2K_Yp9ix2Kkg2KfZhNmF2YbYp9mB2LPYp9iqINmI2KfZhNmF2LTYqtix2YrYp9iqLGh0dHBzOi8vbW9uYWZhc2F0dGVzdC5ldGltYWQuc2EvdXNlcnMvbG9naW5pZG0sbW9uYWZhc2F0LnBuZyw2LCIsItmF2YbYp9mB2LPYp9iqINin2YTYrNiv2YrYryxodHRwczovLzEwLjE0LjkuMzI6ODg4OC9BY2NvdW50L1VwZGF0ZUlETUNsYWltcyxtb25hZmFzYXQucG5nLDcsIiwi2KXYr9in2LHYqSDYp9mE2LnZgtmI2K8saHR0cDovLzEwLjE0LjguNjE6ODA2OS9MYW5kaW5nUGFnZS9pbmRleENvbnRyYWN0cyxFdGltYWQucG5nLDQsIiwi2KXYr9in2LHYqSDYp9mE2YXYr9mB2YjYudin2KosaHR0cDovLzEwLjE0LjguNjE6ODA2OS9MYW5kaW5nUGFnZS9pbmRleFBheW1lbnRPcmRlcixFdGltYWQucG5nLDQsIiwi2KXYr9in2LHYqSDYp9mE2KzZh9in2Kog2LTYqNmHINin2YTYrdmD2YjZhdmK2KksaHR0cHM6Ly8xMC4xNC44LjYxOjgwNTUvU2VtaUdvdkFnZW5jeUNSL1VzZXJNYW5hZ2VtZW50SW5kZXgsQWdlbmN5LnBuZywyLCIsItiu2K_ZhdipINiq2LnZiNmK2LbYp9iqINix2LPZiNmFINin2YTYudmF2KfZhNipLGh0dHA6Ly8xMC4xNC44LjcwOjM0MzQvQWNjb3VudC9Mb2dpbixDb21wZW5zYXRpb25PZkZhY2lsaXRpZXMucG5nLDEwLCIsItiu2K_ZhdipINin2YTYp9i02KrYsdin2YPYp9iqLGh0dHBzOi8vMTAuMTQuOS4zMjo0NDMxMC9BY2NvdW50L1VwZGF0ZUlETUNsYWltcyxBZ2VuY3kucG5nLDIsIiwi2KjZiNin2KjYqSDYp9mE2YXYrdiq2YjZiSDYp9mE2YXYrdmE2YosaHR0cHM6Ly8xMC4xNC45LjMyOjIyNDQvLGxvY2FsY29udGVudC5wbmcsMywiLCLYp9iv2KfYsdipINis2YfYp9iqINin2YTZgti32KfYuSDYp9mE2YXYtdix2YHZiixodHRwczovLzEwLjE0LjguNjE6ODA1NS9CYW5raW5nQ1IvVXNlck1hbmFnZW1lbnRJbmRleCxBZ2VuY3kucG5nLDIsIiwi2KXYr9in2LHYqSDYp9mE2YXYr9mK2YjZhtmK2KfYqixodHRwOi8vMTAuMTQuOC44Njo0NDM5MC8sZGVidE1uZ21udC5wbmcsMiwiLCLYqNmK2KfZhtin2Kog2KfYudiq2YXYp9ivLGh0dHBzOi8vMTAuMTQuOC42MTo4MzAzLyxiYW5raW5nLnBuZywyLCIsItin2YTYs9mI2YIg2KfZhNin2YTZg9iq2LHZiNmG2YosaHR0cHM6Ly9yeTFkcnZlbWtzcjEubW9mLmdvdi5zYS9zYXAvYmMvdWkyL2ZscCxBZ2VuY3kucG5nLDIsIiwi2KfZhNmF2LLYp9ivINin2YTYp9mE2YPYqtix2YjZhtmKLCMsQWdlbmN5LnBuZywyLCIsItil2K_Yp9ix2Kkg2KfZhNi22YXYp9mG2KfYqiDYp9mE2KjZhtmD2YrYqSxodHRwczovLzEwLjEzLjgwLjIwL0FjY291bnQvUmVmcmVzaCxBZ2VuY3kucG5nLDIsIiwi2LnZgtin2LHYp9iqINin2LnYqtmF2KfYryxodHRwczovLzEwLjEzLjg2LjU6OTAyMC9EYXNoYm9hcmQsQWdlbmN5LnBuZywyLCIsItin2LPYqtio2LnYp9ivINmF2K7Yp9mE2YHYp9iqLGh0dHA6Ly8xMC4xNC44Ljg2OjgwMzEsQWdlbmN5LnBuZywyLCIsItio2YjYp9io2Kkg2KfZhNmF2LfZiNix2YrZhixodHRwczovLzEwLjEzLjgwLjE5Ojk0NDMsQWdlbmN5LnBuZywyLCIsItin2YTYudmC2YjYryDYp9mE2LrZitixINmF2LPYrNmE2KksaHR0cDovLzEwLjE0LjguMzA6MTIxMi8sQWdlbmN5LnBuZywyLCIsItin2YTYqtmI2YLZiti5INin2YTYsdmC2YXZiixodHRwczovLzEwLjE0LjguMjEwOjUwMTExL0FjY291bnQvTG9naW5JRE0sRGlnaXRhbC1TaWduYXR1cmUuc3ZnLDExLCJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIxMDI0OTAxODQzIiwibmFtZSI6IjEwMjQ5MDE4NDMiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWRkcmVzcyIsInJvbGVzIiwiTW9iaWxlQnVzaW5lc3NBUFBBcGkiXSwiYW1yIjpbInB3ZCJdfQ.eBGfXzHRV4X47h5ckBG5_ZxTg4lVsihKtrEQubY4JJNvGpeOsWs0mK_QMJojgzt_V9vbBwUoT8wjm-Af0DJ7gR6yq1zlljNBuO1u3KmnYwhRKavaO1rFJPxRh3n1AyuWWBV6JXlFuj2zFoXDudXikHfV8rQc8mRfOCweR5FyYCsL441ukBx0IcWmbWFd6a3W6RMA46jZ60CYney0bc9__SSfXpkjNA8rmrJZa1qYrXA--s3AgKndG1MurntVwR1i_0_0s2LEtxS4RNsWt7qvbmH7t_mmM7tYMi9yKxO-wUGIgTIFUFnv3_cdMx5pLUFAEEq2TKmnTJbTk57vG_CJjg';

  //   const httpOptions = {
  //     headers: {
  //       IDM_Token: idToken,
  //       X_MOF_ClientID: '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
  //       X_MOF_RqUID: '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
  //       withCredentials: 'false',
  //       Cookie: 'sap-usercontext=sap-client=100',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': '*',
  //       'Access-Control-Allow-Headers': '*',
  //       'Access-Control-Allow-Credentials': 'true',
  //       'Access-Control-Max-Age': '1728000',
  //       'x-csrf-token': 'fetch',
  //     },
  //   };
  //   return this.http.get<any>(
  //     'http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav' +
  //       "&$filter=ObjectId eq '" +
  //       ObjectId +
  //       "'&$format=json",
  //     httpOptions
  //   );
  // }

  getPreAuctionApproval(ObjectId: any) {
    return {
      d: {
        results: [
          {
            __metadata: {
              id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000300',UserId='')",
              uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000300',UserId='')",
              type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
            },
            ZzAnncSrtD: '00000000',
            ZzAnncEndD: '00000000',
            ZzAucProduct: '',
            Role: '',
            ZzBidSrtPrice: '0.00 ',
            ActionTaken: '',
            ZzLowBidVl: '0.00 ',
            RejectNotes: '',
            Message: '',
            Msgty: '',
            SameAddress: '',
            ZzStartMethod: '',
            Description: 'SRMLAUSR 03.11.2021 10:27',
            ZzPrevAucId1: '',
            ZzAgencyId: '',
            ZzPrevAucId2: '',
            QuotDead: '04.11.2021',
            ZzPrevAucId3: '',
            ZzAucDesc: '',
            ZzPrevAucId4: '',
            ProcessType: 'ZFWD',
            ZzPrevAucId5: '',
            ZzAucSrtDt: '  .  . :: 0',
            ZzIbgaPercent: '0.0000 ',
            BidType: 'O',
            ZzFbgaDeadline: '0 ',
            ZzAucEndDt: '  .  . :: 0',
            Currency: 'SAR',
            ZzPrtReason: '',
            ObjectId: '9700000300',
            ZzOtherNote: '',
            UserId: '',
            ZzCloseInd: '',
            PsEmdReq: 'X',
            ZzCommisionTyp: '',
            PsEmdAmnt: '200.00 ',
            ZzCommPercent: '0.0000 ',
            Status: '',
            ZzAgencyName: '',
            CreateDate: '',
            ZzPbEstPrice: '0.00 ',
            AgencyName: '',
            ZzEmrktPubsPrd: '00000000',
            listtoproductnav: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/ProductItemSet(ProductId='1',ObjectId='9700000300',UserId='SRMLAUSR')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/ProductItemSet(ProductId='1',ObjectId='9700000300',UserId='SRMLAUSR')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.ProductItem',
                  },
                  ZzProdDesc: '',
                  ZzProductNo: '',
                  ZzSerialNo: '',
                  DelivTime: '000000',
                  ProductValue: '1000.00',
                  ZzProductCond: '',
                  Currency: 'SAR',
                  Description: 'MS Office 365-cloud based(Pro-Plus)',
                  ZzProductSku: '',
                  ZzLocationCord: '',
                  ProductId: '1',
                  ZzRegion: '',
                  CategoryId: '01001',
                  ZzCity: '',
                  Quantity: '50.000 ',
                  ZzNeighbourhood: '',
                  ObjectId: '9700000300',
                  Unit: 'EA',
                  ZzStreet: '',
                  Price: '0.00 ',
                  UserId: 'SRMLAUSR',
                  ZzPdOthrNts: '',
                  DelivDate: '00.00.0000',
                },
              ],
            },
            listtocomiteememnav: {
              results: [
                {
                  EmployeeId: '00000000',
                  AucId: '9700000300',
                  EmployeeName: '',
                  EmpMailid: '',
                  AucDesc: 'AUCTION 1',
                  EmployeeRole: '',
                  Requestor: 'SRMLAUSR',
                  UserId: '',
                },
              ],
            },
            listtoattachnav: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/AttachmentListSet(SL_NO='0%20',ObjectId='9700000300',UserId='ABAABAPER')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/AttachmentListSet(SL_NO='0%20',ObjectId='9700000300',UserId='ABAABAPER')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.AttachmentList',
                  },
                  Description: 'Trip Form',
                  DispUrl:
                    'http://ry1drvemksr1.mof.gov.sa:8000/sap/ebp/docserver/2200%20%2D%20T0000000005.pdf?phioget&KpId=0050569725271EEC8F8EF7DD5352AE47&KpClass=BBP_P_DOC&sap-client=100',
                  PhioExt: 'pdf',
                  PhioMime: 'application/pdf',
                  SL_NO: '0 ',
                  ObjectId: '9700000300',
                  PhioFname: '2200 - T0000000005.pdf',
                  UserId: 'ABAABAPER',
                  ProductId: '',
                },
              ],
            },
          },
        ],
      },
    };
  }

  approveOrRejectAuction(payload: any): Observable<any> {
    const csrfToken = localStorage.getItem('x-csrf-token');
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
        'X-CSRF-Token': csrfToken as string,
      }),
      params: {},
    };
    return this.http.post<any>(
      '/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet',
      JSON.stringify(payload),
      httpOptions
    );
  }

  getCommitteeMembersBasedOnRole(role: String){
    const httpOptions = {
      headers: {
        "Authorization" : 'Basic RUFVQy1CVEM6RUB1Y3QhMG5AMjBAQA==',
        // X_MOF_ClientID: '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        // X_MOF_RqUID: '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        // withCredentials: 'false',
        Cookie: 'sap-usercontext=sap-client=100',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
        'x-csrf-token': 'fetch',
      },
    };
    return this.http.get<any>(
      'http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet?' +
        "$filter=EmployeeRole eq '" +
        role +
        "'&$format=json",
      httpOptions
    );
  }

}
