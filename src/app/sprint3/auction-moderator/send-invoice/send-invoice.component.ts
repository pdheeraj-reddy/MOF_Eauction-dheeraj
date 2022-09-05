import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceForSend } from 'src/app/model/auction.model';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AucModeratorService } from '../../services/auc-moderator.service';
import { BidderService } from '../../services/bidder.service';
import { Location } from '@angular/common';
import * as moment from 'moment-mini';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-send-invoice',
  templateUrl: './send-invoice.component.html',
  styleUrls: ['./send-invoice.component.scss']
})
export class SendInvoiceComponent implements OnInit {

  selectedPageNumber: number;
  pagelimit: number = 10;
  showLoader: boolean = true;
  textFloat: string = '';
  auctionId: string = '';
  showSuccessPopup: boolean = false;
  showBillError: boolean = false;
  downloadingInvoice: boolean = false;
  invoiceData: any = [];
  auctionStartDate: any;
  auctionStartTime: any;
  auctionStartSuffix: any;
  offerDate: any;
  offerTime: any;
  offerSuffix: any;
  deliveryDate: any;
  gearPrice: number = 0;
  questRate: number = 0;
  vat: number = 0;
  totalValue: number = 0;
  pageRangeForProductAttach: any;
  bidderId: any;
  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  constructor(
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
    public moderatorService: AucModeratorService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    public envService: EnvService
  ) {
  }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.auctionId = atob(this.auctionId);
    this.getInvoice();
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textFloat = 'left';
    }
    else {
      this.textFloat = 'right';
    }
  }

  closeError() {
    this.showBillError = false;
    // window.location.reload();
  }

  getInvoice() {
    this.moderatorService.getSendInvoice(this.auctionId).subscribe((res: any) => {
      this.showLoader = false;
      this.moderatorService.XCSRFToken = res.headers.get('x-csrf-token');
      localStorage.setItem('x-csrf-token', this.moderatorService.XCSRFToken);
      this.invoiceData = res.body.d.results[0];
      /* Checking if the invoice status is not pending FBGA approval, then it will redirect to the auctions page. */
      if (this.invoiceData?.Status !== 'Pending FBGA Approval') {
        this.router.navigateByUrl('/auctions');
        return
      }
      this.auctionStartDate = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[0], 'DD.MM.YYYY').format('YYYY-MM-DD');
      this.auctionStartTime = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[1], 'HH:mm:ss').format('hh:mm');
      this.auctionStartSuffix = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[1], 'HH:mm:ss').format('A');
      this.offerDate = moment(this.invoiceData?.OfferDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
      this.offerTime = moment(this.invoiceData?.OfferTime, 'HH:mm:ss').format('hh:mm');
      this.offerSuffix = moment(this.invoiceData?.OfferTime, 'HH:mm:ss').format('A');
      this.deliveryDate = moment(this.invoiceData?.DelivDate, 'YYYYMMDD').format('YYYY-MM-DD');
      this.bidderId = res.body.d.results[0].BidderId;
      this.invoiceData?.invoicetoprodnav.results.forEach((res: any) => {
        res.DelivDate = moment(res.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
      });

      let bidderValue = parseFloat(this.invoiceData?.BidderValue);
      let quest = parseFloat(this.invoiceData?.ZzCommPercent);

      this.gearPrice = bidderValue;
      this.questRate = (bidderValue * quest) / 100;
      this.vat = (bidderValue * 15) / 100;
      this.totalValue = this.gearPrice + this.questRate + this.vat;
      this.navigateToPage(1)

    });
  }


  sendInvoice() {
    this.showBillError = false;
    this.moderatorService.sendInvoice(this.auctionId, this.bidderId).subscribe((res: any) => {
      if (res['d']['Msgty'] === 'S') {
        this.showSuccessPopup = true;
      } else if (res['d']['Msgty'] === 'E') {
        this.showBillError = true;
      }
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
    window.location.reload();
  }

  navigateToPage(pageNoVal: number) {
    this.PaginationServc.setPagerValues(
      this.invoiceData?.invoicetoprodnav.results.length,
      this.pagelimit,
      pageNoVal
    );
    this.pageRangeForProductAttach = {
      rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * this.pagelimit),
      rangeEnd: pageNoVal == 1 ? (this.pagelimit - 1) : ((pageNoVal - 1) * this.pagelimit) + (this.pagelimit - 1),
      pages: this.PaginationServc.pages,
      currentPage: this.PaginationServc.currentPage,
      totalPages: this.PaginationServc.totalPages,
    }
  }


  downloadInvoice() {
    this.downloadingInvoice = true;
    this.bidderService.downloadInvoice(this.auctionId).subscribe((result) => {
      const data = result.body.d.results[0];
      const linkSource = 'data:application/pdf;base64,' + data.PdfContent;
      const downloadLink = document.createElement("a");
      const fileName = data.ObjectId + ".pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      this.downloadingInvoice = false;
      downloadLink.click();
    });
  }

}
