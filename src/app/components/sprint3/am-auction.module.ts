import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmAuctionRoutingModule } from './am-auction-routing.module';
import { AmAuctionComponent } from './bidder/am-auction/am-auction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EAucCommonModule } from 'src/app/common/eauccommon.module';
import { AuctionDetailsComponent } from './shared/auction-details/auction-details.component';
import { AuctionParticipationComponent } from './shared/auction-participation/auction-participation.component';
import { AuctionFbgaComponent } from './shared/auction-fbga/auction-fbga.component';
import { AuctionPayInvoiceComponent } from './shared/auction-pay-invoice/auction-pay-invoice.component';
import { AuctionPrmyAwardComponent } from './shared/auction-prmy-award/auction-prmy-award.component';
import { AuctionFinalAwardComponent } from './shared/auction-final-award/auction-final-award.component';
import { NoOfParticipantsBidsComponent } from './shared/no-of-participants-bids/no-of-participants-bids.component';
import { AuctionCountdownTimerComponent } from './shared/auction-countdown-timer/auction-countdown-timer.component';
import { AuctionStatusComponent } from './shared/auction-status/auction-status.component';
import { SendBiddingOfferComponent } from './shared/send-bidding-offer/send-bidding-offer.component';
import { LatestOffersSentComponent } from './shared/latest-offers-sent/latest-offers-sent.component';


@NgModule({
  declarations: [
    AmAuctionComponent,
    AuctionDetailsComponent,
    AuctionParticipationComponent,
    AuctionFbgaComponent,
    AuctionPayInvoiceComponent,
    AuctionPrmyAwardComponent,
    AuctionFinalAwardComponent,
    NoOfParticipantsBidsComponent,
    AuctionCountdownTimerComponent,
    AuctionStatusComponent,
    SendBiddingOfferComponent,
    LatestOffersSentComponent
  ],
  imports: [
    CommonModule,
    AmAuctionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    EAucCommonModule
  ]
})
export class AmAuctionModule { }
