import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-pay-invoice',
  templateUrl: './auction-pay-invoice.component.html',
  styleUrls: ['./auction-pay-invoice.component.scss']
})
export class AuctionPayInvoiceComponent implements OnInit {
  @Input() upcomingAuction:any;
  constructor() { }

  ngOnInit(): void {
  }

}
