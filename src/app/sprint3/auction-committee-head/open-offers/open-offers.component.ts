import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { BidderService } from '../../services/bidder.service';
import { CommitteeHeadService } from '../../services/committee-head.service';
import moment from 'moment';
import { DatePipe, Location } from '@angular/common';
import { AuctionService } from 'src/app/service/auction.service';
import { TranslateService } from '@ngx-translate/core';
import { EnvService } from 'src/app/env.service';
import { sha1 } from '@angular/compiler/src/i18n/digest';
import { MediaService } from 'src/app/service/media.service';
declare var $: any;
@Component({
  selector: 'app-open-offers',
  templateUrl: './open-offers.component.html',
  styleUrls: ['./open-offers.component.scss']
})
export class OpenOffersComponent implements OnInit {
  openofferListData: any;
  copyOpenofferListData: any;
  pagelimit: number = 4;
  showLoader: boolean = false;
  auctionId: string = '';
  offervalue: string;
  facilityname: string;
  commercialNo: string;
  serialNo: string;
  rejectReason: string;
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];
  selectedData: any;
  filterModel = {
    offer_value: '',
    facility_name: '',
    submission_date: '',
    commercial_ref: '',
  }
  showModal = {
    acceptOffer: false,
    acceptOfferSuccess: false,
    rejectOffer: false,
    rejectOfferSuccess: false,
    esitimationOffer: false,
    estimationOfferSuccess: false,
  }
  spinner: boolean = false;
  columnLst = ['serialNo', 'offerValue', 'primaryWarranty', 'submissionDate', 'facilityName', 'commercialRegistrationNo'];
  pageRangeForAttach: any;
  constructor(
    private route: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
    public committeeHeadService: CommitteeHeadService,
    public location: Location,
    public auctionServc: AuctionService,
    public translate: TranslateService,
    public datepipe: DatePipe,
    public router: Router,
    public envService: EnvService,
    private mediaService: MediaService,
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.auctionId = atob(this.auctionId);
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
      let resultSet: any = [];
      if (results?.length) {
        results.forEach((result: any) => {
          if (result.BidderId) {
            let date = result['DtTime'].replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3");
            const items = {
              serialNo: result['Sno'] ? result['Sno'] : '-',
              offerValue: result['OfferValue'] ? result['OfferValue'] : '-',
              BidderId: result['BidderId'] ? result['BidderId'] : null,
              PdfContent: result['PdfContent'] ? result['PdfContent'] : null,
              submissionDate: date ? this.datepipe.transform(date, 'yyyy-MM-dd') : '',
              submissionTime: result['DtTime'] ? result['DtTime'] !== 0 ? moment(result['DtTime'].split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
              submissionTimeSuffix: result['DtTime'] ? result['DtTime'] !== 0 ? moment(result['DtTime'].split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
              facilityName: result['BidderName'] ? result['BidderName'] : '-',
              FileName: result['FileName'] ? result['FileName'] : '',
              commercialRegistrationNo: result['CrNo'] ? result['CrNo'] : '-',
              ZzBidderSts: result['ZzBidderSts'] ? result['ZzBidderSts'] : '',
              downloadingAttachmet: false,
              selected: false,
            };
            resultSet.push(items);
          }
        });
        for (let i = 0; i < resultSet.length; i++) {
          if (resultSet[i].ZzBidderSts == 'B') {
            resultSet[i].selected = true;
            break;
          }
        }
        // if (resultSet?.length > 0) resultSet[0].selected = true;
      }
      this.showLoader = false;
      this.openofferListData = resultSet;
      this.copyOpenofferListData = resultSet;
      this.navigateToPage(1);
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

  viewAttachment(file: any) {
    if (file.PdfContent) {
      file.downloadingAttachmet = true;
      this.mediaService.downloadAuctionImages(file.PdfContent).then((downloadAuctionImagesResp: any) => {
        const fileResp = downloadAuctionImagesResp.d;
        console.log('fileResp: ', fileResp);
        if (fileResp.FileContent) {
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

  checkOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
    this.serialNo = data.serialNo;
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "C"
    }
    this.spinner = true;
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      this.spinner = false;
      if (res.d.ZzUserAction === 'T') {
        this.showModal.esitimationOffer = true;
      } else {
        this.showModal.acceptOffer = true;
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }

  acceptOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
    this.serialNo = data.serialNo;
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "A"
    }
    this.spinner = true;
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      data.selected = false;
      this.showModal.acceptOffer = false;
      this.showModal.acceptOfferSuccess = true;
      this.spinner = false;
    });
  }

  terminateOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
    this.serialNo = data.serialNo;
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "A"
    }
    this.spinner = true;
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      data.selected = false;
      this.showModal.acceptOffer = false;
      this.showModal.estimationOfferSuccess = true;
      this.spinner = false;
    });
  }

  rejectOffer(data: any) {
    if (this.rejectReason.trim().length <= 0) {
      this.rejectReason = '';
      return;
    }
    console.log("data", data)
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "R"
    }
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      this.rejectReason = '';
      data.selected = false;

      const foundIndex = this.openofferListData.findIndex((i: any) => i.serialNo == data.serialNo)
      if (foundIndex > -1 && foundIndex < this.openofferListData.length) {
        this.openofferListData[foundIndex + 1].selected = true;
        this.copyOpenofferListData = this.openofferListData
      }
      this.showModal.rejectOffer = false;
      this.showModal.rejectOfferSuccess = true;
    });
  }

  // -------------------------------------- filter code --------------------------------


  public toggleFilter() {
    this.resetFilter();
    this.showFilterForm = !this.showFilterForm;
    this.openofferListData = this.copyOpenofferListData;
    this.navigateToPage(1);
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
    this.navigateToPage(1)
  }

  back() {
    this.location.back();
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

  encryptData(data: any) {
    return btoa(data);
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

  backToAuctionDetail() {
    this.showModal.acceptOfferSuccess = false;
    this.showModal.rejectOfferSuccess = false;
    this.showModal.estimationOfferSuccess = false;
    this.router.navigate(['/auction-details/' + btoa(this.auctionId)])
  }

}
