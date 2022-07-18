import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidderRoutingModule } from './bidder-routing.module';
import { BidderComponent } from './bidder.component';
import { SharedModule } from '../shared/shared.module';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { AmAuctionComponent } from './am-auction/am-auction.component';
import { PayFinalInvoiceComponent } from './pay-final-invoice/pay-final-invoice.component';


@NgModule({
  declarations: [
    BidderComponent,
    MyInvoicesComponent,
    MyAuctionsComponent,
    AmAuctionComponent,
    PayFinalInvoiceComponent
  ],
  imports: [
    CommonModule,
    BidderRoutingModule,
    SharedModule
  ]
})
export class BidderModule { }
