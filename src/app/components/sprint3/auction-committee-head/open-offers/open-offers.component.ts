import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { BidderService } from '../../services/bidder.service';
import { CommitteeHeadService } from '../../services/committee-head.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { AuctionService } from 'src/app/service/auction.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-open-offers',
  templateUrl: './open-offers.component.html',
  styleUrls: ['./open-offers.component.scss']
})
export class OpenOffersComponent implements OnInit {
  openofferListData: any;
  copyOpenofferListData: any;
  pagelimit: number = 5;
  showLoader: boolean = false;
  auctionId: string = '';
  offervalue: string;
  facilityname: string;
  commercialNo: string;
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
    esitimationOfferSuccess: false,
  }
  spinner: boolean = false;
  columnLst = ['serialNo', 'offerValue', 'primaryWarranty', 'submissionDate', 'facilityName', 'commercialRegistrationNo'];
  pageRangeForAttach: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
    public committeeHeadService: CommitteeHeadService,
    public location: Location,
    public auctionServc: AuctionService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.getOffersData(1);
    this.refreshCalendarCntrl()
  }

  getOffersData(pageNumber: number) {
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
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
          const items = {
            serialNo: result['Sno'] ? result['Sno'] : '-',
            offerValue: result['OfferValue'] ? result['OfferValue'] : '-',
            BidderId: result['BidderId'] ? result['BidderId'] : null,
            PdfContent: result['PdfContent'] ? result['PdfContent'] : null,
            submissionDate: result['DtTime'] ? result['DtTime'].split(' ')[0] : '-',
            submissionTime: result['DtTime'] ? result['DtTime'].split(' ')[1] : '-',
            facilityName: result['BidderName'] ? result['BidderName'] : '-',
            FileName: result['FileName'] ? result['FileName'] : '',
            commercialRegistrationNo: result['CrNo'] ? result['CrNo'] : '-',
            downloadingAttachmet: false
            // auctionType: result['BidType'] ? this.getAuctionTypeDesc(result['BidType']) : '',
          };
          resultSet.push(items);
        });
      }
      this.showLoader = false;
      this.openofferListData = resultSet;
      this.copyOpenofferListData = resultSet;
      this.navigateToPage(1);
      console.log('this.openofferListData: ', this.openofferListData);
    }
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
    // console.log(file);
    // console.log(file.type);
    // const fileType = file.name.split(".").pop()?.toLowerCase();
    // var byteString = atob(file.filesrc['0'].split(',')[1]);
    // var ab = new ArrayBuffer(byteString.length);
    // var ia = new Uint8Array(ab);
    // for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    // }
    // const blob = new Blob([ab], { type: file.type });
    // let fileURL = window.URL.createObjectURL(blob);
    // if((file.type.indexOf('image')> -1) || (file.type.indexOf('video')> -1) || fileType === 'docx' || fileType === 'doc'|| fileType === 'pdf'){
    //   console.log();
    //   this.showViewAttachmentsModal = false;
    //   window.open(fileURL, '_blank');
    // }
  }

  checkOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "C"
    }
    this.spinner = true;
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      this.spinner = false;
      if (res.d.ZzUserAction === 'R') {
        this.showModal.esitimationOffer = true;
      } else {
        this.showModal.acceptOffer = true;
      }
    });
  }

  acceptOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "A"
    }
    this.spinner = true;
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      this.showModal.acceptOffer = false;
      this.showModal.acceptOfferSuccess = true;
      this.spinner = false;
    });
  }

  rejectOffer(data: any) {
    const param = {
      AucId: this.auctionId,
      BidderId: data.BidderId,
      ZzUserAction: "R"
    }
    this.committeeHeadService.updateOpenOfferStatus(param).subscribe((res: any) => {
      this.rejectReason = '';
      this.showModal.rejectOffer = false;
      this.showModal.rejectOfferSuccess = true;
    });
  }

  // -------------------------------------- filter code --------------------------------


  public toggleFilter() {
    this.resetFilter();
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
      console.log('this.filterModel: ', this.filterModel);
      this.openofferListData = this.openofferListData.filter((i: any) => {
        if (i.submissionDate?.split('.')[0] === this.filterModel.submission_date?.split('-')[2]) return true;
        return false;
      })
    }
  }

  changeSelect(e: any, dd: string) {
    console.log('changeSelect');
    console.log(e.target.value);
  }

  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.getOffersData(selectedPageNumber);
    window.scrollTo(0, 100);
    this.PaginationServc.resetSorting();
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
