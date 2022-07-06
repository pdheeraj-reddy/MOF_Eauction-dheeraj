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
declare var $:any;

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss']
})
export class AuctionDetailsComponent implements OnInit {
  auctionId: string
  editmode1 : boolean = true;
  editmode2 : boolean = false;

  isParticipated : boolean = false;
  upcomingAuction: UpcomingAuction = new UpcomingAuction();
  days:number;
  hours:number;
  minutes:number;
  second:number;
  selectedPageNumber : number;
  pagelimit: number = 10;
  showLoader: boolean = false;

  // Added by Mohammed Salick
  prmyaward :any;
  finalaward: any;

  userRole : any;
  constructor(private route: ActivatedRoute, public datepipe: DatePipe,
    private mapsAPILoader: MapsAPILoader,
    private http: HttpClient,
    public PaginationServc: PaginationSortingService,
    private envService: EnvService,
    private bidderService : BidderService
    ) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    console.log("this.auctionId", this.auctionId);


    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
    if(this.userRole){
      this.userRole= this.userRole.roles;
    }
    console.log(this.userRole);

    this.refreshCalendarCntrl();
    this.getAuctionDetails();
    
    // this.getupcomingAuctionList(1);
  }
  getAuctionDetails(){
    console.log("API");
    this.bidderService.getAuctionDetail(this.auctionId).subscribe((res)=>{
      console.log(res);
      this.bidderService.XCSRFToken = res.headers.get('x-csrf-token');
      this.mapping(res.body);
    });
  }
  refreshCalendarCntrl() {
    setTimeout(() => {
      console.log("j"+ (<any>$(window)));
      (<any> window).gallery();
    }, 1000);
  }
  public mapping(serverObj: any) {
    let auctionDetailList = serverObj.d.results[0];
    let productList = auctionDetailList.listtoproductnav.results[0];
    console.log(serverObj.d.results[0],"sd");
    let resultSet: any = [];
    this.upcomingAuction = {
      referenceId   : auctionDetailList.ObjectId,
      auction_start_date      :  auctionDetailList.ZzAucSrtDt,
      auction_end_date      :  auctionDetailList.ZzAucEndDt,
      auction_start_time      : auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auction_start_timeSufix : auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      auctionSetting      : {
        bitsNo :auctionDetailList.NoBids,
        participants :auctionDetailList.NoParticipant,
      },
      auctionStatus : auctionDetailList.Status,
      auctionImage : [],
      auctionnote1 : auctionDetailList.Description,
      auctionnote2 : auctionDetailList.ZzAucDesc,
      productCount : auctionDetailList.ZzTotPdt,
      auctionStartsdate : auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
      auctionStartstime : auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auctionStartstimeSufix : auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      biddingStatus : auctionDetailList.ZzCloseInd,
      important_info :{
        auctionstartprice     :(auctionDetailList.ZzBidSrtPrice)? auctionDetailList.ZzBidSrtPrice : '',
        guarantee_per         :(auctionDetailList.ZzIbgaPercent)? auctionDetailList.ZzIbgaPercent : '',
        commissionRate        :(auctionDetailList.ZzCommPercent)? auctionDetailList.ZzCommPercent : '',
        end_biddingdate       :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        end_biddingtime       :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        end_biddingtimeSufix  :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        open_biddingdate      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        open_biddingtime      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        open_biddingtimeSufix :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      },
      auction_detail :{
        auctionId :(auctionDetailList.ObjectId)? auctionDetailList.ObjectId : '',
        auctionType :(auctionDetailList.BidType)? ( (auctionDetailList.BidType=='O')? "Public"  : (auctionDetailList.BidType=='C')? "Private" :'' ) : '',
        BiddingMethod :(auctionDetailList.ZzCloseInd)? auctionDetailList.ZzCloseInd : '',
        auctionName :(auctionDetailList.Description)? auctionDetailList.Description : '',
        auctionProduct :(auctionDetailList.ZzAucProduct)? auctionDetailList.ZzAucProduct : '',
        entityNo :(auctionDetailList.ZzAgencyId)? auctionDetailList.ZzAgencyId : '',
        entityName :(auctionDetailList.ZzAgencyName)? auctionDetailList.ZzAgencyName : '',
        auctionDesc :(auctionDetailList.ZzAucDesc)? auctionDetailList.ZzAucDesc : '',
        auctionStartDate      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionStartTime      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        biddingBeginstimeSufix :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        auctionEndDate       :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionEndTime       :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        end_biddingtimeSufix  :auctionDetailList.ZzAucEndDt ? auctionDetailList.ZzAucEndDt !== 0 ? moment(auctionDetailList.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        startAuction :(auctionDetailList.ZzStartMethod)? auctionDetailList.ZzStartMethod : '',
        auctionAnncStartDate      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        auctionAnncStartTime      :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
        bidOpeningtimeSufix :auctionDetailList.ZzAucSrtDt ? auctionDetailList.ZzAucSrtDt !== 0 ? moment(auctionDetailList.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
        startPrice :(auctionDetailList.ZzBidSrtPrice)? auctionDetailList.ZzBidSrtPrice : '',
        gnteePercentage :(auctionDetailList.ZzIbgaPercent)? auctionDetailList.ZzIbgaPercent : '',
        commissionType :(auctionDetailList.ZzCommisionTyp)? auctionDetailList.ZzCommisionTyp : '',
        pursuitPerCommission :(auctionDetailList.ZzCommPercent)? auctionDetailList.ZzCommPercent : '',
        finalgnteePaymentDays :(auctionDetailList.ZzFbgaDeadline)? auctionDetailList.ZzFbgaDeadline : '',
        auctionAttachement :[],
      },
      productDetails :{
        productTitle :(productList.productTitle)? productList.productDetails.productTitle : '',
        productName       :(productList.Description)? productList.Description : '',
        productCondition :(productList.ZzProductCond)? productList.ZzProductCond : '',
        productNo :(productList.Quantity)? productList.Quantity : '',
        productSpecification :(productList.ZzProdDesc)? productList.ZzProdDesc : '',
        
        locLatitude :(productList.ZzLocationCord)? productList.ZzLocationCord.split(",")[0] : '',
        locLongitude :(productList.ZzLocationCord)? productList.ZzLocationCord.split(",")[1] : '',
        deliveryDate : productList.DelivDate ? productList.DelivDate !== 0 ? moment(productList.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '',
        deliveryTime :(productList.DelivTime)? productList.DelivTime : '',
        productimg :[],
        auctionAttachement :[],
      }
    }
   let auctionImage = [
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/150",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/160",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/170",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/180",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/190",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/110",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/120",
        filetype : "image/png",
      },
      {
        filename:"picsum",
        imgsrc:"https://picsum.photos/200/130",
        filetype : "image/png",
      },
      ];
    if(auctionImage){
      auctionImage.forEach((result: any) => {
        const items ={
          filename: result['filename'] ? result['filename'] : '',
          imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
        }
        this.upcomingAuction.auctionImage?.push(items);
      });
    }
    if(auctionDetailList.listtoattachnav.results){
      auctionDetailList.listtoattachnav.results.forEach((result: any) => {
        const items ={
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          fileName: result['fileName'] ? result['fileName'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
        }
        this.upcomingAuction.auction_detail?.auctionAttachement?.push(items);
      });
    }
    
   let productimg  = [
      {
        filename:"picsum",
        imgsrc:"https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
        filetype : "image/jpg",
      },
      {
        filename:"picsum",
        imgsrc:"https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
        filetype : "image/jpg",
      },
      {
        filename:"picsum",
        imgsrc:"https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
        filetype : "image/jpg",
      },
      {
        filename:"picsum",
        imgsrc:"https://cdn.cwsplatform.com/abitruckscom/vp2937192_1_large.jpg",
        filetype : "image/jpg",
      },
      ]
    if(productimg){
      productimg.forEach((result: any) => {
        const items ={
          filename: result['filename'] ? result['filename'] : '',
          imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
        }
        this.upcomingAuction.productDetails?.productimg?.push(items);
      });
    }
    
   let auctionAttachement  = [
      {
        ObjectId:1,
        fileName:"Brochure Al-Mazad.pdf",
        filetype:"application/pdf",
        fileurl : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        ObjectId:2,
        fileName:"Auction Terms.pdf",
        filetype:"application/pdf",
        fileurl : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        ObjectId:3,
        fileName:"Payment Data.pdf",
        filetype:"application/pdf",
        fileurl : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        ObjectId:4,
        fileName:"Product details.pdf",
        filetype:"application/pdf",
        fileurl : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      }
      ]
    if(auctionAttachement){
      auctionAttachement.forEach((result: any) => {
        const items ={
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          fileName: result['fileName'] ? result['fileName'] : '',
          filetype: result['filetype'] ? result['filetype'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
        }
        this.upcomingAuction.productDetails?.auctionAttachement?.push(items);
      });
    }
    console.log(this.upcomingAuction,"sd");
  }
  productclick(){
    this.refreshCalendarCntrl();
    console.log("hai");
  }

  timeTransform(time: any){
    var d = new Date(time.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
      let hour:any = d.getHours();
      let min:any = d.getMinutes()
      let part = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      min = min < 10 ? '0'+min : min;
      var strTime = hour + ':' + min + ' ' + part;
      return strTime;
  }
  getupcomingAuctionList(pageNumber?: number){
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber : pageNumber,
      pageLimit : this.pagelimit
    };
    
    const filters = {Message : '',
    };
    
    console.log(filters,"filters");
    const pageLimit = page.pageLimit ? page.pageLimit : '10';
    let $filters = (filters.Message !== '' ? " and Message eq '" + filters.Message + "'" : '');
    this.showLoader = true;
    let ObjectId = "9700000780";
    this.http.get<any>('https://aqarattest.mof.gov.sa:4200/internal/v1/e-auction/auctions/9700000752?$expand=listtoproductnav,listtoattachnav,listtocomiteememnav&$format=json').subscribe(res=>{
        this.showLoader = false;
        
    //   this.PaginationServc.setPagerValues(
    //     +res.body.d.results[0].TotEle,
    //     10,
    //     +pageNoVal
    //   );
    
    //   const csrfToken = localStorage.getItem("x-csrf-token");    
    //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      console.log(res,"f");
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
  auctionSettings(type:any){
    if(type=="auctionDetail"){
      this.editmode1 = true;
      this.editmode2 = false;
    }else if(type=="auctionInstruction"){
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
  participation(){
    
  }
  // download report
  downloadReport(data:any){
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }
  // send offer
  
  Amt: any;
  incAmt(){
    this.Amt++;
  }
  decAmt(){
    if(this.Amt>0){
      this.Amt--;
    } 
  }
}
