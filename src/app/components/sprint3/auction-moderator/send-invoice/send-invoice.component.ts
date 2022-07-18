import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceForSend } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AucModeratorService } from '../../services/auc-moderator.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-send-invoice',
  templateUrl: './send-invoice.component.html',
  styleUrls: ['./send-invoice.component.scss']
})
export class SendInvoiceComponent implements OnInit {

  selectedPageNumber: number;
  pagelimit: number = 10;
  userRole: string;
  showLoader: boolean = true;
  textFloat: string = '';
  showSuccessPopup: boolean = false;
  invoiceSent: boolean = false;
  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  constructor(
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
    public moderatorService: AucModeratorService,
    private router: Router
  ) {
    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
  }

  ngOnInit(): void {
    this.getInvoice(1);
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textFloat = 'left';
    }
    else {
      this.textFloat = 'right';
    }
  }

  getInvoice(pageNumber?: number) {
    this.showLoader = true;
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
              "auctionReferenceNo": "392101",
              "auctionDate": "01-01-2022",
              "auctionTime": "10:50 AM",
              "productsType": "transportation cars",
              "offerAwardDate": "05-02-2022",
              "offerAwardTime": "10:50 AM",
              "facilityName": "Hammat Trading Est",
              "entityName": "Ministry of Health",
              "commercialRegNo": 707365514,
              "entityNo": 937,
              "deliveryDate": "2022-02-05",
              "region": "Riyadh",
              "city": "Riyadh",
              "district": "second industrial",
              "street": "Ahmed Bin Abdullah Al Shehri Street",
              "otherNotes": "Warehouse No. 546",
              "gearPrice": "3,567,938 SAR",
              "questRate": "89,198.45 SAR",
              "valueAddTax": "53,5190.7 SAR",
              "totalInvPrice": "4,103,128.7 SAR",
              "product_detail": [
                {
                  ObjectId: 1,
                  productname: "Isuzu Truck No.1",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 2,
                  productname: "Isuzu Truck No.2",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 3,
                  productname: "Isuzu Truck No.3",
                  sku_number: "UGG-BB-PUR-06"
                },
              ]
            }
          ]
        }
      }
    }
    // Service call
    this.bidderService.getSendInvoice('9700000300').subscribe((res: any) => {
      console.log("🚀🚀 ~~ res", res);

      this.showLoader = false;
      this.PaginationServc.setPagerValues(+res.body.d.results[0].TotEle, 10, +pageNoVal);
      localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      this.mapping(res.body);
    }, (error: any) => {
      this.showLoader = false;
      console.log('getInvoice RespError : ', error);
    });
    this.mapping(res.body);
  }

  public mapping(serverObj: any) {
    this.invoiceForSend = {
      auctionReferenceNo: serverObj.d.results[0].auctionReferenceNo,
      auctionDate: serverObj.d.results[0].auctionDate,
      auctionTime: serverObj.d.results[0].auctionTime,
      productsType: serverObj.d.results[0].productsType,
      offerAwardDate: serverObj.d.results[0].offerAwardDate,
      offerAwardTime: serverObj.d.results[0].offerAwardTime,
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
  }

  sendInvoice() {
    // this.showSuccessPopup = true;
    this.moderatorService.sendInvoice("9700000300", "1000306470").subscribe((res: any) => {
      console.log("🚀🚀 ~~ res", res);
    })
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
  closeSuccess() {
    this.showSuccessPopup = false;
    this.ngOnInit();
    this.invoiceSent = true;
  }


  /** Populating the table */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getInvoice(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }
}
