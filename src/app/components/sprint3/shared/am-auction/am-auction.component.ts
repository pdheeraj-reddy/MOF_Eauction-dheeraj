import { EnvService } from 'src/app/env.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import * as moment from 'moment-mini';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BidderService } from '../../services/bidder.service';
import { AuctionList } from '../../interface/bidder.interface';
declare var $: any;

@Component({
  selector: 'app-am-auction',
  templateUrl: './am-auction.component.html',
  styleUrls: ['./am-auction.component.scss']
})
export class AmAuctionComponent implements OnInit {

  auctionListData: AuctionList[] = [];
  selectedPageNumber: number;
  pagelimit: number = 6;
  totalCounts = {
    total_completed: 0,
    total_under_gear: 0,
    total_upcoming: 0,
    total_ongoing: 0,
    total_all: 0
  }
  showLoader: boolean = false;
  dropValProducts = [
    { code: "Public", disp: "Public" },
    { code: "Private", disp: "Private" }
  ];
  dropValStatus = [
    { code: "Published", disp: "Published" },
    { code: "Ongoing", disp: "Ongoing" },
    { code: "Pending Selecting", disp: "Pending Selecting" },
    { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
    { code: "Pending FBGA", disp: "Pending FBGA" },
    { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
    { code: "Awarded", disp: "Awarded" },
    { code: "Terminated", disp: "Terminated" },
  ];;
  showPageLoader: boolean = false;
  selectedTab: string = 'All';
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }
  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
    public bidderService: BidderService,
    public envService: EnvService,
  ) { }

  ngOnInit(): void {
    this.showPageLoader = true;
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.defineForm();
    this.getAuctionList(1);
  }

  defineForm() {
    this.filterFormGroup = this.formBuilder.group({
      auctionType: new FormControl(''),
      auctionStatus: new FormControl(''),
      prevRefNo: new FormControl(''),
      auctionName: new FormControl(''),
      auctionStartDate: new FormControl(''),
      auctionEndDate: new FormControl(''),
    });
  }


  getAuctionList(pageNumber?: number, sortBy?: string, sorttype?: string) {
    this.showLoader = true;
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    let filters = {
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

    this.bidderService.getAuctionList(page, filters).subscribe((res: any) => {
      this.showLoader = false;
      this.showPageLoader = false;

      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      this.auctionListData = this.mapping(res.body);
      console.log("🚀🚀 ~~ this.auctionListData", this.mapping(res.body));

      if (res.body.d.results && res.body.d.results.length > 0) {
        this.PaginationServc.setPagerValues(
          +res.body.d.results[0].TotEle,
          10,
          +pageNoVal
        );
      }

    }, (error) => {
      this.showLoader = false;
    });
  }

  public mapping(serverObj: any): AuctionList[] {
    console.log("🚀 ~ mapping ~ serverObj", serverObj);
    if (!serverObj.d.results?.length) return [];
    let resultSet: AuctionList[] = [];
    this.totalCounts = {
      total_completed: serverObj.d.results[0].TotCompleted,
      total_under_gear: serverObj.d.results[0].TotRejected,
      total_upcoming: serverObj.d.results[0].TotPublish,
      total_ongoing: serverObj.d.results[0].TotPublishedOngoing,
      total_all: serverObj.d.results[0].TotAll
    }
    serverObj.d.results[0].page1tolistnav.results.forEach((result: any) => {
      const items: AuctionList = {
        ObjectId: result['ObjectId'] ? result['ObjectId'] : '0',
        title: result['Description'] ? result['Description'] : '',
        description: result['ZzAucDesc'] ? result['ZzAucDesc'] : '',
        imgsrc: result['ZzPrevAucId2'] ? result['ZzPrevAucId2'] : '',
        statuscode: result['Status'] ? result['Status'] : '',
        product: result['ZzTotPdt'] ? parseInt(result['ZzTotPdt']) : '',
        auctiondate: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? moment(result['ZzAucSrtDt'], 'YYYY-MM-DD').format('YYYY-MM-DD') : '' : '',
        auctiontime: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? moment(result['ZzAucEndDt'], 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss') : '' : '',
        auctionenddate: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? new Date(result['ZzAucEndDt']).getTime() : '' : '',
        auctiontimeSufix: 'evening',
      }
      resultSet.push(items);
    });
    return resultSet;
  }

  /** Populating the table pagination */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getAuctionList(selectedPageNumber);
    window.scrollTo(0, 100);
    this.PaginationServc.resetSorting();
  }

  // -----------------------------------filter section ------------------------------




  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }

  changeSelect(e: any, dd: string) {
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true
    })
  }

  public toggleFilter() {
    this.resetFilter();
    this.showFilterForm = !this.showFilterForm;
    this.refreshCalendarCntrl();
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

  // filter tab selection event

  onTabSelection(value: string) {
    this.filterFormGroup.controls['auctionStatus'].enable();
    this.selectedTab = value;
    // this.getAuctionList(1);
    this.getstatus(value);
    this.resetFilter();
    this.showFilterForm = false;
    if (value === 'All') {
      this.filterFormGroup.controls['auctionStatus'].setValue('');
    } else {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
    this.getAuctionList(1);
  }
  getstatus(type: any) {
    if (type === "All") {
      this.dropValStatus = [
        { code: "Published", disp: "Published" },
        { code: "Ongoing", disp: "Ongoing" },
        { code: "Pending Selecting", disp: "Pending Selecting" },
        { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
        { code: "Pending FBGA", disp: "Pending FBGA" },
        { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
        { code: "Awarded", disp: "Awarded" },
        { code: "Terminated", disp: "Terminated" },
      ];
    } else if (type === "Pending Selecting") {
      this.dropValStatus = [
        { code: "Pending Selecting", disp: "Pending Selecting" },
        { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
        { code: "Pending FBGA", disp: "Pending FBGA" },
        { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
      ];
    } else if (type === "Closed") {
      this.dropValStatus = [
        { code: "Awarded", disp: "Awarded" },
        { code: "Terminated", disp: "Terminated" },
      ];
    }
  }

  resetFilter() {
    this.filterFormGroup.controls['prevRefNo'].setValue('');
    this.filterFormGroup.controls['auctionName'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionStartDate'].setValue('');
    this.filterFormGroup.controls['auctionEndDate'].setValue('');
    this.refreshCalendarCntrl();
  }

}