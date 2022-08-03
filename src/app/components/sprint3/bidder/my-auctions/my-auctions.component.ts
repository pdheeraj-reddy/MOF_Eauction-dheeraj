import { HttpXsrfTokenExtractor, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
// import { getStatusText } from 'angular-in-memory-web-api';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { EnvService } from 'src/app/env.service';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { getStatusText } from '../../../../utils/util';
import { BidderService } from '../../services/bidder.service';
declare var $: any;

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.scss']
})
export class MyAuctionsComponent implements OnInit {

  myAuctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;
  totcntforall: number;
  totcntforongoing: number;
  totcntforupcomming: number;
  totcntforundergear: number;
  totcntforcancelled: number;
  selectedTab: string = 'All';
  showLoader: boolean = false;
  isFilterSearch: boolean = false;
  isSearch: boolean = false;
  dropValProducts: any = ['Public', 'Private'];
  dropValStatus: any = ["Published", "Ongoing", "Pending Selecting", "Pending Primary Awarding", "Pending FBGA", "Pending FBGA Approval", "Awarded", "Terminated"];
  // Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  sortCol: any = [
    { col: 'ObjectId', 'sType': 'D' },
    { col: 'auctionName', 'sType': 'D' },
    { col: 'Description', 'sType': 'D' },
    { col: 'BidType', 'sType': 'D' },
    { col: 'Status', 'sType': 'D' },
    { col: 'ZzAucEndDt', 'sType': 'D' },
    { col: 'ZzAucSrtDt', 'sType': 'D' },
  ];


  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    private cookieService: CookieService,
    private csrfTokenExtractor: HttpXsrfTokenExtractor,
    private http: HttpClient,
    public translate: TranslateService,
    private envService: EnvService,
    private bidderSer: BidderService
  ) {
    PaginationServc.reset();
  }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforall = serverObj.d.results[0]?.TotAll;
    this.totcntforongoing = serverObj.d.results[0]?.TotPublishedOngoing;
    this.totcntforupcomming = serverObj.d.results[0]?.TotPublish;
    this.totcntforundergear = serverObj.d.results[0]?.TotPendSelect;
    this.totcntforcancelled = serverObj.d.results[0]?.TotCompleted;
    serverObj.d.results[0]?.page1tolistnav.results.forEach((result: any) => {
      const items = {
        ObjectId: result['ObjectId'] ? result['ObjectId'] : '0',
        DraftId: result['DraftId'] ? result['DraftId'] : '0',
        referenceno: result['ObjectId'] ? result['ObjectId'] : '',
        auctionName: result['Description'] ? result['Description'] : '',
        auctionType: result['BidType'] ? this.getAuctionTypeDesc(result['BidType']) : this.getAuctionTypeDesc('C'), // Hardcoded due to DB inconsist
        auctionStatus: result['Status'] ? getStatusText(result['Status']) : '',
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
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.filterForm();
    this.getMyAuctionList(1);
  }

  getMyAuctionList(pageNumber?: number, sortBy?: string, sorttype?: string) {

    this.showLoader = true;
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
    if (this.isFilterSearch) {
      filters.Status = this.filterFormGroup.controls['auctionStatus'].value;
      // filters.Message = 'F';
      if (filters.ObjectId || filters.Description || filters.BidType || filters.EndDate || filters.StartDate) {
        if (this.selectedTab == 'All' || this.selectedTab == '') {
          filters.Status = 'All';
        } else {
          filters.Status = this.selectedTab;
        }
      } else {
        if (this.filterFormGroup.controls['auctionStatus'].value) {
          filters.Status = this.filterFormGroup.controls['auctionStatus'].value;
        } else {
          filters.Status = this.selectedTab ?? '';
        }
      }
    }
    // if ((this.selectedTab === 'All' || this.selectedTab === 'Pending Selecting' || this.selectedTab === 'Closed') && this.filterFormGroup.controls['auctionStatus'].value !== '') {
    //   filters.Status = this.filterFormGroup.controls['auctionStatus'].value;
    //   filters.Message = 'F';
    // }

    if (this.isSearch) {
      filters.Status = 'All';
      this.selectedTab = 'All';
      this.isSearch = false;
    }

    if (sortBy && sorttype) {
      filters.Msgty = sorttype + ' ' + sortBy;
    }

    console.log('filters: ', filters);
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidType !== '' ? " and BidType eq '" + filters.BidType + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '') + (filters.Msgty !== '' ? " and Msgty eq '" + filters.Msgty + "'" : '');
    this.bidderSer.getMyAuctionsList($filters, pageLimit, this.selectedTab, pageNumber).subscribe((res: any) => {
      this.showLoader = false;
      this.isFilterSearch = false;
      if (res) {
        this.myAuctionListData = this.mapping(res.body);
        this.PaginationServc.setPagerValues(+res.body.d.results[0]?.TotEle, 10, +pageNoVal);
      }
    }, (error) => {
      this.showLoader = false;
    })
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

  // filter form

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
    this.isSearch = false;
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

    this.getMyAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
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
    this.getMyAuctionList(1);

    this.resetFilter();
    this.showFilterForm = false;
    if (value !== 'All') {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
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

  sortBy(sortBy?: string, columnId?: number) {
    columnId = columnId ? columnId : 0;
    var foundIndex = this.sortCol.findIndex((el: { col: any; }) => el.col === sortBy);
    this.sortByTableHeaderId(columnId, 'string');
    this.sortCol[foundIndex].sType = this.sortCol[foundIndex].sType === 'A' ? 'D' : 'A';
    this.getMyAuctionList(1, sortBy, this.sortCol[foundIndex].sType);
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  isSorting(columnId: number) {
    return this.PaginationServc.columnId !== columnId;
  }
  isSortAsc(columnId: number) {
    return this.PaginationServc.isSortAsc(columnId);
  }
  isSorDesc(columnId: number) {
    return this.PaginationServc.isSortDesc(columnId);
  }

}
