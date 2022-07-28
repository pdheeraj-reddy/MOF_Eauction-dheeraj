import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceForSend } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AucModeratorService } from '../../services/auc-moderator.service';
import { BidderService } from '../../services/bidder.service';
import { Location } from '@angular/common';

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
  auctionId: string = '';
  showSuccessPopup: boolean = false;
  invoiceSent: boolean = false;
  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  constructor(
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
    public moderatorService: AucModeratorService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
  }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    // this.getInvoice(1);
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
    // Service call
    this.bidderService.getSendInvoice(this.auctionId).subscribe((res: any) => {
      console.log("🚀🚀 ~~ res", res);
      this.showLoader = false;
      this.PaginationServc.setPagerValues(+res.body.d.results[0].TotEle, 10, +pageNoVal);
      localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
      this.moderatorService.XCSRFToken = res.headers.get('x-csrf-token');
      this.mapping(res.body);
    }, (error: any) => {
      this.showLoader = false;
      console.log('getInvoice RespError : ', error);
    });
    // this.mapping(res.body);
  }

  public mapping(serverObj: any) {
    if (serverObj.d.results?.length) {
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
  }

  sendInvoice() {
    this.moderatorService.sendInvoice(this.auctionId, "1000306470").subscribe((res: any) => {
      this.showSuccessPopup = true;
      console.log("🚀🚀 ~~ res", res);
    })
  }

  goBack() {
    this.router.navigateByUrl('/auctions');
  }

  goToAuctionDetails() {
    this._location.back();
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
