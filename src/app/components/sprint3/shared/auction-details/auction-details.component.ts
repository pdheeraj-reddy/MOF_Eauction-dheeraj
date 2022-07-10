import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { UpcomingAuction } from "src/app/model/auction.model";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment-mini';
import { DatePipe } from '@angular/common'
import { BidderService } from '../../services/bidder.service';
import { AuctionService } from 'src/app/service/auction.service';
declare var $: any;

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {
  auctionId: string
  editmode1: boolean = true;
  editmode2: boolean = false;

  response: any;
  upcomingAuction: UpcomingAuction = new UpcomingAuction();
  days: number;
  hours: number;
  minutes: number;
  second: number;
  selectedPageNumber: number;
  pagelimit: number = 10;
  showLoader: boolean = false;
  showViewAttachmentsModal: boolean = false;
  selectedFileFormat: any;
  selectedFileURL: any;

  // Added by Mohammed Salick
  prmyaward: any;
  finalaward: any;

  userRole: any;
  constructor(private route: ActivatedRoute, public datepipe: DatePipe,
    private mapsAPILoader: MapsAPILoader,
    private http: HttpClient,
    public PaginationServc: PaginationSortingService,
    private envService: EnvService,
    private bidderService: BidderService,
    public auctionService: AuctionService,
  ) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    console.log("this.auctionId", this.auctionId);


    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
    if (this.userRole) {
      this.userRole = this.userRole.roles;
    }
    console.log(this.userRole);

    this.refreshCalendarCntrl();
    this.getAuctionDetails();

    // this.getupcomingAuctionList(1);
  }
  getAuctionDetails() {
    console.log("API");
    this.bidderService.getAuctionDetail(this.auctionId).subscribe((res) => {
      console.log(res);
      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      console.log(res.body.d.results[0].ZzBidderSts);
      this.response = res.body.d.results[0];
      this.mapping(res.body);
    });
  }
  refreshCalendarCntrl() {
    setTimeout(() => {
      console.log("j" + (<any>$(window)));
      (<any>window).gallery();
    }, 1000);
  }
  public mapping(serverObj: any) {
    let auctionDetailList = serverObj.d.results[0];
    console.log("🚀🚀 ~~ auctionDetailList", auctionDetailList);
    let productList = auctionDetailList.listtoproductnav.results[0];
    console.log(serverObj.d.results[0], "sd");
    let resultSet: any = [];
    this.upcomingAuction = {
      referenceId: auctionDetailList.ObjectId,
      auction_start_date: auctionDetailList.ZzAucSrtDt,
      auction_end_date: auctionDetailList.ZzAucEndDt,
      auction_start_time: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auction_start_timeSufix: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      auctionSetting: {
        bitsNo: auctionDetailList.NoBids,
        participants: auctionDetailList.NoParticipant,
      },
      auctionStatus: auctionDetailList.Status,
      auctionImage: [],
      auctionnote1: auctionDetailList.Description,
      auctionnote2: auctionDetailList.ZzAucDesc,
      productCount: auctionDetailList.ZzTotPdt,
      auctionStartsdate: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
      auctionStartstime: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auctionStartstimeSufix: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      biddingStatus: auctionDetailList.ZzCloseInd,
      important_info: {
        auctionstartprice: (auctionDetailList.ZzBidSrtPrice) ? auctionDetailList.ZzBidSrtPrice : '',
        guarantee_per: (auctionDetailList.ZzIbgaPercent) ? auctionDetailList.ZzIbgaPercent : '',
        commissionRate: (auctionDetailList.ZzCommPercent) ? auctionDetailList.ZzCommPercent : '',
        end_biddingdate: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        end_biddingtime: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        end_biddingtimeSufix: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        open_biddingdate: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        open_biddingtime: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        open_biddingtimeSufix: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      },
      auction_detail: {
        auctionId: (auctionDetailList.ObjectId) ? auctionDetailList.ObjectId : '',
        auctionType: (auctionDetailList.BidType) ? ((auctionDetailList.BidType == 'O') ? "Public" : (auctionDetailList.BidType == 'C') ? "Private" : '') : '',
        BiddingMethod: (auctionDetailList.ZzCloseInd) ? auctionDetailList.ZzCloseInd : '',
        auctionName: (auctionDetailList.Description) ? auctionDetailList.Description : '',
        auctionProduct: (auctionDetailList.ZzAucProduct) ? auctionDetailList.ZzAucProduct : '',
        entityNo: (auctionDetailList.ZzAgencyId) ? auctionDetailList.ZzAgencyId : '',
        entityName: (auctionDetailList.ZzAgencyName) ? auctionDetailList.ZzAgencyName : '',
        auctionDesc: (auctionDetailList.ZzAucDesc) ? auctionDetailList.ZzAucDesc : '',
        auctionStartDate: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionStartTime: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        biddingBeginstimeSufix: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        auctionEndDate: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionEndTime: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        end_biddingtimeSufix: auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        startAuction: (auctionDetailList.ZzStartMethod) ? auctionDetailList.ZzStartMethod : '',
        auctionAnncStartDate: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionAnncStartTime: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        bidOpeningtimeSufix: auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        startPrice: (auctionDetailList.ZzBidSrtPrice) ? auctionDetailList.ZzBidSrtPrice : '',
        gnteePercentage: (auctionDetailList.ZzIbgaPercent) ? auctionDetailList.ZzIbgaPercent : '',
        commissionType: (auctionDetailList.ZzCommisionTyp) ? auctionDetailList.ZzCommisionTyp : '',
        pursuitPerCommission: (auctionDetailList.ZzCommPercent) ? auctionDetailList.ZzCommPercent : '',
        finalgnteePaymentDays: (auctionDetailList.ZzFbgaDeadline) ? auctionDetailList.ZzFbgaDeadline : '',
        auctionAttachement: (auctionDetailList.listtoattachnav.results) ? auctionDetailList.listtoattachnav.results : '',
      },
      productDetails: {
        productTitle: (productList.productTitle) ? productList.productDetails.productTitle : '',
        productName: (productList.Description) ? productList.Description : '',
        productCondition: (productList.ZzProductCond) ? productList.ZzProductCond : '',
        productNo: (productList.Quantity) ? productList.Quantity : '',
        productSpecification: (productList.ZzProdDesc) ? productList.ZzProdDesc : '',

        locLatitude: (productList.ZzLocationCord) ? productList.ZzLocationCord.split(",")[0] : '',
        locLongitude: (productList.ZzLocationCord) ? productList.ZzLocationCord.split(",")[1] : '',
        deliveryDate: productList.DelivDate ? productList.DelivDate !== 0 ? moment(productList.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        deliveryTime: (productList.DelivTime) ? productList.DelivTime : '',
        productimg: [],
        auctionAttachement: [],
      }
    }



  }
  productclick() {
    this.refreshCalendarCntrl();
    console.log("hai");
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
  getupcomingAuctionList(pageNumber?: number) {
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };

    const filters = {
      Message: '',
    };

    console.log(filters, "filters");
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    let $filters = (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '');
    this.showLoader = true;
    let ObjectId = "9700000780";
    this.http.get<any>('https://aqarattest.mof.gov.sa:4200/internal/v1/e-auction/auctions/9700000752?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav&$format=json').subscribe(res => {
      this.showLoader = false;

      //   this.PaginationServc.setPagerValues(
      //     +res.body.d.results[0].TotEle,
      //     10,
      //     +pageNoVal
      //   );

      //   const csrfToken = localStorage.getItem("x-csrf-token");    
      //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      console.log(res, "f");
      this.mapping(res);
      // this.auctionListData = this.mapping(res);
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionList RespError : ', error);
    });

    // Service call
    // this.auctionServc.getOfferList(page, filters).subscribe((res: any) => {
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
    //   console.log('getOfferList RespError : ', error);
    // });
  }
  auctionSettings(type: any) {
    if (type == "auctionDetail") {
      this.editmode1 = true;
      this.editmode2 = false;
    } else if (type == "auctionInstruction") {
      this.editmode1 = false;
      this.editmode2 = true;
    }
  }

  /** Populating the table */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getupcomingAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }
  participation() {

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
  // send offer

  Amt: any;
  incAmt() {
    this.Amt++;
  }
  decAmt() {
    if (this.Amt > 0) {
      this.Amt--;
    }
  }


  downloadFile(fileName: string, contentType: string, base64Data: string) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    console.log('linkSource: ', linkSource);
    downloadLink.href = base64Data;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    downloadLink.click();
  }


  activeDownloadFileIndex = -1

  viewAttachment(file: any, index: number, option: string) {
    if (file.FilenetId) {
      file.downloading = true;
      this.activeDownloadFileIndex = index;
      this.auctionService.downloadAuctionImages(file.FilenetId).subscribe(
        (downloadAuctionImagesResp: any) => {
          console.log(downloadAuctionImagesResp);
          const fileResp = downloadAuctionImagesResp.d;
          var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
          console.log('asdasd', byteString.split(',')[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: file.MIMEType });
          let fileURL = window.URL.createObjectURL(blob);
          console.log('fileURL ', fileURL);
          this.showViewAttachmentsModal = false;
          var newWin: any;
          if (option == 'view') {
            newWin = window.open(fileURL, '_blank');
          } else {
            newWin = this.downloadFile(file.name, file.MIMEType, fileURL);
          }
          if ((!newWin || newWin.closed || typeof newWin.closed == 'undefined') && option == 'view') {
            alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
          }
          file.downloading = false;
          this.activeDownloadFileIndex = -1;
          // window.open(fileContent, "_blank");
        },
        (error) => {
          file.downloading = false;
          this.showLoader = false;
          this.activeDownloadFileIndex = -1;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
    } else {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      // var reader = new FileReader();
      // reader.readAsDataURL(file.filesrc['0']);
      var byteString = atob(file.filesrc['0'].split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: file.type });

      console.log('fileURL', blob);
      let fileURL = window.URL.createObjectURL(blob);
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        this.showViewAttachmentsModal = false;
        console.log('fileURL', fileURL);
        window.open(fileURL, '_blank');
      } else {
        if (file.type.indexOf('image') > -1) {
          this.selectedFileFormat = 'image';
        } else if (file.type.indexOf('video') > -1) {
          this.selectedFileFormat = 'video';
        }
        this.selectedFileURL = file.filesrc['0'].split(',')[1];
        this.showViewAttachmentsModal = true;
      }
    }
  }
}



