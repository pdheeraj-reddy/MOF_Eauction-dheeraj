import { Component, OnInit } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { AuctionService } from "src/app/service/auction.service";
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Moment } from 'moment-mini';
import * as moment from 'moment-mini';
declare var $: any;

@Component({
  selector: 'app-auction-lists',
  templateUrl: './auction-lists.component.html',
  styleUrls: ['./auction-lists.component.scss']
})
export class AuctionListsComponent implements OnInit {
  loggedUser: any;
  loggedUserRole: any;
  auctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;
  totalCounts: any;
  totcntforall: number;
  totcntfordraft: number;
  totcntforreadjust: number;
  totcntforupcomming: number;
  totcntforawaiting: number;
  selectedTab: string = 'All';
  showLoader: boolean = false;
  showPageLoader: boolean = false;
  dropValProducts: any = [
    { code: "Public", disp: "Public" },
    { code: "Private", disp: "Private" }
  ];
  dropValStatus: any = [];
  // Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  sortCol: any = [
    { col: 'ObjectId', 'sType': 'D' },
    { col: 'auctionName', 'sType': 'D' },
    { col: 'Description', 'sType': 'D' },
    { col: 'BidType', 'sType': 'D' },
    { col: 'ZzAucSrtDt', 'sType': 'D' },
    { col: 'ZzAucEndDt', 'sType': 'D' },
    { col: 'Status', 'sType': 'D' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public auctionServc: AuctionService,
    private cookieService: CookieService,
    private csrfTokenExtractor: HttpXsrfTokenExtractor,
    public translate: TranslateService,
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [], pagetolistnav: any;
    // this.totcntforall = serverObj.d.results[0].TotAll;
    // this.totcntfordraft = serverObj.d.results[0].TotDraft;
    // this.totcntforreadjust = serverObj.d.results[0].TotRejected;
    // this.totcntforupcomming = serverObj.d.results[0].TotPublish;
    // this.totcntforawaiting = serverObj.d.results[0].TotPendingRw;
    this.totalCounts = {
      totAll: serverObj.d.results[0].TotAll,
      totDraft: serverObj.d.results[0].TotDraft,

      totCompleted: serverObj.d.results[0].TotCompleted,
      totEle: serverObj.d.results[0].TotEle,
      totPendSelect: serverObj.d.results[0].TotPendSelect,
      totPgs: serverObj.d.results[0].TotPgs,

      totPrcApprPend: serverObj.d.results[0].TotPrcApprPend,
      totPrcRejected: serverObj.d.results[0].TotPrcRejected,
      totPricingPend: serverObj.d.results[0].TotPricingPend,
      totPublishPend: serverObj.d.results[0].TotPublishPend,
      totPublished: serverObj.d.results[0].TotPublish,
      totPublishedOngoing: serverObj.d.results[0].TotPublishedOngoing,
      totRejected: serverObj.d.results[0].TotRejected,
      totReviewPend: serverObj.d.results[0].TotReviewPend
    }

    if (this.loggedUserRole.isInteriorMarketer) {
      pagetolistnav = serverObj.d.results[0].pagetolistnav.results;
    } else if (this.loggedUserRole.isAuctionModerator) {
      pagetolistnav = serverObj.d.results[0].page1tolistnav.results;
    } else if (this.loggedUserRole.isPricingMember) {
      pagetolistnav = serverObj.d.results[0].page1tolistnav.results;
    } else if (this.loggedUserRole.isPricingHead) {
      pagetolistnav = serverObj.d.results[0].page1tolistnav.results;
    }
    pagetolistnav.forEach((result: any) => {
      const items = {
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

  public getAuctionTypeDesc(type: string) {
    if (type === 'O') {
      return 'Public';
    } else if (type === 'C') {
      return 'Private';
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.showPageLoader = true;
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    console.log('this.loggedUserRole ➼ ', this.loggedUserRole);
    this.prePopulateForm();
    this.filterForm();
    this.getAuctionList(1);
  }

  prePopulateForm() {
    if (this.loggedUserRole.isInteriorMarketer) {
      this.dropValStatus = [
        { code: "Draft", disp: "Draft" },
        { code: "Rejected", disp: "Rejected" },
        { code: "Published", disp: "Published" },
        { code: "Pending Review", disp: "Pending Review" },
      ];
    } else if (this.loggedUserRole.isAuctionModerator) {
      this.dropValStatus = [
        { code: "Pending Review", disp: "Pending Review" },
        { code: "Pending Pricing", disp: "Pending Pricing" },
        { code: "Pending to Publish", disp: "Pending to Publish" },
        { code: "Rejected", disp: "Rejected" },
      ];
    } else if (this.loggedUserRole.isPricingMember) {
      this.dropValStatus = [
        { code: "Pending Pricing Approval", disp: "Pending Pricing Approval" },
        { code: "Pending Pricing", disp: "Pending Pricing" },
        { code: "Rejected Prices", disp: "Rejected Prices" },
        { code: "Pending to Publish", disp: "Pending to Publish" },
      ];
    } else if (this.loggedUserRole.isPricingHead) {
      this.dropValStatus = [
        { code: "Pending Pricing Approval", disp: "Pending Pricing Approval" },
        { code: "Pending Pricing", disp: "Pending Pricing" },
        { code: "Rejected Prices", disp: "Rejected Prices" },
      ];
    }
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

  onChangeStartDate($event: any) {
    this.filterFormGroup.controls['auctionStartDate'].setValue($event.target.value);
  }

  onChangeEndDate($event: any) {
    this.filterFormGroup.controls['auctionEndDate'].setValue($event.target.value);
  }

  onTabSelection(value: string) {
    this.filterFormGroup.controls['auctionStatus'].enable();
    this.selectedTab = value;
    this.getAuctionList(1);

    this.resetFilter();
    this.showFilterForm = false;
    if (value !== 'All') {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
  }

  getAuctionList(pageNumber?: number, sortBy?: string, sorttype?: string) {
    this.showLoader = true;
    let role = '';
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    const filters = {
      Status: this.selectedTab,
      ObjectId: this.filterFormGroup.controls['prevRefNo'].value ? this.filterFormGroup.controls['prevRefNo'].value : '',
      Description: this.filterFormGroup.controls['auctionName'].value ? this.filterFormGroup.controls['auctionName'].value : '',
      BidType: this.filterFormGroup.controls['auctionType'].value ? (this.filterFormGroup.controls['auctionType'].value === 'Public' ? 'O' : 'C') : '',
      StartDate: this.filterFormGroup.controls['auctionStartDate'].value ? moment(this.filterFormGroup.controls['auctionStartDate'].value, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      EndDate: this.filterFormGroup.controls['auctionEndDate'].value ? moment(this.filterFormGroup.controls['auctionEndDate'].value, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      Message: '',
      Msgty: ''
    };
    if (this.selectedTab === 'All' && this.filterFormGroup.controls['auctionStatus'].value !== '') {
      filters.Status = this.filterFormGroup.controls['auctionStatus'].value;
      filters.Message = 'F';
    }
    if (sortBy && sorttype) {
      filters.Msgty = sorttype + ' ' + sortBy;
    }

    this.auctionServc.getAuctionList(page, filters).subscribe((res: any) => {
      this.showLoader = false;
      this.showPageLoader = false;
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

  filterForm() {
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

  toggleFilter() {
    this.resetFilter();
    this.showFilterForm = !this.showFilterForm;
    this.refreshCalendarCntrl();
  }

  setFilter() {

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

  resetFilter() {
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
