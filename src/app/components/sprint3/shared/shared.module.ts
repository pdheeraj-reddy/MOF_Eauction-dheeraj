import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
import { EAucCommonModule } from 'src/app/common/eauccommon.module';
import { RouterModule } from '@angular/router';
import { AmAuctionComponent } from './am-auction/am-auction.component';
import { ProductDetailPopupComponent } from './product-detail-popup/product-detail-popup.component';
import { OpenOffersCardComponent } from './open-offers-card/open-offers-card.component';
import { OfferReportComponent } from './offer-report/offer-report.component';
import { ManualAuctionComponent } from './manual-auction/manual-auction.component';
import { AuctionCountdownTimerComponent } from './auction-countdown-timer/auction-countdown-timer.component';
import { AuctionCardComponent } from './auction-card/auction-card.component';


@NgModule({
    declarations: [
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
        AmAuctionComponent,
        ProductDetailPopupComponent,
        OpenOffersCardComponent,
        OfferReportComponent,
        ManualAuctionComponent,
        AuctionCountdownTimerComponent,
        AuctionCardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CarouselModule,
        EAucCommonModule,
        RouterModule
    ],
    exports: [
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
        CarouselModule,
        EAucCommonModule,
        AmAuctionComponent,
        OpenOffersCardComponent,
        OfferReportComponent,
        ManualAuctionComponent,
        AuctionCountdownTimerComponent,
        AuctionCardComponent,
    ]
})
export class SharedModule { }