import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { CookieService } from 'ngx-cookie-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment-mini';
import { EnvService } from 'src/app/env.service';
import { BidderService } from '../../services/bidder.service';
declare var $: any;

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.scss']
})
export class MyInvoicesComponent implements OnInit {

  invoiceListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;
  totcntforall: number;
  totcntforawaiting: number;
  totcntforpaid: number;
  selectedTab: string = 'All';
  showLoader: boolean = false;
  dropValStatus: any = ["Awaiting Payment", "Paid"];
  // Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  sortCol: any = [
    { col: 'ObjectId', 'sType': 'D' },
    { col: 'offerdate', 'sType': 'D' },
    { col: 'Description', 'sType': 'D' },
    { col: 'ZzagencyName', 'sType': 'D' },
    { col: 'entityName', 'sType': 'D' },
    { col: 'paymentStatus', 'sType': 'D' },
  ];


  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    private cookieService: CookieService,
    private csrfTokenExtractor: HttpXsrfTokenExtractor,
    private http: HttpClient,
    public translate: TranslateService,
    private envService: EnvService,
    private bidderService: BidderService,
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforall = serverObj.body.d.results[0].TotAll;
    this.totcntforawaiting = serverObj.body.d.results[0].TotAwaitPayment;
    this.totcntforpaid = serverObj.body.d.results[0].TotPaid;
    serverObj.body.d.results[0].pagetomyinvoicenav.results.forEach((result: any) => {
      const items = {
        ObjectId: result['ObjectId'] ? result['ObjectId'] : '0',
        DraftId: result['DraftId'] ? result['DraftId'] : '0',
        referenceno: result['ObjectId'] ? result['ObjectId'] : '',
        invoiceAmt: result['BidderValue'] ? result['BidderValue'] : '',
        entityName: result['ZzAgencyName'] ? result['ZzAgencyName'] : '',
        auctionStatus: result['InvoiceStatus'] ? result['InvoiceStatus'] : '',
        auctionStartDate: result['OfferDate'] ? result['OfferDate'] !== 0 ? moment(result['OfferDate'], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionStartTime: result['OfferTime'] ? result['OfferTime'] !== 0 ? moment(result['OfferTime'], 'HH:mm:ss').format('hh:mm') : '' : '',
        auctionStartTimeSufix: result['OfferTime'] ? result['OfferTime'] !== 0 ? moment(result['OfferTime'], 'HH:mm:ss').format('A') : '' : '',
      }
      console.log("AUCTION", items.auctionStatus)
      if (items.auctionStatus == 'N') {
        items.auctionStatus = 'Awaiting Payment';
      }
      else {
        items.auctionStatus = 'Paid';
      }
      resultSet.push(items);
    });
    return resultSet;
  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.filterForm();
    this.getInvoiceList(1);
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
    this.getInvoiceList(1);

    this.resetFilter();
    this.showFilterForm = false;
    if (value !== 'All') {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
  }

  getInvoiceList(pageNumber?: number, sortBy?: string, sorttype?: string) {
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



    console.log(filters, "filters");
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    let $filters = (filters.Status !== '' ? " and Status eq '" + filters.Status + "'" : '') + (filters.ObjectId !== '' ? " and ObjectId eq '" + filters.ObjectId + "'" : '') + (filters.Description !== '' ? " and Description eq '" + filters.Description + "'" : '') + (filters.BidType !== '' ? " and BidType eq '" + filters.BidType + "'" : '') + (filters.StartDate !== '' ? " and ZzAucSrtDt eq '" + filters.StartDate + "'" : '') + (filters.EndDate !== '' ? " and ZzAucEndDt eq '" + filters.EndDate + "'" : '') + (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '');
    this.showLoader = true;
    this.bidderService.getMyInvoiceList().subscribe((res: any) => {
      this.showLoader = false;
      this.invoiceListData = this.mapping(res);
    });
    // this.http.get<any>(this.envService.environment.apiBidderMyInvoices 
    //   // "?$expand=page1tolistnav" + 
    //   // "&$filter=(PageLimit eq '" + pageLimit + "' and PageNo eq '" + pageNumber + "' and ScreenNav eq 'A'" + $filters + ")&$format=json" 
    //   ,{responseType: 'json'}).subscribe(res=>{
    //     this.showLoader = false;

    // //   this.PaginationServc.setPagerValues(
    // //     +res.body.d.results[0].TotEle,
    // //     10,
    // //     +pageNoVal
    // //   );

    // //   const csrfToken = localStorage.getItem("x-csrf-token");    
    // //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
    //   console.log(res,"f");
    //   this.invoiceListData = this.mapping(res);
    // }, (error) => {
    //     this.showLoader = false;
    //     console.log('getAuctionList RespError : ', error);
    //   });
    // this.auctionServc.getAuctionList(page, filters).subscribe((res: any) => {
    //   this.showLoader = false;

    //   this.PaginationServc.setPagerValues(
    //     +res.body.d.results[0].TotEle,
    //     10,
    //     +pageNoVal
    //   );

    //   const csrfToken = localStorage.getItem("x-csrf-token");
    //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
    //   this.auctionListData = this.mapping(res.body);

    // }, (error) => {
    //   this.showLoader = false;
    //   console.log('getInvoiceList RespError : ', error);
    // });
  }

  sortBy(sortBy?: string) {
    var foundIndex = this.sortCol.findIndex((el: { col: any; }) => el.col === sortBy);
    this.sortCol[foundIndex].sType = this.sortCol[foundIndex].sType === 'A' ? 'D' : 'A';
    this.getInvoiceList(1, sortBy, this.sortCol[foundIndex].sType);
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

    this.getInvoiceList(selectedPageNumber);
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
    this.getInvoiceList(1);
  }


}
