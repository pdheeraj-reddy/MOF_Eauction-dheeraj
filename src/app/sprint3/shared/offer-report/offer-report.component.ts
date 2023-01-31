import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OfferReport } from 'src/app/model/auction.model';
import { MediaService } from 'src/app/service/media.service';
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
  @Input() auctionStatus: string;
  @Input() offerReportPdf: string;
  @Input() auctionSubtype: string;

  openofferListData: any;
  copyOpenofferListData: any;
  showLoader: boolean = true;
  auctionReport: any;
  offerListData: any;
  selectedPageNumber: number;
  pagelimit: number = 8;

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
  columnLst = ['serialNo', 'offerValue', 'FileName', 'submissionDateTime', 'facilityName', 'commercialRegistrationNo', 'Status'];
  pageRangeForAttach: any;
  constructor(
    public datepipe: DatePipe,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
    public bidderService: BidderService,
    public committeeHeadService: CommitteeHeadService,
    private mediaService: MediaService,
  ) { }

  ngOnInit(): void {
    this.getOffersData();
    this.refreshCalendarCntrl();

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
      let resultSet: any = [];
      if (results?.length && results[0].BidderId) {
        results.forEach((result: any) => {
          // if (result.serialNo) {
          let date = result['DtTime'].replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3");
          const items = {
            serialNo: result['Sno'] ? result['Sno'] : '-',
            ZzBidderSts: result['ZzBidderSts'] ? result['ZzBidderSts'] : '',
            offerValue: result['OfferValue'] ? result['OfferValue'] : '-',
            BidderId: result['BidderId'] ? result['BidderId'] : null,
            PdfContent: result['PdfContent'] ? result['PdfContent'] : null,
            submissionDateTime: date,
            submissionDate: this.datepipe.transform(date, 'yyyy-MM-dd'),
            submissionTime: this.timeTransform(result['DtTime']),
            submissionTimeSuffix: this.timeSuffixTransform(result['DtTime']),
            facilityName: result['BidderName'] ? result['BidderName'] : '-',
            FileName: result['FileName'] ? result['FileName'] : '',
            commercialRegistrationNo: result['CrNo'] ? result['CrNo'] : '-',
            downloadingAttachmet: false
          };

          resultSet.push(items);
          // }
        });
      }
      this.showLoader = false;
      this.openofferListData = resultSet;
      this.copyOpenofferListData = resultSet;
      this.navigateToPage(1);
      if (this.auctionStatus == 'Terminated') {
        this.openofferListData.forEach((res: any) => {
          res.ZzBidderSts = 'Not Awarded';
        });
      }
      else {
        this.openofferListData.forEach((res: any) => {
          if (res.ZzBidderSts == 'R' || res.ZzBidderSts == 'B') {
            res.ZzBidderSts = 'Not Awarded';
          } else {
            res.ZzBidderSts = 'Awarded';
          }
        });
      }
    }
  }


  timeTransform(time: any) {
    var d = new Date(time.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
    let hour: any = d.getHours();
    let min: any = d.getMinutes()
    let part = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var strTime = hour + ':' + min;
    return strTime;
  }

  timeSuffixTransform(time: any) {
    var d = new Date(time.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
    let hour: any = d.getHours();
    let min: any = d.getMinutes()
    let part = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var strTime = hour + ':' + min + ' ' + part;
    return part;
  }

  // download report
  downloadReport() {
    let fileName = "Auction & Offers Report.pdf";
    let contentType = "application/pdf";
    const linkSource = `data:${contentType};base64,${this.offerReportPdf}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    downloadLink.click();
  }


  viewAttachment(file: any) {
    if (file.PdfContent) {
      console.log("🚀🚀 ~~ file.PdfContent", file.PdfContent);

      file.downloadingAttachmet = true;
      this.mediaService.downloadAuctionImages(file.PdfContent).then((downloadAuctionImagesResp: any) => {
        const fileResp = downloadAuctionImagesResp.d;
        console.log("🚀🚀 ~~ fileResp", fileResp);
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: fileResp.MIMEType });
        let fileURL = window.URL.createObjectURL(blob);
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
    this.showFilterForm = !this.showFilterForm;
    this.openofferListData = this.copyOpenofferListData;
  }

  resetFilter() {
    this.filterModel = {
      offer_value: '',
      facility_name: '',
      submission_date: '',
      commercial_ref: '',
    }
    this.refreshCalendarCntrl()
    // this.openofferListData = this.copyOpenofferListData;
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
