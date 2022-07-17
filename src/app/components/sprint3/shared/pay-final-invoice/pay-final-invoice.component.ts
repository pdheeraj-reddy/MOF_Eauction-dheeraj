import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { InvoiceForSend } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { AucModeratorService } from '../../services/auc-moderator.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-pay-final-invoice',
  templateUrl: './pay-final-invoice.component.html',
  styleUrls: ['./pay-final-invoice.component.scss']
})
export class PayFinalInvoiceComponent implements OnInit {
  selectedPageNumber : number;
  pagelimit: number = 10;
  closeResult: string;
  modalOptions:NgbModalOptions;
  
  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  userRole : any;
  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  card:boolean;
  auctionId : any;

  constructor(
    public PaginationServc: PaginationSortingService,
    private bidderService : BidderService,
    private http: HttpClient, 
    private api: AucModeratorService,
    private modalService: NgbModal, 
    private route: ActivatedRoute
    ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.invoiceForSend = {
      auctionReferenceNo  : serverObj.d.results[0].ObjectId,
      auctionDate         : serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? serverObj.d.results[0].ZzAucSrtDt.split(" ")[0] : '' : '',
      auctionTime         : serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? moment(serverObj.d.results[0].ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auctionTimeSufix    : serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? moment(serverObj.d.results[0].ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      productsType        : serverObj.d.results[0].ZzAucProduct,
      offerAwardDate      : serverObj.d.results[0].OfferDate ? serverObj.d.results[0].OfferDate !== 0 ? serverObj.d.results[0].OfferDate.split(" ")[0] : '' : '',
      offerAwardTime      : serverObj.d.results[0].OfferTime ? serverObj.d.results[0].OfferTime !== 0 ? moment(serverObj.d.results[0].OfferTime, 'HH:mm:ss').format('hh:mm') : '' : '',
      offerAwardTimeSufix : serverObj.d.results[0].OfferTime ? serverObj.d.results[0].OfferTime !== 0 ? moment(serverObj.d.results[0].OfferTime, 'HH:mm:ss').format('A') : '' : '',
      facilityName        : serverObj.d.results[0].BidderName,
      entityName          : serverObj.d.results[0].ZzAgencyName,
      commercialRegNo     : serverObj.d.results[0].CrNumber,
      entityNo            : serverObj.d.results[0].ZzAgencyId,
      deliveryDate        : serverObj.d.results[0].DelivDate,
      region              : serverObj.d.results[0].ZzRegion,
      city                : serverObj.d.results[0].ZzCity,
      district            : serverObj.d.results[0].ZzNeighbourhood,
      street              : serverObj.d.results[0].ZzStreet,
      otherNotes          : serverObj.d.results[0].ZzPdOthrNts,
      // TODO : When value is available calculate the below values with Bid amount 
      productGrandTotal   : {
        gearPrice       : serverObj.d.results[0].gearPrice,
        questRate       : serverObj.d.results[0].questRate,
        valueAddTax     : serverObj.d.results[0].valueAddTax,
        totalInvPrice   : serverObj.d.results[0].totalInvPrice,
      },
      productDetails : []
    };
    if(serverObj.d.results[0].invoicetoprodnav){
      serverObj.d.results[0].invoicetoprodnav.results.forEach((result: any) => {
        const items ={
          referenceno: result['ObjectId'] ? result['ObjectId'] : '',
          productname: result['Description'] ? result['Description'] : '',
          SKUNumber: result['ZzProductSku'] ? result['ZzProductSku'] : '',
        }
        this.invoiceForSend.productDetails?.push(items);
      });
    }
    console.log(this.invoiceForSend,"this.invoiceForSend");
  }
  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.card=true;
    this.getInvoiceDetails();
    // this.getAuctionList(1);
    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
    if(this.userRole){
      this.userRole= this.userRole.roles;
    }
    console.log(this.userRole);
  }
  getInvoiceDetails(){
    this.bidderService.getInvoiceDetails(this.auctionId).subscribe((res:any)=>{
    console.log("🎯TC🎯 ~ file: pay-final-invoice.component.ts ~ line 93 ~ res", res);
    });
  }
  sendInv(){
    // attach the actual auction id
    let data = {
      "AucId": "9700000300",
      "BidderId": "193412",
    }
    this.api.postAppporRej(data,'D').subscribe((res=>{
      console.log(res)
      if(res['d']['Msgty'] === 'S'){
        this.modalService.open(this.modalContentApp).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }))
  }
  
  getAuctionList(pageNumber?: number){
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber : pageNumber,
      pageLimit : this.pagelimit
    };
    // let res={
    //   "body" : 
    // }
    this.http.get<any>(environment.apiBidderFinalInvoiceURL,{responseType: 'json'}).subscribe(res=>{
      console.log(res,"f");
        this.mapping(res);
    })
  
    // Service call
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
  switchPaymentToCard(){
    this.card= false;
  }
  switchPaymentToSADAD(){
    this.card=true;
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }
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
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
