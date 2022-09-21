import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { CookieService } from 'ngx-cookie-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import moment from 'moment-mini';
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
  copyInvoiceListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;
  totcntforall: number;
  totcntforawaiting: number;
  totcntforpaid: number;
  selectedTab: string = 'All';
  showLoader: boolean = false;
  dropValStatus: any = [
    { name: "Pending Paying", value: "Pending Paying" },
    { name: "Paid", value: "Paid" }
  ];
  // Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  lang: string;
  filterModel = {
    referenceno: '',
    amount: '',
    issue_date: '',
    status: '',
  }
  pageRangeForAttach: any;
  columnLst = ['referenceno', 'auctionStartDate', 'invoiceAmt', 'entityName', 'auctionStatus'];
  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
    private bidderService: BidderService,
    public envService: EnvService
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }



  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    this.filterForm();
    this.getInvoiceList();
  }

  encryptData(data: any) {
    return btoa(data);
  }

  getInvoiceList() {
    this.showLoader = true;
    this.bidderService.getMyInvoiceList().subscribe((res: any) => {
      this.showLoader = false;
      this.invoiceListData = this.mapping(res);
      this.copyInvoiceListData = this.invoiceListData;
      this.navigateToPage(1)
    });
  }

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
        items.auctionStatus = 'Pending Paying';
      }
      else {
        items.auctionStatus = 'Paid';
      }
      resultSet.push(items);
    });
    return resultSet;
  }

  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    setTimeout(() => {
      $("#invoice_date").unbind().removeData();
      $("#invoice_date").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#invoice_date").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#invoice_date");
        e?.dispatchEvent(v);
      });
    }, 100);
  }


  onTabSelection(value: string) {
    this.filterFormGroup.controls['auctionStatus'].enable();
    this.selectedTab = value;
    this.resetFilter();

    if (value === 'All') {
      this.invoiceListData = this.copyInvoiceListData;
    } else {
      this.invoiceListData = this.copyInvoiceListData.filter((invoice: any) => invoice.auctionStatus == value)
    }

    this.showFilterForm = false;
    if (value !== 'All') {
      this.filterFormGroup.controls['auctionStatus'].setValue(value);
      this.filterFormGroup.controls['auctionStatus'].disable();
    }
    this.navigateToPage(1);
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
    // this.invoiceListData = this.copyInvoiceListData;
    this.getInvoiceList()
  }

  applyFilter() {
    this.invoiceListData = this.copyInvoiceListData;
    // this.getInvoiceList();
    if (this.filterModel.amount) {
      this.invoiceListData = this.invoiceListData.filter((i: any) => {
        if (i.invoiceAmt.toLowerCase().indexOf(this.filterModel.amount) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.status) {
      this.invoiceListData = this.invoiceListData.filter((i: any) => {
        if (i.auctionStatus.toLowerCase().indexOf(this.filterModel.status.toLowerCase()) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.referenceno) {
      this.invoiceListData = this.invoiceListData.filter((i: any) => {
        if (i.referenceno.toLowerCase().indexOf(this.filterModel.referenceno.toLowerCase()) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.issue_date) {
      console.log('this.filterModel: ', this.filterModel);
      this.invoiceListData = this.invoiceListData.filter((i: any) => {
        if (i.auctionStartDate === this.filterModel.issue_date) return true;
        return false;
      })
    }
    this.navigateToPage(1)
  }

  onChangeDate($event: any) {
    this.filterModel.issue_date = $event.target.value;
  }

  resetFilter() {
    this.filterModel = {
      referenceno: '',
      amount: '',
      issue_date: '',
      status: '',
    }
    this.refreshCalendarCntrl()
    // this.invoiceListData = this.copyInvoiceListData;
  }

  navigateToPage(pageNoVal: number) {
    this.PaginationServc.setPagerValues(this.invoiceListData.length, this.pagelimit, pageNoVal);
    this.pageRangeForAttach = {
      rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * this.pagelimit),
      rangeEnd: pageNoVal == 1 ? (this.pagelimit - 1) : ((pageNoVal - 1) * this.pagelimit) + (this.pagelimit - 1),
      pages: this.PaginationServc.pages,
      currentPage: this.PaginationServc.currentPage,
      totalPages: this.PaginationServc.totalPages,
    }
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.invoiceListData, this.columnLst[columnId]);
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
