import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { OfferReport, UpcomingAuction } from "src/app/model/auction.model";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';
import { MapsAPILoader } from '@agm/core';
import moment from 'moment-mini';
import { DatePipe } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BidderService } from '../services/bidder.service';
import { AucModeratorService } from '../services/auc-moderator.service';
import { AuctionService } from 'src/app/service/auction.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailPopupComponent } from '../shared/product-detail-popup/product-detail-popup.component';
import { FormGroup } from '@angular/forms';
import { MediaService } from 'src/app/service/media.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {

  @ViewChild('errorMessageFocus') errorFocus: ElementRef;

  auctionId: string
  editmode1: boolean = true;
  editmode2: boolean = false;
  editmode3: boolean = false;
  isPricingCommittee: boolean = false;
  isAuctionCommittee: boolean = false;
  offerReport: OfferReport = new OfferReport();
  showSuccessOffer: boolean = false;
  invalidOfferAlert: boolean = false;
  invalidStartOfferAlert: boolean = false;
  invalidCurrentOfferAlert: boolean = false;

  filterFormGroup: FormGroup;

  auctionStatus: any = '';
  minimumBidAmount = 0;
  minimumQuoteAmount = 0;

  //filter Form controls
  showFilterForm: boolean = false;

  response: any;
  upcomingAuction: UpcomingAuction = new UpcomingAuction();
  primaryAwardingData: any;
  ibgaDoc: any;
  fbgaDoc: any;
  days: number;
  hours: number;
  minutes: number;
  second: number;
  selectedPageNumber: number;
  pagelimit: number = 10;
  showLoader: boolean = true;
  showViewAttachmentsModal: boolean = false;
  selectedFileFormat: any;
  selectedFileURL: any;
  auctionAttachment: any = [];
  transformedAttachment: any = [];
  textDir: boolean;
  currentLang: any;
  auctionBiddingStatus: any;
  auctionBiddingMethod: any;
  startAuctionMethod: any;
  commissionRateValue: any = '';
  auctionType: any;
  bidBegginingSuffix: any;
  endBiddingSuffix: any;
  openBidSuffix: any;
  impEndBidSuffix: any;
  auctionStartSuffix: any;
  nextFinancial: any;
  // User role
  role = {
    bidder: false,
    auctionMod: false,
    auctionCommitteeHead: false,
    isBusinessSupportUser: false
  }
  currentUser: any;
  status = {
    published: false,
    ongoing: false,
    pendingPrimaryAwarding: false,
    pendingSelecting: false,
    pendingFbga: false,
    pendingFbgaApproval: false,
    pendingPaying: false,
    awarded: false,
    terminated: false
  }
  products: any[] = [];
  columnLst = ['index', 'name'];
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

  offerListData: any;


  // Added by Mohammed Salick
  prmyaward: any;
  finalaward: any;

  userRole: any;
  showFileError: boolean = false;
  showNoFile: boolean = false;
  pageRangeForAttach: any;
  participants = 0;
  noBids = 0;

  slidesStore: any = [];
  statusData: any = [];
  fullImage: any;
  filenetImagesLst: any = [];
  showLoaderMainImage: boolean = true;
  showLoaderSubImage: boolean = false;
  showVideo: boolean = true;
  customOptions: OwlOptions = {
    items: 4,
    autoHeight: true,
    autoWidth: true,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    nav: true,
    navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  };
  selectedProduct: any;
  committeeMember: any;
  finalAwardingData: { bidValue: any; bidderName: any; bidderNo: any; pdfData: any; auctionId: any; };
  @ViewChild('imageSlide', { read: ElementRef }) public imageSlide: ElementRef<any>;
  constructor(
    private route: ActivatedRoute, public datepipe: DatePipe,
    private http: HttpClient,
    public PaginationServc: PaginationSortingService,
    private auctionSev: AuctionService,
    private bidderService: BidderService,
    private modService: AucModeratorService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public envService: EnvService,
    public router: Router,
    private mediaService: MediaService,
    private translate: TranslateService,
    private api: BidderService
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  ngOnInit(): void {
    this.currentUser = this.auctionSev.getLoggedUserRole();
    this.role.auctionMod = this.currentUser.isAuctionModerator;
    this.role.auctionCommitteeHead = this.currentUser.isSalesHead;
    this.role.isBusinessSupportUser = this.currentUser.isBusinessSupportUser;
    this.role.bidder = this.currentUser.isBidder;
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = false;
    }
    else {
      this.textDir = true;
    }


    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.auctionId = atob(this.auctionId);
    this.refreshCalendarCntrl();
    this.getAuctionDetails();
  }

  getParticipants() {
    this.api.getNoOfParticipants(this.auctionId, this.auctionStatus).subscribe((res: any) => {

      console.log(res.body.d);
      if (this.auctionStatus == "Published") {
        this.participants = res.body.d.NoParticipant == '' ? 0 : res.body.d.NoParticipant;
      } else {
        this.noBids = res.body.d.NoBids == '' ? 0 : res.body.d.NoBids;
      }
      setTimeout(() => {
        // console.log(5);
        this.getParticipants()
      }, 5000);
    })
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = false;
    }
    else {
      this.textDir = true;
    }

  }

  getAuctionDetails() {
    this.bidderService.getAuctionDetail(this.auctionId).subscribe((res) => {
      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      this.modService.XCSRFToken = res.headers.get('x-csrf-token');
      this.response = res.body.d.results[0];
      if (this.response) {
        this.showLoader = false;
      }
      this.mapping(res.body);
      let productsArray = res.body.d.results[0].listtoproductnav.results;
      // this.products = res.body.d.results[0].listtoproductnav.results;
      productsArray.forEach((pItem: any) => {
        let productImages: any = [], productFiles: any = [];
        let data = res.body.d.results[0];
        if (pItem.ZzProductNo) {
          if (data.listtoattachnav['results']) {
            var productImagesArray = data.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductImages" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            var productFilesArray = data.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductDocuments" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            if (productImagesArray.length > 0) {
              productImagesArray.forEach((value: any) => {
                var imageupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  "no": pItem.ZzProductNo
                };
                productImages.push(imageupload);

              });
            }
            if (productFilesArray.length > 0) {
              productFilesArray.forEach((value: any) => {
                var fileupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  "no": pItem.ZzProductNo
                };
                productFiles.push(fileupload);
              });
            }
          }
        }
        let item = {
          productNo: pItem.ZzProductNo,
          productName: pItem.Description,
          productCondition: pItem.ZzProductCond,
          productSKUNumber: pItem.ZzProductSku,
          productSerialNumber: pItem.Quantity ? pItem.Quantity.split('.')[0] : '',
          productValue: pItem.ProductValue
            ? pItem.ProductValue.split('.')[0]
            : '',
          productSpec: pItem.ZzProdDesc,
          productImages: productImages,
          productFiles: productFiles,
          location: {
            deliveryDate: pItem.DelivDate
              ? moment(pItem.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
              : '',
            deliveryTime: pItem.DelivTime
              ? pItem.DelivTime !== 0
                ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm')
                : ''
              : '',
            deliveryTimeSufix: pItem.DelivTime
              ? pItem.DelivTime !== 0
                ? moment(pItem.DelivTime, 'HH:mm:ss').format('A')
                : ''
              : '',
            locLatitude: pItem.ZzLocationCord,
            locLongitude: pItem.ZzLocationCord,
            locRegion: pItem.ZzRegion,
            locCity: pItem.ZzCity,
            locNeighborhood: pItem.ZzNeighbourhood,
            locStreet: pItem.ZzStreet,
            notes: pItem.ZzPdOthrNts,
          },
        };
        this.products.push(item);
      });
      this.auctionAttachment = this.upcomingAuction.auction_detail?.auctionAttachement;
      this.ibgaDoc = this.auctionAttachment.filter((attach: { ObjectType: string; InvoiceForm: string; }) => attach.ObjectType == "/AuctionPaymentDocuments" && attach.InvoiceForm == 'I');
      this.fbgaDoc = this.auctionAttachment.filter((attach: { ObjectType: string; InvoiceForm: string; }) => attach.ObjectType == "/AuctionPaymentDocuments" && attach.InvoiceForm == 'F');

      if (this.auctionAttachment) {
        let i = 0;
        this.auctionAttachment.forEach((value: any) => {
          if (value.ObjectType == '/AuctionDocuments') {
            const fileupload = {
              name: value.FileName + '.' + value.FileExt,
              size: '',
              type: '',
              filesrc: '',
              FilenetId: value.FilenetId,
              MIMEType: value.MIMEType,
              downloading: false,
              index: i++
            };
            this.transformedAttachment.push(fileupload);
          }
          this.navigateToPage(1);
          if (value.ObjectType == '/AuctionProductImages') {
            const isExist = this.filenetImagesLst.filter((x: any) => x.ZzProductNo === value.ZzProductNo);
            if (isExist.length == 0) {
              this.filenetImagesLst.push(value)
            }
          }
        });
        this.filenetImagesLst.forEach((element: any) => {
          this.downloadImages(element);
        })
      }

      if (this.filenetImagesLst.length == 0) {
        this.manageEmptyImageProduct();
        this.showLoaderMainImage = false;
        this.showLoaderSubImage = false;
      }
      if (this.upcomingAuction?.biddingStatus) {
        if (this.upcomingAuction?.biddingStatus == 'C') {
          this.auctionBiddingStatus = 'Closed';
        }
        else if (this.upcomingAuction?.biddingStatus == 'D') {
          this.auctionBiddingStatus = 'Live';
        }
      }

      if (this.upcomingAuction.auction_detail?.BiddingMethod) {
        if (this.upcomingAuction.auction_detail?.BiddingMethod == 'C') {
          this.auctionBiddingMethod = 'Closed';
        }
        else if (this.upcomingAuction.auction_detail?.BiddingMethod == 'D') {
          this.auctionBiddingMethod = 'Live';
        }
      }

      if (this.upcomingAuction.auction_detail?.startAuction) {
        if (this.upcomingAuction.auction_detail?.startAuction == 'T') {
          this.startAuctionMethod = 'Automatic';
        }
        else if (this.upcomingAuction.auction_detail?.startAuction == 'M') {
          this.startAuctionMethod = 'Manual';
        }
      }

      this.auctionType = this.upcomingAuction.auction_detail?.auctionType;
      this.bidBegginingSuffix = this.upcomingAuction.auction_detail?.biddingBeginstimeSufix;
      this.endBiddingSuffix = this.upcomingAuction.important_info?.end_biddingtimeSufix;
      this.openBidSuffix = this.upcomingAuction.important_info?.open_biddingtimeSufix;
      this.impEndBidSuffix = this.upcomingAuction.auction_detail?.end_biddingtimeSufix;
      this.auctionStartSuffix = this.upcomingAuction.auctionStartstimeSufix;
      this.nextFinancial = this.upcomingAuction.auction_detail?.commissionType;
      this.commissionRateValue = this.upcomingAuction.important_info?.commissionRate;

    });

  }
  refreshCalendarCntrl() {
    setTimeout(() => {
      (<any>window).gallery();
    }, 1000);
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
    let auctionDetailList = serverObj.d.results[0];
    let productList = auctionDetailList.listtoproductnav.results[0];
    this.statusData = serverObj.d.results[0];
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
      rejectNotes: auctionDetailList.RejectNotes,
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
        open_biddingdate: auctionDetailList.ZzAnncSrtD ? auctionDetailList.ZzAnncSrtD !== 0 ? moment(auctionDetailList.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        open_biddingtime: auctionDetailList.ZzAnncSrtT ? auctionDetailList.ZzAnncSrtT !== 0 ? moment(auctionDetailList.ZzAnncSrtT, 'HH:mm:ss').format('hh:mm') : '' : '',
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
        auctionAnncStartDate: auctionDetailList.ZzAnncSrtD ? auctionDetailList.ZzAnncSrtD !== 0 ? moment(auctionDetailList.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionAnncStartTime: auctionDetailList.ZzAnncSrtT ? auctionDetailList.ZzAnncSrtT !== 0 ? moment(auctionDetailList.ZzAnncSrtT, 'HH:mm:ss').format('hh:mm') : '' : '',
        bidOpeningtimeSufix: auctionDetailList.ZzAnncSrtT ? auctionDetailList.ZzAnncSrtT !== 0 ? moment(auctionDetailList.ZzAnncSrtT, 'HH:mm:ss').format('A') : '' : '',
        startPrice: (auctionDetailList.ZzBidSrtPrice) ? auctionDetailList.ZzBidSrtPrice : '',
        incrementPrice: (auctionDetailList.ZzLowBidVl) ? auctionDetailList.ZzLowBidVl : '',
        gnteePercentage: (auctionDetailList.ZzIbgaPercent) ? auctionDetailList.ZzIbgaPercent : '',
        FinalGnteePercentage: (auctionDetailList.ZzFbgaPercent) ? auctionDetailList.ZzFbgaPercent : '',
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
    this.minimumBidAmount = Number(this.upcomingAuction.auction_detail?.startPrice) + Number(this.upcomingAuction.auction_detail?.incrementPrice);
    this.committeeMember = this.statusData.listtocomiteememnav?.results
    this.primaryAwardingData = {
      bidValue: auctionDetailList.BidOfferValue,
      bidderName: auctionDetailList.BidSupplierName,
      bidderNo: auctionDetailList.BidCrNumber,
      pdfData: auctionDetailList.BidOfferPDF,
      auctionId: auctionDetailList.ObjectId,
    }
    this.finalAwardingData = {
      bidValue: auctionDetailList.BidOfferValue,
      bidderName: auctionDetailList.BidSupplierName,
      bidderNo: auctionDetailList.BidCrNumber,
      pdfData: auctionDetailList.BidOfferPDF,
      auctionId: auctionDetailList.ObjectId,
    }


    this.noBids = Number(this.upcomingAuction.auctionSetting?.bitsNo);
    this.participants = Number(this.upcomingAuction.auctionSetting?.participants);
    this.auctionStatus = this.upcomingAuction.auctionStatus;
    if (this.auctionStatus == "Published" || this.auctionStatus == "Ongoing") {
      this.getParticipants();
    }

    if (this.upcomingAuction.auctionStatus == "Published") {
      this.status.published = true;
    }
    if (this.upcomingAuction.auctionStatus == "Ongoing") {
      this.status.ongoing = true;
    }
    if (this.upcomingAuction.auctionStatus == "Pending Primary Awarding") {
      this.status.pendingPrimaryAwarding = true;
    }
    if (this.upcomingAuction.auctionStatus == "Pending FBGA") {
      this.status.pendingFbga = true;
    }
    if (this.upcomingAuction.auctionStatus == "Pending Selecting") {
      this.status.pendingSelecting = true;
    }
    if (this.upcomingAuction.auctionStatus == "Pending FBGA Approval") {
      this.status.pendingFbgaApproval = true;
    }
    if (this.upcomingAuction.auctionStatus == "Pending Paying") {
      this.status.pendingPaying = true;
    }
    if (this.upcomingAuction.auctionStatus == "Terminated") {
      this.status.terminated = true;
    }
    if (this.upcomingAuction.auctionStatus == "Awarded") {
      this.status.awarded = true;
    }

  }
  productclick() {
    this.refreshCalendarCntrl();
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

    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    let $filters = (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '');
    this.showLoader = true;
    let ObjectId = "9700000780";
    this.http.get<any>('https://aqarattest.mof.gov.sa:4200/internal/v1/e-auction/auctions/9700000752?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav&$format=json').subscribe(res => {
      this.showLoader = false;
      this.mapping(res);
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionList RespError : ', error);
    });
  }
  auctionSettings(type: any) {
    this.resetTab();
    switch (type) {
      case "auctionDetail":
        this.editmode1 = true;
        break;
      case "auctionInstruction":
        this.editmode2 = true;
        break;
      case "offerreport":
        this.editmode3 = true;
        break;
      case "pricingCommittee":
        this.isPricingCommittee = true;
        break;
      case "auctionCommittee":
        this.isAuctionCommittee = true;
        break;
      default:
        break;
    }

  }

  resetTab() {
    this.editmode1 = false;
    this.editmode2 = false;
    this.editmode3 = false;
    this.isPricingCommittee = false;
    this.isAuctionCommittee = false;
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

  resetFilter() {
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
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
    this.bidderService.getOfferList(this.auctionId).subscribe((res: any) => {
      this.showLoader = false;

      localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      this.offerListData = this.mapping(res.body);

    }, (error) => {
      this.showLoader = false;
      console.log('getOfferList RespError : ', error);
    });
    // this.mapping(res.body);
  }

  public toggleFilter() {
    this.showFilterForm = !this.showFilterForm;
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

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.transformedAttachment, this.columnLst[columnId]);
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
  // send offer
  showError(nowShow: boolean) {
    this.showFileError = nowShow;
    if (this.showFileError) {
      window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
      });
    }
    this.errorFocus.nativeElement.focus();
  }

  noFile(showNow: boolean) {
    this.showNoFile = showNow;
    if (this.showNoFile) {
      window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
      });
    }
    this.errorFocus.nativeElement.focus();
  }

  Amt: any;
  incAmt() {
    this.Amt++;
  }
  decAmt() {
    if (this.Amt > 0) {
      this.Amt--;
    }
  }

  downloadReport(file: any) { }

  successfulOffer(bool: boolean) {
    this.showSuccessOffer = true;
    this.invalidOfferAlert = false;
    this.invalidStartOfferAlert = false;
    this.invalidCurrentOfferAlert = false;
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.showSuccessOffer = false;
    }, 15000);
  }

  invalidOffer(bool: boolean) {
    this.invalidOfferAlert = true;
    this.showSuccessOffer = false;
    this.invalidStartOfferAlert = false;
    this.invalidCurrentOfferAlert = false;
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.invalidOfferAlert = false;
    }, 15000);

  }

  invalidStartOffer(bool: boolean) {
    this.invalidStartOfferAlert = true;
    this.showSuccessOffer = false;
    this.invalidOfferAlert = false;
    this.invalidCurrentOfferAlert = false;
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.invalidStartOfferAlert = false;
    }, 15000);

  }

  invalidCurrentOffer(bool: boolean) {
    this.invalidCurrentOfferAlert = true;
    this.showSuccessOffer = false;
    this.invalidOfferAlert = false;
    this.invalidStartOfferAlert = false;
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.invalidCurrentOfferAlert = false;
    }, 15000);

  }

  sendValues(number: any) {
    this.minimumQuoteAmount = number;
  }




  downloadFile(fileName: string, contentType: string, base64Data: string) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
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
      this.mediaService.downloadAuctionImages(file.FilenetId).then((downloadAuctionImagesResp: any) => {
        const fileResp = downloadAuctionImagesResp.d;
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: file.MIMEType });
        let fileURL = window.URL.createObjectURL(blob);
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

      let fileURL = window.URL.createObjectURL(blob);
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        this.showViewAttachmentsModal = false;
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

  convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });


  downloadImages(item: any) {

    this.mediaService.downloadAuctionImages(item.FilenetId).then(async (downloadAuctionImagesResp: any) => {
      const fileResp = downloadAuctionImagesResp.d;
      var byteString = atob(
        atob(fileResp.FileContent).split(',')[1]
      );
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: item.MIMEType });
      var base64String = await this.convertBlobToBase64(blob);
      const product: any = this.products.filter(i => i.productNo == item.ZzProductNo)
      this.slidesStore.push({
        id: item.ZzProductNo,
        src: this.sanitizer.bypassSecurityTrustResourceUrl(base64String as string),
        alt: product[0]!.productName,
        title: product[0]!.productName,
        blankImage: false,
        type: item.MIMEType
      });

      if (this.slidesStore.length == 1) {
        this.fullImage = {
          id: this.slidesStore[0].id,
          src: this.slidesStore[0].src,
          type: this.slidesStore[0].type,
          blankImage: false,
          title: this.slidesStore[0].title,
          index: 1
        }
        this.selectedProduct = this.slidesStore[0].id;
        this.showLoaderSubImage = true;
        this.showLoaderMainImage = false;
      }
      if (this.slidesStore.length == this.filenetImagesLst.length) {
        this.manageEmptyImageProduct();
        this.showLoaderSubImage = false;
      }
    },
      (error) => {
        console.log('downloadAuctionImages RespError : ', error);
      }
    );
  }

  manageEmptyImageProduct() {
    this.products.forEach(product => {
      const isExist = this.slidesStore.filter((x: any) => x.id === product.productNo);
      if (isExist.length == 0) {
        this.slidesStore.push({
          id: product.productNo,
          src: 'assets/icons/no-image.svg',
          alt: 'test',
          blankImage: true,
          title: product.productName,
          type: 'image/png'
        })
      }
    });
    if (this.slidesStore.length > 0) {
      this.fullImage = {
        id: this.slidesStore[0].id,
        src: this.slidesStore[0].src,
        type: this.slidesStore[0].type,
        blankImage: this.slidesStore[0].blankImage,
        title: this.slidesStore[0].title,
        index: 1
      }
      this.selectedProduct = this.slidesStore[0].id;
    }
  }

  viewItem(a: any, index: number) {
    this.selectedProduct = a.id;
    this.showVideo = false;
    this.fullImage = {
      id: a.id,
      src: a.src,
      type: a.type,
      blankImage: a.blankImage,
      title: a.title,
      index: index + 1
    }
    setTimeout(() => {
      this.showVideo = true;
    });
  }
  diableParticipation(bool: boolean) {
    if (bool) {
      this.response.ZzBidderSts = 'B';
    }
  }
  openProductPopup() {
    let productData = this.products.filter((attach) => attach.productNo == this.selectedProduct);
    const dialogRef = this.dialog.open(ProductDetailPopupComponent, {
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        // data: temp,
        viewproduct: productData[0],
      },
    });
  }

  scrollImageSlider(side: string) {
    if (side == 'left') {
      this.imageSlide.nativeElement.scrollTo({ left: (this.imageSlide.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    } else if (side == 'right') {
      this.imageSlide.nativeElement.scrollTo({ left: (this.imageSlide.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  }


  navigateToPage(pageNoVal: number) {
    this.PaginationServc.setPagerValues(
      this.transformedAttachment.length,
      this.pagelimit,
      pageNoVal
    );
    this.pageRangeForAttach = {
      rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * this.pagelimit),
      rangeEnd: pageNoVal == 1 ? (this.pagelimit - 1) : ((pageNoVal - 1) * this.pagelimit) + (this.pagelimit - 1),
      pages: this.PaginationServc.pages,
      currentPage: this.PaginationServc.currentPage,
      totalPages: this.PaginationServc.totalPages,
    }
  }

  goToLandingPage() {
    if (this.role.auctionMod) {
      this.router.navigate(['/auctions'])
    } else if (this.role.auctionCommitteeHead) {
      this.router.navigate(['/auction-committee-head'])
    } else if (this.role.isBusinessSupportUser) {
      this.router.navigate(['/business-support-user'])
    } else if (this.role.bidder) {
      this.router.navigate(['/bidder'])
    }
  }
}


