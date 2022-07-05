import { EnvService } from 'src/app/env.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import * as moment from 'moment-mini';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BidderService } from '../../services/bidder.service';
declare var $: any;

@Component({
  selector: 'app-am-auction',
  templateUrl: './am-auction.component.html',
  styleUrls: ['./am-auction.component.scss']
})
export class AmAuctionComponent implements OnInit {

  auctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  totcntforendedauction: number;
  totcntforundergear: number;
  totcntforupcommingauction: number;
  totcntforongoingauction: number;
  totcntforall: number;
  showLoader: boolean = false;
  dropValProducts: any = [
    { code: "Public", disp: "Public" },
    { code: "Private", disp: "Private" }
  ];
  dropValStatus: any = [];
  showPageLoader: boolean = false;
  selectedTab: string = 'All';
  //filter Form controls
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
    this.setStatus();
    this.defineForm();
    this.getAuctionList(1);
  }

  setStatus() {
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
    let role = '';
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

    console.log("🚀 ~ this.auctionServc.getAuctionList ~ filters", filters)
    this.bidderService.getAuctionList(page, filters).subscribe((res: any) => {
      this.showLoader = false;
      this.showPageLoader = false;

      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      this.auctionListData = this.mapping(res.body);

      if (res.body.d.results && res.body.d.results.length > 0) {
        this.PaginationServc.setPagerValues(
          +res.body.d.results[0].TotEle,
          10,
          +pageNoVal
        );
      }

    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionList RespError : ', error);
    });
  }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforendedauction = serverObj.d.results[0].TotCompleted;
    this.totcntforundergear = serverObj.d.results[0].TotPendingRw;
    this.totcntforupcommingauction = serverObj.d.results[0].TotPublished;
    this.totcntforongoingauction = serverObj.d.results[0].TotOngoing;
    this.totcntforall = serverObj.d.results[0].TotAll;
    serverObj.d.results[0].page1tolistnav.results.forEach((result: any) => {
      console.log(result['Description'], "sdsd");
      const items = {
        ObjectId: result['ObjectId'] ? result['ObjectId'] : '0',
        title: result['Description'] ? result['Description'] : '',
        description: result['ZzAucDesc'] ? result['ZzAucDesc'] : '',
        imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
        statuscode: result['Status'] ? result['Status'] : '',
        product: result['ZzTotPdt'] ? parseInt(result['ZzTotPdt']) : '',
        auctionstartdate: result['ZzAucSrtDt'] ? result['ZzAucSrtDt'] !== 0 ? result['ZzAucSrtDt'] : '' : '',
        auctionenddate: result['ZzAucEndDt'] ? result['ZzAucEndDt'] !== 0 ? result['ZzAucEndDt'] : '' : '',
      }
      resultSet.push(items);
    });
    console.log(resultSet, "auc");
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
    if (value !== 'All' && value !== 'Pending Selecting' && value !== 'Closed') {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
  }
  getstatus(type: any) {
    if (type === "All") {
      this.dropValStatus = ["Published", "Ongoing", "Pending Selecting", "Pending Primary Awarding", "Pending FBGA", "Pending FBGA Approval", "Awarded", "Terminated"];
    } else if (type === "Pending Selecting") {
      this.dropValStatus = ["Pending Selecting", "Pending Primary Awarding", "Pending FBGA", "Pending FBGA Approval"];
    } else if (type === "Closed") {
      this.dropValStatus = ["Awarded", "Terminated"];
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
    this.getAuctionList(1);
  }

  // changeCheckbox(e: any, dd: string) {
  //   if(e.target.checked){
  //     this.filterFormGroup.controls[dd].setValue(e.target.value, {
  //       onlySelf: true
  //     })      
  //   }else{
  //     this.filterFormGroup.controls[dd].setValue('', {
  //       onlySelf: true
  //     })     
  //   }
  // }
}