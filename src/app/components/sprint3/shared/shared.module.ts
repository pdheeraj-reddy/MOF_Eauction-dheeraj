import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AmAuctionComponent } from '../bidder/am-auction/am-auction.component';
import { AuctionParticipationComponent } from './auction-participation/auction-participation.component';
import { AuctionFbgaComponent } from './auction-fbga/auction-fbga.component';
import { AuctionPayInvoiceComponent } from './auction-pay-invoice/auction-pay-invoice.component';
import { AuctionCountdownTimerComponentHead } from './auction-countdown-timer-head/auction-countdown-timer-head.component';
import { NoOfParticipantsBidsComponent } from './no-of-participants-bids/no-of-participants-bids.component';
import { AuctionStatusComponent } from './auction-status/auction-status.component';
import { SendBiddingOfferComponent } from './send-bidding-offer/send-bidding-offer.component';
import { LatestOffersSentComponent } from './latest-offers-sent/latest-offers-sent.component';
import { AuctionPrmyAwardComponent } from './auction-prmy-award/auction-prmy-award.component';
import { AuctionFinalAwardComponent } from './auction-final-award/auction-final-award.component';


@NgModule({
    declarations: [
        AmAuctionComponent,
        AuctionParticipationComponent,
        AuctionFbgaComponent,
        AuctionPayInvoiceComponent,
        AuctionCountdownTimerComponentHead,
        NoOfParticipantsBidsComponent,
        AuctionStatusComponent,
        SendBiddingOfferComponent,
        LatestOffersSentComponent,
        AuctionPrmyAwardComponent,
        AuctionFinalAwardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CarouselModule
    ],
    exports: [
        AmAuctionComponent,
        AuctionParticipationComponent,
        AuctionFbgaComponent,
        AuctionPayInvoiceComponent,
        AuctionCountdownTimerComponentHead,
        NoOfParticipantsBidsComponent,
        AuctionStatusComponent,
        SendBiddingOfferComponent,
        LatestOffersSentComponent,
        AuctionPrmyAwardComponent,
        AuctionFinalAwardComponent,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CarouselModule
    ]
})
export class SharedModule { }