import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OfferReport } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { BidderService } from '../../services/bidder.service';
import { CommitteeHeadService } from '../../services/committee-head.service';
declare var $: any;
@Component({
  selector: 'app-offer-report',
  templateUrl: './offer-report.component.html',
  styleUrls: ['./offer-report.component.scss']
})
export class OfferReportComponent implements OnInit {

  @Input() auctionId: string;

  openofferListData: any;
  copyOpenofferListData: any;
  showLoader: boolean = true;
  auctionReport: any;
  offerListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  offervalue: string;
  facilityname: string;
  commercialNo: string
  //filter Form controls
  showFilterForm: boolean = false;
  dropValType: any = [];
  filterFormGroup: FormGroup;
  filterModel = {
    offer_value: '',
    facility_name: '',
    submission_date: '',
    commercial_ref: '',
  }
  spinner: boolean = false;
  columnLst = ['serialNo', 'offerValue', 'primaryWarranty', 'submissionDate', 'facilityName', 'commercialRegistrationNo', 'bidderStatus'];
  pageRangeForAttach: any;
  constructor(
    public datepipe: DatePipe,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
    public bidderService: BidderService,
    public committeeHeadService: CommitteeHeadService,
  ) { }

  ngOnInit(): void {
    this.getOffersData();
    this.refreshCalendarCntrl()
  }


  getOffersData() {
    this.showLoader = true;
    this.committeeHeadService.getOpenOfferList(this.auctionId).subscribe((res: any) => {
      this.committeeHeadService.XCSRFToken = res.headers.get('x-csrf-token');
      localStorage.setItem('x-csrf-token', this.committeeHeadService.XCSRFToken)
      this.mapping(res.body);
    });
  }

  public mapping(serverObj: any) {
    if (serverObj.d.results?.length) {
      let results = serverObj.d.results;
      console.log('results: ', results);
      let resultSet: any = [];
      if (results?.length) {
        results.forEach((result: any) => {
          if (result.serialNo) {
            let date = result['DtTime'].replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3");
            const items = {
              serialNo: result['Sno'] ? result['Sno'] : '-',
              offerValue: result['OfferValue'] ? result['OfferValue'] : '-',
              BidderId: result['BidderId'] ? result['BidderId'] : null,
              PdfContent: result['PdfContent'] ? result['PdfContent'] : null,
              submissionDate: this.datepipe.transform(date, 'yyyy-MM-dd'),
              submissionTime: this.timeTransform(result['DtTime']),
              facilityName: result['BidderName'] ? result['BidderName'] : '-',
              FileName: result['FileName'] ? result['FileName'] : '',
              bidderStatus: result['bidderStatus'] ? result['bidderStatus'] : '',
              commercialRegistrationNo: result['CrNo'] ? result['CrNo'] : '-',
              downloadingAttachmet: false
            };
            resultSet.push(items);
          }
        });
      }
      this.showLoader = false;
      this.openofferListData = resultSet;
      this.copyOpenofferListData = resultSet;
      this.navigateToPage(1);
      console.log('this.openofferListData: ', this.openofferListData);
    }
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

  // download report
  downloadReport(data: any) {
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  viewAttachment(file: any) {
    if (file.PdfContent) {
      file.downloadingAttachmet = true;
      this.committeeHeadService.downloadAuctionImages(file.PdfContent).subscribe((downloadAuctionImagesResp: any) => {
        console.log(downloadAuctionImagesResp);
        const fileResp = downloadAuctionImagesResp.d;
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        console.log('asdasd', byteString.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'application/pdf' });
        let fileURL = window.URL.createObjectURL(blob);
        console.log('fileURL ', fileURL);
        var newWin: any;
        newWin = window.open(fileURL, '_blank');
        // newWin = this.downloadFile(file.name, file.MIMEType, fileURL);
        if ((!newWin || newWin.closed || typeof newWin.closed == 'undefined')) {
          alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
        }
        file.downloadingAttachmet = false;
        // window.open(fileContent, "_blank");
      },
        (error) => {
          file.downloadingAttachmet = false;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
    }
  }


  public toggleFilter() {
    console.log("toggleFilter");
    this.showFilterForm = !this.showFilterForm;
  }

  resetFilter() {
    this.filterModel = {
      offer_value: '',
      facility_name: '',
      submission_date: '',
      commercial_ref: '',
    }
    this.refreshCalendarCntrl()
    this.openofferListData = this.copyOpenofferListData;
  }

  applyFilter() {
    this.openofferListData = this.copyOpenofferListData;
    if (this.filterModel.offer_value) {
      this.openofferListData = this.openofferListData.filter((i: any) => {
        if (i.offerValue.toLowerCase().indexOf(this.filterModel.offer_value.toLowerCase()) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.facility_name) {
      this.openofferListData = this.openofferListData.filter((i: any) => {
        console.log(i.facilityName, this.filterModel.facility_name)
        if (i.facilityName.toLowerCase().indexOf(this.filterModel.facility_name.toLowerCase()) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.commercial_ref) {
      this.openofferListData = this.openofferListData.filter((i: any) => {
        if (i.BidderId.toLowerCase().indexOf(this.filterModel.commercial_ref.toLowerCase()) > -1) return true;
        return false;
      })
    }
    if (this.filterModel.submission_date) {
      this.openofferListData = this.openofferListData.filter((i: any) => {
        if (i.submissionDate === this.filterModel.submission_date) return true;
        return false;
      })
    }
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.openofferListData, this.columnLst[columnId]);
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

  navigateToPage(pageNoVal: number) {
    this.PaginationServc.setPagerValues(this.openofferListData.length, this.pagelimit, pageNoVal);
    this.pageRangeForAttach = {
      rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * this.pagelimit),
      rangeEnd: pageNoVal == 1 ? (this.pagelimit - 1) : ((pageNoVal - 1) * this.pagelimit) + (this.pagelimit - 1),
      pages: this.PaginationServc.pages,
      currentPage: this.PaginationServc.currentPage,
      totalPages: this.PaginationServc.totalPages,
    }
  }

  onChangeDate($event: any) {
    this.filterModel.submission_date = $event.target.value;
  }

  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    setTimeout(() => {
      $("#submission_date").unbind().removeData();
      $("#submission_date").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#submission_date").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#submission_date");
        e?.dispatchEvent(v);
      });
    }, 100);
  }
} 
