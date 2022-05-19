import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import * as moment from 'moment-mini';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  auctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  totcntforendedauction: number;
  totcntforundergear: number;
  totcntforupcommingauction: number;
  totcntforongoingauction: number;
  totcntforall: number;
  showLoader: boolean = false;

  selectedTab: string = 'All';
  //filter Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    private http: HttpClient,
    public translate: TranslateService,
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforendedauction = serverObj.d.results[0].TotDraft;
    this.totcntforundergear = serverObj.d.results[0].TotRejected;
    this.totcntforupcommingauction = serverObj.d.results[0].TotPublish;
    this.totcntforongoingauction = serverObj.d.results[0].TotPendingRw;
    this.totcntforall = serverObj.d.results[0].TotAll;
    serverObj.d.results[0].auciton_list.forEach((result: any) => {
      const items = {
        imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
        statuscode: result['statuscode'] ? result['statuscode'] : '',
        statuscount: result['statuscount'] ? result['statuscount'] : '',
        title: result['title'] ? result['title'] : '',
        description: result['description'] ? result['description'] : '',
        product: result['product'] ? result['product'] : '',
        auctiondate: result['auctiondate'] ? result['auctiondate'] !== 0 ? result['auctiondate'].split(" ")[0] : '' : '',
        auctiontime: result['auctiondate'] ? result['auctiondate'] !== 0 ? moment(result['auctiondate'].split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        auctiontimeSufix: result['auctiondate'] ? result['auctiondate'] !== 0 ? moment(result['auctiondate'].split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        auctionenddate: result['auctionEndDate'] ? new Date(result['auctionEndDate']).getTime() : '',
        // auctionenddate: result['auctionEndDate'] ? moment(result['auctionEndDate'], moment.ISO_8601).valueOf(): '',
        auction_detail: result['auction_detail'] ? result['auction_detail'] : '',
      }
      resultSet.push(items);
    });
    console.log(resultSet, "auc");
    return resultSet;
  }

  ngOnInit(): void {
    this.filterForm();
    this.getAuctionList(1);
  }
  // filter tab selection event

  onTabSelection(value: string) {
    this.selectedTab = value;
    this.getAuctionList(1);
  }

  getAuctionList(pageNumber?: number) {
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    const filters = {
      Status: this.selectedTab,
      auctionStatus: this.filterFormGroup.controls['auctionStatus'].value,
      auctionType: this.filterFormGroup.controls['auctionType'].value,
      myAuction: this.filterFormGroup.controls['myAuction'].value,
    };

    this.http.get<any>(environment.apiBidderAuctions, { responseType: 'json' }).subscribe(res => {
      this.showLoader = false;

      //   this.PaginationServc.setPagerValues(
      //     +res.body.d.results[0].TotEle,
      //     10,
      //     +pageNoVal
      //   );

      //   const csrfToken = localStorage.getItem("x-csrf-token");    
      //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      console.log(res, "f");
      this.auctionListData = this.mapping(res);
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionList RespError : ', error);
    });

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
    //   console.log('getAuctionList RespError : ', error);
    // });
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

  filterForm() {
    this.filterFormGroup = this.formBuilder.group({
      auctionStatus: new FormControl(''),
      auctionType: new FormControl(''),
      myAuction: new FormControl(''),
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }

  public toggleFilter() {
    this.showFilterForm = !this.showFilterForm;
  }

  resetFilter() {
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
    this.getAuctionList(1);
  }

  changeCheckbox(e: any, dd: string) {
    if (e.target.checked) {
      this.filterFormGroup.controls[dd].setValue(e.target.value, {
        onlySelf: true
      })
    } else {
      this.filterFormGroup.controls[dd].setValue('', {
        onlySelf: true
      })
    }
  }
  changeSelect(e: any, dd: string) {
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true
    })
  }
}
