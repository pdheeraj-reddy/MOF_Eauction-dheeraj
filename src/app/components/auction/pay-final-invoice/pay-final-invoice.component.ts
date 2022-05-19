import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { InvoiceForSend } from "src/app/model/auction.model";
import * as moment from 'moment-mini';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay-final-invoice',
  templateUrl: './pay-final-invoice.component.html',
  styleUrls: ['./pay-final-invoice.component.scss']
})
export class PayFinalInvoiceComponent implements OnInit {

  selectedPageNumber: number;
  pagelimit: number = 10;

  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  card: boolean;
  constructor(public PaginationServc: PaginationSortingService, private http: HttpClient) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.invoiceForSend = {
      auctionReferenceNo: serverObj.d.results[0].auctionReferenceNo,
      auctionDate: serverObj.d.results[0].auctionDate ? serverObj.d.results[0].auctionDate !== 0 ? serverObj.d.results[0].auctionDate.split(" ")[0] : '' : '',
      auctionTime: serverObj.d.results[0].auctionDate ? serverObj.d.results[0].auctionDate !== 0 ? moment(serverObj.d.results[0].auctionDate.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auctionTimeSufix: serverObj.d.results[0].auctionDate ? serverObj.d.results[0].auctionDate !== 0 ? moment(serverObj.d.results[0].auctionDate.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      productsType: serverObj.d.results[0].productsType,
      offerAwardDate: serverObj.d.results[0].offerAwardDate ? serverObj.d.results[0].offerAwardDate !== 0 ? serverObj.d.results[0].offerAwardDate.split(" ")[0] : '' : '',
      offerAwardTime: serverObj.d.results[0].offerAwardDate ? serverObj.d.results[0].offerAwardDate !== 0 ? moment(serverObj.d.results[0].offerAwardDate.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      offerAwardTimeSufix: serverObj.d.results[0].offerAwardDate ? serverObj.d.results[0].offerAwardDate !== 0 ? moment(serverObj.d.results[0].offerAwardDate.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      facilityName: serverObj.d.results[0].facilityName,
      entityName: serverObj.d.results[0].entityName,
      commercialRegNo: serverObj.d.results[0].commercialRegNo,
      entityNo: serverObj.d.results[0].entityNo,
      deliveryDate: serverObj.d.results[0].deliveryDate,
      region: serverObj.d.results[0].region,
      city: serverObj.d.results[0].city,
      district: serverObj.d.results[0].district,
      street: serverObj.d.results[0].street,
      otherNotes: serverObj.d.results[0].otherNotes,
      productGrandTotal: {
        gearPrice: serverObj.d.results[0].gearPrice,
        questRate: serverObj.d.results[0].questRate,
        valueAddTax: serverObj.d.results[0].valueAddTax,
        totalInvPrice: serverObj.d.results[0].totalInvPrice,
      },
      productDetails: []
    };
    if (serverObj.d.results[0].product_detail) {
      serverObj.d.results[0].product_detail.forEach((result: any) => {
        const items = {
          referenceno: result['ObjectId'] ? result['ObjectId'] : '',
          productname: result['productname'] ? result['productname'] : '',
          SKUNumber: result['sku_number'] ? result['sku_number'] : '',
        }
        this.invoiceForSend.productDetails?.push(items);
      });
    }
    console.log(this.invoiceForSend, "this.invoiceForSend");
  }

  ngOnInit(): void {
    this.card = true;
    this.getAuctionList(1);
  }

  getAuctionList(pageNumber?: number) {
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    // let res={
    //   "body" : 
    // }
    this.http.get<any>(environment.apiBidderFinalInvoiceURL, { responseType: 'json' }).subscribe(res => {
      console.log(res, "f");
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
  switchPaymentToCard() {
    this.card = false;
  }
  switchPaymentToSADAD() {
    this.card = true;
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

    this.getAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

}
