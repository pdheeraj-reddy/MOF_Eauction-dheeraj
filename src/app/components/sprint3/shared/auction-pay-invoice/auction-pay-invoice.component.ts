import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-pay-invoice',
  templateUrl: './auction-pay-invoice.component.html',
  styleUrls: ['./auction-pay-invoice.component.scss']
})
export class AuctionPayInvoiceComponent implements OnInit {
  @Input() upcomingAuction:any;
  auctionId : any;
  constructor() { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
    console.log("🎯TC🎯 ~ file: auction-pay-invoice.component.ts ~ line 14 ~ this.upcomingAuction", this.upcomingAuction.auction_detail.auctionId);
  }
}
