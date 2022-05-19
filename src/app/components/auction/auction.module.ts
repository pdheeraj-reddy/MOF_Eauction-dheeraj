import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { AuctionComponent } from './auction-indetail/auction.component';
import { TenderComponent } from '../../tender/tender.component';
import { AuctionListsComponent } from './auction-lists/auction-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuctionProductComponent } from './auction-indetail/auction-product/auction-product.component';
import { AuctionCommitteeMembersComponent } from './auction-indetail/auction-committee-members/auction-committee-members.component';
import { AuctionOrderSummaryComponent } from './auction-indetail/auction-order-summary/auction-order-summary.component';
import { AuctionDetailComponent } from './auction-indetail/auction-detail/auction-detail.component';
import { FormsModule } from '@angular/forms';
// import { AssignAuctionCommitteeComponent } from './assign-pricing-committee/assign-auction-committee.component';
import { PricingCommitteeHeadReqComponent } from './pricing-committee-head-req/pricing-committee-head-req.component';
import { ViewEditPricingComponent } from './view-edit-pricing/view-edit-pricing.component';
import { EditPricingComponent } from './edit-pricing/edit-pricing.component';
import { AssignPricingCommitteeComponent } from './assign-pricing-committee/assign-pricing-committee.component';
import { AmAuctionComponent } from './am-auction/am-auction.component';
import { AmAuctionDetailsComponent } from './am-auction-details/am-auction-details.component';
import { SendOfferComponent } from './send-offer/send-offer.component';
import { DisableParticipationComponent } from './disable-participation/disable-participation.component';
import { AssignAuctionCommitteeComponent } from './assign-auction-committee/assign-auction-committee.component';
import { PrimaryAwardingComponent } from './primary-awarding/primary-awarding.component';
import { PrimaryAwardingBidderComponent } from './primary-awarding-bidder/primary-awarding-bidder.component';
import { FinalAwardingComponent } from './final-awarding/final-awarding.component';
import { PayInvoiceComponent } from './pay-invoice/pay-invoice.component';
import { PayFinalInvoiceComponent } from './pay-final-invoice/pay-final-invoice.component';
// import { DataTablesModule } from 'angular-datatables';
// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PendingAwardingComponent } from './pending-awarding/pending-awarding.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuctionAttachmentsComponent } from './auction-indetail/auction-attachments/auction-attachments.component';
@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    TenderComponent,
    AuctionListsComponent,
    AuctionProductComponent,
    AuctionCommitteeMembersComponent,
    AuctionOrderSummaryComponent,
    AuctionDetailComponent,
    AssignAuctionCommitteeComponent,
    PricingCommitteeHeadReqComponent,
    ViewEditPricingComponent,
    EditPricingComponent,
    AmAuctionComponent,
    AmAuctionDetailsComponent,
    SendOfferComponent,
    DisableParticipationComponent,
    PrimaryAwardingComponent,
    PrimaryAwardingBidderComponent,
    FinalAwardingComponent,
    PayInvoiceComponent,
    PayFinalInvoiceComponent,
    PendingAwardingComponent,
    AuctionAttachmentsComponent,
    // DataTablesModule,
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    OAuthModule.forRoot(),
    CarouselModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
