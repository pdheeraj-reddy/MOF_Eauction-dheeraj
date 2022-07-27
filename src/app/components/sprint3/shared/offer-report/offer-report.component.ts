import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OfferReport } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-offer-report',
  templateUrl: './offer-report.component.html',
  styleUrls: ['./offer-report.component.scss']
})
export class OfferReportComponent implements OnInit {
  editmode1: boolean = false;
  editmode2: boolean = false;
  editmode3: boolean = true;
  editmode4: boolean = false;

  showLoader: boolean = true;

  offerListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  offervalue: string;
  facilityname: string;
  commercialNo: string
  //filter Form controls
  showFilterForm: boolean = false;
  dropValType: any = [];
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
  offerReport: OfferReport = new OfferReport();
  filterFormGroup: FormGroup;
  constructor(
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
    public bidderService: BidderService,
  ) { }

  ngOnInit(): void {
    this.defineForm();
    this.getOfferList(1);
  }
  defineForm() {
    this.filterFormGroup = this.formBuilder.group({
      auctionStatus: new FormControl(''),
      auctionType: new FormControl(''),
      myAuction: new FormControl(''),
    });
  }
  public mapping(serverObj: any) {
    this.offerReport = {
      auctionSetting: {
        bitsNo: serverObj.d.results[0].bitsNo,
        participants: serverObj.d.results[0].participants,
      },
      auctionReport: serverObj.d.results[0].auctionReport,
      offerList: []
    };
    if (serverObj.d.results[0].offer_report) {
      serverObj.d.results[0].offer_report.forEach((result: any) => {
        let date = result['submission_date'].replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3");
        const items = {
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          offervalue: result['offervalue'] ? result['offervalue'] : '',
          filename: result['filename'] ? result['filename'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
          submission_date: this.datepipe.transform(date, 'yyyy-MM-dd'),
          submission_time: this.timeTransform(result['submission_date']),
          facility_name: result['facility_name'] ? result['facility_name'] : '',
          commercialRegNo: result['commercialRegNo'] ? result['commercialRegNo'] : '',
        }
        this.offerReport.offerList?.push(items);
      });
    }
    console.log(this.offerReport);
  }
  timeTransform(time: any) {
    var d = new Date(time.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
    let hour: any = d.getHours();
    let min: any = d.getMinutes()
    let part = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var strTime = hour + ':' + min + ' ' + part;
    return strTime;
  }
  getOfferList(pageNumber?: number) {
    this.showLoader = true;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    let filters = {
      Status: this.filterFormGroup.controls['auctionStatus'].value ? this.filterFormGroup.controls['auctionStatus'].value : '',
      BidType: this.filterFormGroup.controls['auctionType'].value ? (this.filterFormGroup.controls['auctionType'].value === 'Public' ? 'O' : 'C') : '',
      myAuction: this.filterFormGroup.controls['myAuction'].value ? this.filterFormGroup.controls['myAuction'].value : '',
    };
    this.bidderService.getOfferList(page, filters, '9700000300').subscribe((res: any) => {
      this.showLoader = false;

      localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      this.offerListData = this.mapping(res.body);

    }, (error) => {
      this.showLoader = false;
      console.log('getOfferList RespError : ', error);
    });
    // this.mapping(res.body);
  }
  auctionSettings(type: string) {
    if (type == "auctionDetail") {
      this.editmode1 = true;
      this.editmode2 = false;
      this.editmode3 = false;
      this.editmode4 = false;
    } else if (type == 'auctionInstruction') {
      this.editmode1 = false;
      this.editmode2 = true;
      this.editmode3 = false;
      this.editmode4 = false;
    } else if (type == 'auctionCommittee') {
      this.editmode1 = false;
      this.editmode2 = false;
      this.editmode3 = false;
      this.editmode4 = true;
    } else {
      this.editmode1 = false;
      this.editmode2 = false;
      this.editmode3 = true;
      this.editmode4 = false;
    }
  }

  // download report
  downloadReport(data: any) {
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  /** Populating the table */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getOfferList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

  // -------------------------------------- filter code -------------------------------- 


  public toggleFilter() {
    console.log("toggleFilter");
    this.showFilterForm = !this.showFilterForm;
  }

  applyFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
    this.getOfferList(1);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }


  resetFilter() {
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
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
