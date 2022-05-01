import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { AbstractControl, FormBuilder,FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { AuctionService } from "src/app/service/auction.service";
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Moment } from 'moment-mini';
import * as moment from 'moment-mini';
declare var $:any;

@Component({
  selector: 'app-auction-lists',
  templateUrl: './auction-lists.component.html',
  styleUrls: ['./auction-lists.component.scss']
})
export class AuctionListsComponent implements OnInit, AfterViewInit {
  auctionListData : any;
  selectedPageNumber : number;
  pagelimit: number = 10;
  totcntforall: number; 
  totcntfordraft: number; 
  totcntforreadjust: number; 
  totcntforupcomming: number; 
  totcntforawaiting: number; 
  selectedTab: string = 'All';
  showLoader: boolean = false;
  dropValProducts: any = [
    { code: "Public" , disp: "Public" }, 
    { code: "Private" , disp: "Private" }
  ];
  dropValStatus: any = [
    { code: "Draft" , disp: "Draft" }, 
    { code: "Rejected" , disp: "Rejected" },
    { code: "Published" , disp: "Published" },
    { code: "Pending Review" , disp: "Pending Review" },
  ];
  // Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  sortCol: any = [
    { col: 'ObjectId', 'sType': 'D'} ,
    { col: 'auctionName', 'sType': 'D'} ,
    { col: 'Description', 'sType': 'D'} ,
    { col: 'BidType', 'sType': 'D'} ,
    { col: 'ZzAucSrtDt', 'sType': 'D'} ,
    { col: 'ZzAucEndDt', 'sType': 'D'} ,
    { col: 'Status', 'sType': 'D'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public auctionServc: AuctionService,
    private cookieService:CookieService,
    private csrfTokenExtractor: HttpXsrfTokenExtractor,
    public translate: TranslateService,
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforall = serverObj.d.results[0].TotAll;
    this.totcntfordraft = serverObj.d.results[0].TotDraft;
    this.totcntforreadjust = serverObj.d.results[0].TotRejected;
    this.totcntforupcomming = serverObj.d.results[0].TotPublish;
    this.totcntforawaiting = serverObj.d.results[0].TotPendingRw;
    serverObj.d.results[0].pagetolistnav.results.forEach((result: any) => {
      const items ={
        ObjectId: result['ObjectId'] ? result['ObjectId'] : '0',
        DraftId: result['DraftId'] ? result['DraftId'] : '0',
        referenceno: result['ObjectId'] ? result['ObjectId'] : '',
        auctionName: result['Description'] ? result['Description'] : '',
        auctionType: result['BidType'] ? this.getAuctionTypeDesc(result['BidType']) : this.getAuctionTypeDesc('C'), // Hardcoded due to DB inconsist
        auctionStatus: result['Status'] ? result['Status'] : '',
        bgaValues: result['Description'] ? result['Description'] : '',
        auctionStartDate: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? moment(result['ZzAucSrtDt'].split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionStartTime: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? moment(result['ZzAucSrtDt'].split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        auctionStartTimeSufix: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? moment(result['ZzAucSrtDt'].split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        agencyName: result['Description'] ? result['Description'] : '',
        autionEndDate: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? moment(result['ZzAucEndDt'].split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionEndTime: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? moment(result['ZzAucEndDt'].split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        auctionEndTimeSufix: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? moment(result['ZzAucEndDt'].split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      }
      resultSet.push(items);
    });
    return resultSet;
  }
  
  public getAuctionTypeDesc(type: string){
    if(type === 'O'){
      return 'Public';
    } else if(type === 'C'){
      return 'Private';
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.filterForm();
    this.getAuctionList(1);
  }

  ngAfterViewInit(): void {
    
  }

  ngOnChanges() {
    console.log('currentLang ', this.translate.currentLang);
  }

  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    setTimeout(() => {
      $("#auctionStartDate").unbind().removeData();
      $("#auctionEndDate").unbind().removeData();
      $("#auctionStartDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#auctionEndDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#auctionStartDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionStartDate");
        e?.dispatchEvent(v);
      });
      $("#auctionEndDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionEndDate");
        e?.dispatchEvent(v);
      });
    }, 100);
  }

  onChangeStartDate($event: any){
    this.filterFormGroup.controls['auctionStartDate'].setValue($event.target.value);
  }

  onChangeEndDate($event: any){
    this.filterFormGroup.controls['auctionEndDate'].setValue($event.target.value);
  }

  onTabSelection(value:string){
    this.filterFormGroup.controls['auctionStatus'].enable();
    this.selectedTab = value;
    this.getAuctionList(1);
    
    this.resetFilter();
    this.showFilterForm = false;
    if(value !== 'All'){
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
  }

  getAuctionList(pageNumber?: number, sortBy?: string, sorttype?: string){
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber : pageNumber,
      pageLimit : this.pagelimit
    };
    const filters = {
      Status : this.selectedTab,
      ObjectId : this.filterFormGroup.controls['prevRefNo'].value ? this.filterFormGroup.controls['prevRefNo'].value : '',
      Description : this.filterFormGroup.controls['auctionName'].value ? this.filterFormGroup.controls['auctionName'].value : '',
      BidType : this.filterFormGroup.controls['auctionType'].value ? (this.filterFormGroup.controls['auctionType'].value === 'Public' ? 'O' : 'C') : '',
      StartDate : this.filterFormGroup.controls['auctionStartDate'].value ? moment(this.filterFormGroup.controls['auctionStartDate'].value, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      EndDate : this.filterFormGroup.controls['auctionEndDate'].value ? moment(this.filterFormGroup.controls['auctionEndDate'].value, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      Message : '',
      Msgty : ''
    };
    if(this.selectedTab === 'All' && this.filterFormGroup.controls['auctionStatus'].value !== ''){
      filters.Status = this.filterFormGroup.controls['auctionStatus'].value;
      filters.Message = 'F';
    }
    if(sortBy && sorttype){
      filters.Msgty = sorttype + ' '+ sortBy;
    }

    // let res = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.Paging"},"Message":"","Description":"","UserId":"","Msgty":"","CategoryId":"","PageLimit":"","ProcessType":"","QuotDead":"","PageNo":"","First":"X","Last":"","ObjectId":"","TotPgs":"18","TotEle":"180","Size":"","Number":"1","AgencyName":"","Status":"","BidType":"","CreateDate":"","NoEle":"10","pagetolistnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000427","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000426","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000425","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000424","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000419","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000417","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000413","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000406","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000405","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000404","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"07.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtocomiteememnav"}}}]}}]}};
    
    this.auctionServc.getAuctionList(page, filters).subscribe((res: any) => {
      this.showLoader = false;

      this.PaginationServc.setPagerValues(
        +res.body.d.results[0].TotEle,
        10,
        +pageNoVal
      );

      const csrfToken = localStorage.getItem("x-csrf-token");
      localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      this.auctionListData = this.mapping(res.body);

    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionList RespError : ', error);
    });
  }

  sortBy(sortBy?: string) {
    var foundIndex = this.sortCol.findIndex((el: { col: any; }) => el.col === sortBy);
    this.sortCol[foundIndex].sType = this.sortCol[foundIndex].sType === 'A' ? 'D' : 'A'; 
    this.getAuctionList(1, sortBy, this.sortCol[foundIndex].sType);
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {

    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  filterForm(){
    this.filterFormGroup = this.formBuilder.group({
      auctionType: new FormControl(''),
      auctionStatus: new FormControl(''),
      prevRefNo: new FormControl(''),
      auctionName: new FormControl(''),
      auctionStartDate: new FormControl(''),
      auctionEndDate: new FormControl(''),
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }

  changeSelect(e: any, dd: string) {
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true
    })
  }

  toggleFilter(){
    this.resetFilter();
    this.showFilterForm = !this.showFilterForm;
    this.refreshCalendarCntrl();
  }

  setFilter(){

  }
  
  /** Populating the table */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

  resetFilter(){
    this.filterFormGroup.controls['prevRefNo'].setValue('');
    this.filterFormGroup.controls['auctionName'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionStartDate'].setValue('');
    this.filterFormGroup.controls['auctionEndDate'].setValue('');
    this.refreshCalendarCntrl();
    this.getAuctionList(1);
  }

}
