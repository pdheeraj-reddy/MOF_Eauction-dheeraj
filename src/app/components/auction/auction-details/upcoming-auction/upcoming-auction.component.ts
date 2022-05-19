import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpcomingAuction } from "src/app/model/auction.model";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MapsAPILoader } from '@agm/core';
import { DatePipe } from '@angular/common'
declare var $: any;

@Component({
  selector: 'app-upcoming-auction',
  templateUrl: './upcoming-auction.component.html',
  styleUrls: ['./upcoming-auction.component.scss']
})
export class UpcomingAuctionComponent implements OnInit {
  editmode1: boolean = true;
  editmode2: boolean = false;

  upcomingAuction: UpcomingAuction = new UpcomingAuction();
  days: number;
  hours: number;
  minutes: number;
  second: number;
  selectedPageNumber: number;
  pagelimit: number = 10;
  constructor(
    public datepipe: DatePipe,
    private mapsAPILoader: MapsAPILoader,
    public PaginationServc: PaginationSortingService
  ) { }

  ngOnInit(): void {
    this.refreshCalendarCntrl();
    this.getupcomingAuctionList(1);
  }

  // x = setInterval(()=>{
  //   if(this.upcomingAuction.auction_start_date!=''){
  //     let futureDate = new Date(this.upcomingAuction.auction_start_date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getTime;
  //     var today = new Date().getTime();
  //     var distance = futureDate - today;
  //     this.days = Math.floor(distance / (1000 * 60 * 60 * 24) );
  //     this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     this.minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
  //     this.second = Math.floor((distance % (1000 * 60)) / (1000));
  //     if(distance < 0){
  //       clearInterval(this.x)
  //     }
  //   }
  // },1000);

  refreshCalendarCntrl() {
    setTimeout(() => {
      console.log("j" + (<any>$(window)));
      (<any>window).gallery();
    }, 1000);
  }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    var auctiondate = (serverObj.d.results[0].auction_start_date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3"));
    var auctionstartsdate = (serverObj.d.results[0].auction_starts_date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3"));
    var endbiddingdate = (serverObj.d.results[0].important_info.end_biddingdate ? this.datepipe.transform((serverObj.d.results[0].important_info.end_biddingdate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');
    var openBiddingdate = (serverObj.d.results[0].important_info.open_biddingdate ? this.datepipe.transform((serverObj.d.results[0].important_info.open_biddingdate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');
    var auctionStartDate = (serverObj.d.results[0].auction_detail.auctionStartDate ? this.datepipe.transform((serverObj.d.results[0].auction_detail.auctionStartDate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');
    var auctionEndDate = (serverObj.d.results[0].auction_detail.auctionEndDate ? this.datepipe.transform((serverObj.d.results[0].auction_detail.auctionEndDate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');
    var auctionAnncStartDate = (serverObj.d.results[0].auction_detail.auctionAnncStartDate ? this.datepipe.transform((serverObj.d.results[0].auction_detail.auctionAnncStartDate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');
    var deliveryDate = (serverObj.d.results[0].productDetails.deliveryDate ? this.datepipe.transform((serverObj.d.results[0].productDetails.deliveryDate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3")), 'dd-MM-yyyy') : '');

    this.upcomingAuction = {
      auction_start_date: this.datepipe.transform(auctiondate, 'yyyy-MM-dd'),
      auction_start_time: this.timeTransform(serverObj.d.results[0].auction_start_date),
      auctionSetting: {
        bitsNo: serverObj.d.results[0].bitsNo,
        participants: serverObj.d.results[0].participants,
      },
      auctionStatus: serverObj.d.results[0].auctionStatus,
      auctionImage: [],
      auctionnote1: serverObj.d.results[0].auctionnote1,
      auctionnote2: serverObj.d.results[0].auctionnote2,
      productCount: serverObj.d.results[0].productCount,
      auctionStartsdate: this.datepipe.transform(auctionstartsdate, 'dd-MM-yyyy'),
      auctionStartstime: this.timeTransform(serverObj.d.results[0].auction_starts_date),
      important_info: {
        auctionstartprice: (serverObj.d.results[0].important_info.auctionstartprice) ? serverObj.d.results[0].important_info.auctionstartprice : '',
        guarantee_per: (serverObj.d.results[0].important_info.guarantee_per) ? serverObj.d.results[0].important_info.guarantee_per : '',
        bidding_method: (serverObj.d.results[0].important_info.bidding_method) ? serverObj.d.results[0].important_info.bidding_method : '',
        end_biddingdate: (endbiddingdate) ? endbiddingdate : '',
        end_biddingtime: (serverObj.d.results[0].end_biddingdate) ? this.timeTransform(serverObj.d.results[0].end_biddingdate) : '',
        open_biddingdate: (openBiddingdate) ? openBiddingdate : '',
        open_biddingtime: (serverObj.d.results[0].open_biddingdate) ? this.timeTransform(serverObj.d.results[0].open_biddingtime) : '',
      },
      auction_detail: {
        auctionId: (serverObj.d.results[0].auction_detail.auctionId) ? serverObj.d.results[0].auction_detail.auctionId : '',
        auctionType: (serverObj.d.results[0].auction_detail.auctionType) ? serverObj.d.results[0].auction_detail.auctionType : '',
        auctionSubType: (serverObj.d.results[0].auction_detail.auctionSubType) ? serverObj.d.results[0].auction_detail.auctionSubType : '',
        auctionName: (serverObj.d.results[0].auction_detail.auctionName) ? serverObj.d.results[0].auction_detail.auctionName : '',
        auctionProduct: (serverObj.d.results[0].auction_detail.auctionProduct) ? serverObj.d.results[0].auction_detail.auctionProduct : '',
        entityNo: (serverObj.d.results[0].auction_detail.entityNo) ? serverObj.d.results[0].auction_detail.entityNo : '',
        entityName: (serverObj.d.results[0].auction_detail.entityName) ? serverObj.d.results[0].auction_detail.entityName : '',
        auctionDesc: (serverObj.d.results[0].auction_detail.auctionDesc) ? serverObj.d.results[0].auction_detail.auctionDesc : '',
        auctionStartDate: (auctionStartDate) ? auctionStartDate : '',
        auctionStartTime: (serverObj.d.results[0].auction_detail.auctionStartDate) ? this.timeTransform(serverObj.d.results[0].auction_detail.auctionStartDate) : '',
        auctionEndDate: (auctionEndDate) ? auctionEndDate : '',
        auctionEndTime: (serverObj.d.results[0].auction_detail.auctionEndDate) ? this.timeTransform(serverObj.d.results[0].auction_detail.auctionEndDate) : '',
        startAuction: (serverObj.d.results[0].auction_detail.startAuction) ? serverObj.d.results[0].auction_detail.startAuction : '',
        auctionAnncStartDate: (auctionAnncStartDate) ? auctionAnncStartDate : '',
        auctionAnncStartTime: (serverObj.d.results[0].auction_detail.auctionAnncStartTime) ? this.timeTransform(serverObj.d.results[0].auction_detail.auctionAnncStartTime) : '',
        startPrice: (serverObj.d.results[0].auction_detail.startPrice) ? serverObj.d.results[0].auction_detail.startPrice : '',
        gnteePercentage: (serverObj.d.results[0].auction_detail.gnteePercentage) ? serverObj.d.results[0].auction_detail.gnteePercentage : '',
        commissionType: (serverObj.d.results[0].auction_detail.commissionType) ? serverObj.d.results[0].auction_detail.commissionType : '',
        pursuitPerCommission: (serverObj.d.results[0].auction_detail.pursuitPerCommission) ? serverObj.d.results[0].auction_detail.pursuitPerCommission : '',
        finalgnteePaymentDays: (serverObj.d.results[0].auction_detail.finalgnteePaymentDays) ? serverObj.d.results[0].auction_detail.finalgnteePaymentDays : '',
        auctionAttachement: [],
      },
      productDetails: {
        productTitle: (serverObj.d.results[0].productDetails.productTitle) ? serverObj.d.results[0].productDetails.productTitle : '',
        productName: (serverObj.d.results[0].productDetails.productName) ? serverObj.d.results[0].productDetails.productName : '',
        productCondition: (serverObj.d.results[0].productDetails.productCondition) ? serverObj.d.results[0].productDetails.productCondition : '',
        productNo: (serverObj.d.results[0].productDetails.productNo) ? serverObj.d.results[0].productDetails.productNo : '',
        productSpecification: (serverObj.d.results[0].productDetails.productSpecification) ? serverObj.d.results[0].productDetails.productSpecification : '',
        locLatitude: (serverObj.d.results[0].productDetails.locLatitude) ? serverObj.d.results[0].productDetails.locLatitude : '',
        locLongitude: (serverObj.d.results[0].productDetails.locLongitude) ? serverObj.d.results[0].productDetails.locLongitude : '',
        deliveryDate: (deliveryDate) ? deliveryDate : '',
        deliveryTime: (serverObj.d.results[0].productDetails.deliveryDate) ? this.timeTransform(serverObj.d.results[0].productDetails.deliveryDate) : '',
        productimg: [],
        auctionAttachement: [],
      }
    }
    if (serverObj.d.results[0].auctionImage) {
      serverObj.d.results[0].auctionImage.forEach((result: any) => {
        const items = {
          filename: result['filename'] ? result['filename'] : '',
          imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
        }
        this.upcomingAuction.auctionImage?.push(items);
      });
    }
    if (serverObj.d.results[0].auction_detail.auctionAttachement) {
      serverObj.d.results[0].auction_detail.auctionAttachement.forEach((result: any) => {
        const items = {
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          fileName: result['fileName'] ? result['fileName'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
        }
        this.upcomingAuction.auction_detail?.auctionAttachement?.push(items);
      });
    }
    if (serverObj.d.results[0].productDetails.productimg) {
      serverObj.d.results[0].auctionImage.forEach((result: any) => {
        const items = {
          filename: result['filename'] ? result['filename'] : '',
          imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
        }
        this.upcomingAuction.productDetails?.productimg?.push(items);
      });
    }
    if (serverObj.d.results[0].productDetails.auctionAttachement) {
      serverObj.d.results[0].auction_detail.auctionAttachement.forEach((result: any) => {
        const items = {
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          fileName: result['fileName'] ? result['fileName'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
        }
        this.upcomingAuction.productDetails?.auctionAttachement?.push(items);
      });
    }
    console.log(this.upcomingAuction);
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
    let res = {
      "body": {
        d: {
          results: [
            {
              "bitsNo": "18",
              "participants": "30",
              auction_start_date: "25.04.2022 02:34:12",
              auctionStatus: "Upcoming Auction",
              auctionReport: "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc",
              "auctionImage": [
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/150",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/160",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/170",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/180",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/190",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/110",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/120",
                  filetype: "image/png",
                },
                {
                  filename: "picsum",
                  imgsrc: "https://picsum.photos/200/130",
                  filetype: "image/png",
                },
              ],
              auctionnote1: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
              auctionnote2: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
              productCount: "120",
              auction_starts_date: "26.04.2022 02:34:12",
              "offer_report": [
                {
                  ObjectId: 1,
                  offervalue: "4,400,000 SAR",
                  filename: "The file name is long... ",
                  fileurl: "https://www.google.com/",
                  submission_date: "25.04.2022 13:31:00",
                  facility_name: "Hammat Trading Est",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 2,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 12:31:00",
                  facility_name: "Andalusia companies",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 3,
                  offervalue: "3,900,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Al-Sulaiman Company",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 4,
                  offervalue: "3,500,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Alshaya & Brothers Foundation",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 5,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Hammat Trading Est",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 6,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Andalusia companies",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 7,
                  offervalue: "3,900,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Al-Sulaiman Company",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 8,
                  offervalue: "3,500,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Alshaya & Brothers Foundation",
                  commercialRegNo: "7003884440975",
                },
              ],
              important_info: {
                auctionstartprice: "10,000 SAR",
                guarantee_per: "1",
                bidding_method: "Closed",
                end_biddingdate: "30.02.2022 10:50:12",
                open_biddingdate: "01.03.2022 10:50:12",
              },
              auction_detail: {
                auctionId: "392101",
                auctionType: "auction",
                auctionSubType: "Closed",
                auctionName: "transportation cars",
                auctionProduct: "cars",
                entityNo: "203",
                entityName: "Ministry of health",
                auctionDesc: " The Ministry of Health announces the sale by electronic public auction of large transport vehicles of several types, trucks, cars and equipment of a type of MAN used and redundant by the Ministry of Health. A large collection of cars \
                    Toyota Landcruiser Jeep Pickup Gasoline - Diesel Toyota Hilux Two Gasoline - Diesel Isuzu Pickup Diesel.",
                auctionStartDate: "12.11.2022 10:50:12",
                auctionEndDate: "12.11.2022 10:50:12",
                startAuction: "to me",
                auctionAnncStartDate: "12.11.2022 10:50:12",
                startPrice: "50,000",
                gnteePercentage: "3",
                commissionType: "directly",
                pursuitPerCommission: "2",
                finalgnteePaymentDays: "10 days",
                auctionAttachement: [
                  {
                    ObjectId: 1,
                    fileName: "Brochure Al-Mazad.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 2,
                    fileName: "Auction Terms.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 3,
                    fileName: "Payment Data.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 4,
                    fileName: "Product details.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  }
                ],
              },
              productDetails: {
                productTitle: "Isuzu Truck No. 23",
                productName: "Isuzu truck",
                productCondition: "New",
                deliveryDate: "12.11.2022 10:50:12",
                productNo: "25",
                productSpecification: "Model: 2013, date of registration: 6/4/1443, plate number: NB 8434, working on diesel. <br> Model: 2013, date of registration: 6/4/1443, plate number: NB 8434, working on diesel. <br> Model: 2013, date of registration: 6/4/1443,\
                    plate number: NB 8434, working on diesel.",
                locLatitude: "24.774265",
                locLongitude: "46.738586",
                productimg: [
                  {
                    filename: "picsum",
                    imgsrc: "https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
                    filetype: "image/jpg",
                  },
                  {
                    filename: "picsum",
                    imgsrc: "https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
                    filetype: "image/jpg",
                  },
                  {
                    filename: "picsum",
                    imgsrc: "https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
                    filetype: "image/jpg",
                  },
                  {
                    filename: "picsum",
                    imgsrc: "https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
                    filetype: "image/jpg",
                  },
                ],
                auctionAttachement: [
                  {
                    ObjectId: 1,
                    fileName: "Brochure Al-Mazad.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 2,
                    fileName: "Auction Terms.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 3,
                    fileName: "Payment Data.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  },
                  {
                    ObjectId: 4,
                    fileName: "Product details.pdf",
                    filetype: "application/pdf",
                    fileurl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  }
                ],
              }
            }
          ]
        }
      }
    }
    // let res = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.Paging"},"Message":"","Description":"","UserId":"","Msgty":"","CategoryId":"","PageLimit":"","ProcessType":"","QuotDead":"","PageNo":"","First":"X","Last":"","ObjectId":"","TotPgs":"18","TotEle":"180","Size":"","Number":"1","AgencyName":"","Status":"","BidType":"","CreateDate":"","NoEle":"10","pagetolistnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000427","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000426","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000425","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000424","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000419","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000417","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000413","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000406","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000405","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000404","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"07.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtocomiteememnav"}}}]}}]}};

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
    this.mapping(res.body);
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

}
