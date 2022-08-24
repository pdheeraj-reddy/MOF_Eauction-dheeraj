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
    // { code: "Open", disp: "Open" },
    { code: "Closed", disp: "Closed" }
  ];
  dropValStatus = [
    { code: "Upcoming", disp: "Upcoming" },
    { code: "Ongoing", disp: "Ongoing" },
    { code: "Pending Selecting", disp: "Pending Selecting" },
    { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
    { code: "Pending FBGA", disp: "Pending FBGA" },
    { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
    { code: "Pending Paying", disp: "Pending Paying" },
    { code: "Awarded", disp: "Awarded" },
    { code: "Terminated", disp: "Terminated" },
  ];;
  showPageLoader: boolean = false;
  showPagination: boolean = false;
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
      biddingMethod: new FormControl(''),
      auctionStatus: new FormControl(''),
      prevRefNo: new FormControl(''),
      auctionName: new FormControl(''),
      auctionStartDate: new FormControl(''),
      auctionEndDate: new FormControl(''),
    });
  }


  getAuctionList(pageNumber?: number, sortBy?: string, sorttype?: string) {
    this.showLoader = true;
    this.showPagination = false;
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    let filters = {
      Status: this.selectedTab,
      ObjectId: this.filterFormGroup.controls['prevRefNo'].value ? this.filterFormGroup.controls['prevRefNo'].value : '',
      Description: this.filterFormGroup.controls['auctionName'].value ? this.filterFormGroup.controls['auctionName'].value : '',
      BidMethod: this.filterFormGroup.controls['biddingMethod'].value ? (this.filterFormGroup.controls['biddingMethod'].value === 'Closed' ? 'C' : 'D') : '',
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
      this.showPagination = true;

      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      console.log('this.bidderService.XCSRFToken: ', this.bidderService.XCSRFToken);
      localStorage.setItem('x-csrf-token', this.bidderService.XCSRFToken)
      this.auctionListData = this.mapping(res.body);
      console.log("🚀🚀 ~~ this.auctionListData", this.auctionListData);

      if (res.body.d.results && res.body.d.results.length > 0) {
        this.PaginationServc.setPagerValues(
          +res.body.d.results[0].TotEle,
          6,
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
      total_under_gear: serverObj.d.results[0].TotPendSelect,
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
        auctiondate: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? moment(result['ZzAucSrtDt'].split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctiontime: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? this.convert(result['ZzAucSrtDt']) : '' : '',
        auctionenddate: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? moment(result['ZzAucEndDt'].split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionendtime: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? this.convert(result['ZzAucEndDt']) : '' : '',
        auctiontimeSufix: 'evening',
      }
      resultSet.push(items);
    });

    return resultSet;
  }
  /** Convert the date into Date object */
  convert(hms: any) {
    const date = hms.split(" ")[0];
    const Time = hms.split(" ")[1];
    const [day, month, year] = date.split(".");
    const [hours, minutes, seconds] = Time.split(':');
    var time = new Date(year, Number(month) - 1, day, hours, minutes, seconds);
    // time.setMinutes(time.getMinutes()+150);
    return time;
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
    if (this.showFilterForm) {
      this.resetFilter();
    }
    this.showFilterForm = !this.showFilterForm;
    this.refreshCalendarCntrl();
    if (!this.showFilterForm) {
      this.getAuctionList(1);
    }
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
    this.showPagination = false;
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
        { code: "Upcoming", disp: "Upcoming" },
        { code: "Ongoing", disp: "Ongoing" },
        { code: "Pending Selecting", disp: "Pending Selecting" },
        { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
        { code: "Pending FBGA", disp: "Pending FBGA" },
        { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
        { code: "Pending Paying", disp: "Pending Paying" },
        { code: "Awarded", disp: "Awarded" },
        { code: "Terminated", disp: "Terminated" }
      ];
    } else if (type === "Pending Selecting") {
      this.dropValStatus = [
        { code: "Pending Selecting", disp: "Pending Selecting" },
        { code: "Pending Primary Awarding", disp: "Pending Primary Awarding" },
        { code: "Pending FBGA", disp: "Pending FBGA" },
        { code: "Pending FBGA Approval", disp: "Pending FBGA Approval" },
        { code: "Pending Paying", disp: "Pending Paying" }
      ];
    } else if (type === "Closed") {
      this.dropValStatus = [
        { code: "Awarded", disp: "Awarded" },
        { code: "Terminated", disp: "Terminated" },
      ];
    }
  }

  resetFilter() {
    if (
      this.filterFormGroup.controls['prevRefNo'].value != '' ||
      this.filterFormGroup.controls['auctionName'].value != '' ||
      this.filterFormGroup.controls['biddingMethod'].value != '' ||
      this.filterFormGroup.controls['auctionStatus'].value != '' ||
      this.filterFormGroup.controls['auctionStartDate'].value != '' ||
      this.filterFormGroup.controls['auctionEndDate'].value != ''
    ) {
      this.filterFormGroup.controls['prevRefNo'].setValue('');
      this.filterFormGroup.controls['auctionName'].setValue('');
      this.filterFormGroup.controls['biddingMethod'].setValue('');
      this.filterFormGroup.controls['auctionStatus'].setValue('');
      this.filterFormGroup.controls['auctionStartDate'].setValue('');
      this.filterFormGroup.controls['auctionEndDate'].setValue('');
      // this.getAuctionList(1);
      this.refreshCalendarCntrl();
    }
  }
}