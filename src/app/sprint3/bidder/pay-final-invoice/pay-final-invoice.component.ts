import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EnvService } from 'src/app/env.service';
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
  selectedPageNumber: number;
  pagelimit: number = 10;
  closeResult: string;
  modalOptions: NgbModalOptions;

  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  userRole: any;
  invoiceForSend: InvoiceForSend = new InvoiceForSend();
  card: boolean;
  auctionId: any;
  invoiceData: any = [];
  showLoader: boolean = true;
  textFloat: string = '';
  textDir: any = '';
  showSuccessPopup: boolean = false;
  downloadingInvoice: boolean = false;
  invoiceSent: boolean = false;
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
  paymentDeadline: any;

  constructor(
    public PaginationServc: PaginationSortingService,
    private bidderService: BidderService,
    private http: HttpClient,
    private api: AucModeratorService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    public envService: EnvService,
    private moderatorService: AucModeratorService,
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }


  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.card = true;
    this.getInvoice();
    this.userRole = JSON.parse(localStorage.getItem("userInfo") as string);
    if (this.userRole) {
      this.userRole = this.userRole.roles;
    }
    console.log(this.userRole);
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textFloat = 'left';
      this.textDir = 'rtl';
    }
    else {
      this.textFloat = 'right';
      this.textDir = 'ltr';
    }
  }


  getInvoice() {
    this.moderatorService.getSendInvoice(this.auctionId).subscribe((res: any) => {
      this.showLoader = false;
      this.moderatorService.XCSRFToken = res.headers.get('x-csrf-token');
      localStorage.setItem('x-csrf-token', this.moderatorService.XCSRFToken);
      this.invoiceData = res.body.d.results[0];
      if (this.invoiceData?.Status !== 'Pending Paying') {
        this.router.navigateByUrl('/bidder');
        return
      }
      console.log('this.invoiceData: ', this.invoiceData);
      this.auctionStartDate = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[0], 'DD.MM.YYYY').format('YYYY-MM-DD');
      this.auctionStartTime = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[1], 'HH:mm:ss').format('hh:mm');
      this.auctionStartSuffix = moment(this.invoiceData?.ZzAucSrtDt.split(' ')[1], 'HH:mm:ss').format('A');
      this.offerDate = moment(this.invoiceData?.OfferDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
      this.offerTime = moment(this.invoiceData?.OfferTime, 'HH:mm:ss').format('hh:mm');
      this.offerSuffix = moment(this.invoiceData?.OfferTime, 'HH:mm:ss').format('A');
      this.deliveryDate = moment(this.invoiceData?.DelivDate, 'YYYYMMDD').format('YYYY-MM-DD');
      this.paymentDeadline = moment(this.invoiceData?.PaymentDeadLine, 'DD.MM.YYYY').format('YYYY-MM-DD');
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
      this.navigateToPage(1);

    });
  }

  copyToClipboard(str: string) {
    navigator.clipboard.writeText(str);
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

  getAuctionList(pageNumber?: number) {
    this.http.get<any>(environment.apiBidderFinalInvoiceURL, { responseType: 'json' }).subscribe(res => {
      this.mapping(res);
    })
  }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.invoiceForSend = {
      auctionReferenceNo: serverObj.d.results[0].ObjectId,
      auctionDate: serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? serverObj.d.results[0].ZzAucSrtDt.split(" ")[0] : '' : '',
      auctionTime: serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? moment(serverObj.d.results[0].ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm') : '' : '',
      auctionTimeSufix: serverObj.d.results[0].ZzAucSrtDt ? serverObj.d.results[0].ZzAucSrtDt !== 0 ? moment(serverObj.d.results[0].ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('A') : '' : '',
      productsType: serverObj.d.results[0].ZzAucProduct,
      offerAwardDate: serverObj.d.results[0].OfferDate ? serverObj.d.results[0].OfferDate !== 0 ? serverObj.d.results[0].OfferDate.split(" ")[0] : '' : '',
      offerAwardTime: serverObj.d.results[0].OfferTime ? serverObj.d.results[0].OfferTime !== 0 ? moment(serverObj.d.results[0].OfferTime, 'HH:mm:ss').format('hh:mm') : '' : '',
      offerAwardTimeSufix: serverObj.d.results[0].OfferTime ? serverObj.d.results[0].OfferTime !== 0 ? moment(serverObj.d.results[0].OfferTime, 'HH:mm:ss').format('A') : '' : '',
      facilityName: serverObj.d.results[0].BidderName,
      entityName: serverObj.d.results[0].ZzAgencyName,
      commercialRegNo: serverObj.d.results[0].CrNumber,
      entityNo: serverObj.d.results[0].ZzAgencyId,
      deliveryDate: serverObj.d.results[0].DelivDate,
      region: serverObj.d.results[0].ZzRegion,
      city: serverObj.d.results[0].ZzCity,
      district: serverObj.d.results[0].ZzNeighbourhood,
      street: serverObj.d.results[0].ZzStreet,
      otherNotes: serverObj.d.results[0].ZzPdOthrNts,
      // TODO : When value is available calculate the below values with Bid amount 
      productGrandTotal: {
        gearPrice: serverObj.d.results[0].gearPrice,
        questRate: serverObj.d.results[0].questRate,
        valueAddTax: serverObj.d.results[0].valueAddTax,
        totalInvPrice: serverObj.d.results[0].totalInvPrice,
      },
      productDetails: []
    };
    if (serverObj.d.results[0].invoicetoprodnav) {
      serverObj.d.results[0].invoicetoprodnav.results.forEach((result: any) => {
        const items = {
          referenceno: result['ObjectId'] ? result['ObjectId'] : '',
          productname: result['Description'] ? result['Description'] : '',
          SKUNumber: result['ZzProductSku'] ? result['ZzProductSku'] : '',
        }
        this.invoiceForSend.productDetails?.push(items);
      });
    }
    console.log(this.invoiceForSend, "this.invoiceForSend");
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
      return `with: ${reason}`;
    }
  }

  downloadInvoice() {
    this.downloadingInvoice = true;
    this.bidderService.downloadInvoice(this.auctionId).subscribe((result) => {
      const data = result.body.d.results[0];
      console.log('data: ', data);
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
