import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

// Auth module
import { AuthService } from './service/auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuard } from './auth.guard';

import { DatePipe } from '@angular/common';
// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { EAucCommonModule } from './common/eauccommon.module';
import { AppComponent } from './app.component';
import { AuctionComponent } from './components/auction/auction-indetail/auction.component';
import { TenderComponent } from './tender/tender.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuctionListsComponent } from './components/auction/auction-lists/auction-lists.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuctionProductComponent } from './components/auction/auction-indetail/auction-product/auction-product.component';
import { AuctionCommitteeMembersComponent } from './components/auction/auction-indetail/auction-committee-members/auction-committee-members.component';
import { AuctionOrderSummaryComponent } from './components/auction/auction-indetail/auction-order-summary/auction-order-summary.component';
import { AuctionDetailComponent } from './components/auction/auction-indetail/auction-detail/auction-detail.component';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OfferReportComponent } from './components/auction/auction-details/offer-report/offer-report.component';
import { OpenOffersComponent } from './components/auction/auction-details/open-offers/open-offers.component';
import { SendInvoiceComponent } from './components/auction/auction-details/send-invoice/send-invoice.component';
import { BillPdfProductComponent } from './components/auction/auction-details/bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './components/auction/auction-details/bill-pdf-template/bill-pdf-template.component';
import { UpcomingAuctionComponent } from './components/auction/auction-details/upcoming-auction/upcoming-auction.component';
import { SendOfferComponent } from './components/auction/send-offer/send-offer.component';
import { AmAuctionComponent } from './components/auction/am-auction/am-auction.component';
import { AmAuctionDetailsComponent } from './components/auction/am-auction-details/am-auction-details.component';
import { DisableParticipationComponent } from './components/auction/disable-participation/disable-participation.component';
import { PrimaryAwardingBidderComponent } from './components/auction/primary-awarding-bidder/primary-awarding-bidder.component';
import { PayInvoiceComponent } from './components/auction/pay-invoice/pay-invoice.component';
import { PayFinalInvoiceComponent } from './components/auction/pay-final-invoice/pay-final-invoice.component';
import { AuctionApproveReq1Component } from './components/auction/auction-controls/auction-approve-req1/auction-approve-req1.component';
import { AssignPricingCommitteeComponent } from './components/auction/assign-pricing-committee/assign-pricing-committee.component';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

// Ngx
import { CountdownModule } from 'ngx-countdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
// Hari new comp
import { AddMemberComponent } from './components/shared/add-member/add-member.component';
import { AmLandingPageComponent } from './modules/auctionModerator/am-landing-page/am-landing-page.component';
import { AuctionModeratorComponent } from './modules/auctionModerator/auction-moderator.component';
import { AmDetailPageComponent } from './modules/auctionModerator/am-detail-page/am-detail-page.component';
import { AucModLandingPageComponent } from './modules/auctionModerator/auc-mod-landing-page/auc-mod-landing-page.component';
import { AuctionReqDetailsComponent } from './shared/components/auction-req-details/auction-req-details.component';
import { ProdctDetailsComponent } from './shared/components/prodct-details/prodct-details.component';
import { RejectAuctionPopupComponent } from './modules/auctionModerator/am-detail-page/reject-auction-popup/reject-auction-popup.component';
import { AuctionPricingCommitteComponent } from './modules/auctionModerator/am-detail-page/auction-pricing-committe/auction-pricing-committe.component';
import { AssignPricingCommitteComponent } from './modules/auctionModerator/am-detail-page/auction-pricing-committe/assign-pricing-committe/assign-pricing-committe.component';
import { AuctionCommitteComponent } from './modules/auctionModerator/am-detail-page/auction-committe/auction-committe.component';
import { AssignAuctionCommitteComponent } from './modules/auctionModerator/am-detail-page/auction-committe/assign-auction-committe/assign-auction-committe.component';
import { AuctionMemberComponent } from './modules/auction-member/auction-member.component';
import { AucMemLandingPageComponent } from './modules/auction-member/auc-mem-landing-page/auc-mem-landing-page.component';
import { AucMemDetailPageComponent } from './modules/auction-member/auc-mem-detail-page/auc-mem-detail-page.component';
import { BidValueUpdateComponent } from './shared/components/bid-value-update/bid-value-update.component';
import { EditBidValueComponent } from './shared/components/prodct-details/edit-bid-value/edit-bid-value.component';
import { ViewProductDetailComponent } from './shared/components/prodct-details/view-product-detail/view-product-detail.component';
import { PricingCommitteeHeadReqComponent } from './components/auction/pricing-committee-head-req/pricing-committee-head-req.component';

import { AuctionHeadComponent } from './modules/auction-head/auction-head.component';
import { AuctionHeadLandingPageComponent } from './modules/auction-head/auction-head-landing-page/auction-head-landing-page.component';
import { AuctionHeadDetailPageComponent } from './modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';
import { AuctionTotalPricingComponent } from './components/auction/auction-controls/auction-total-pricing/auction-total-pricing.component';
import { AuctionsComponent } from './components/auctions/auctions.component';

import { AuctionCommiteeComponent } from './modules/auction-commitee/auction-commitee.component';
import { AuctionCommiteeLandingPageComponent } from './modules/auction-commitee/auction-commitee-landing-page/auction-commitee-landing-page.component';
import { AuctionCommiteeDetailPageComponent } from './modules/auction-commitee/auction-commitee-detail-page/auction-commitee-detail-page.component';
import { AuctionCommiteeOpenOffersComponent } from './modules/auction-commitee/auction-commitee-open-offers/auction-commitee-open-offers.component';

import { ProductDetailPopupComponent } from './components/auction/auction-indetail/auction-order-summary/product-detail-popup/product-detail-popup.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ProductDetailPopupComponent,
    AssignPricingCommitteeComponent,
    AppComponent,
    AuctionComponent,
    TenderComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AuctionListsComponent,
    AuctionProductComponent,
    AuctionCommitteeMembersComponent,
    AuctionOrderSummaryComponent,
    AuctionDetailComponent,
    UpcomingAuctionComponent,
    OfferReportComponent,
    SendOfferComponent,
    DisableParticipationComponent,
    PrimaryAwardingBidderComponent,
    PayInvoiceComponent,
    PayFinalInvoiceComponent,
    AuctionApproveReq1Component,
    AuctionTotalPricingComponent,
    OpenOffersComponent,
    BillPdfTemplateComponent,
    BillPdfProductComponent,
    SendInvoiceComponent,
    AmAuctionComponent,
    AmAuctionDetailsComponent,
    AddMemberComponent,
    AmLandingPageComponent,
    AuctionModeratorComponent,
    AmDetailPageComponent,
    AucModLandingPageComponent,
    AuctionReqDetailsComponent,
    ProdctDetailsComponent,
    RejectAuctionPopupComponent,
    AuctionPricingCommitteComponent,
    AssignPricingCommitteComponent,
    AuctionCommitteComponent,
    AssignAuctionCommitteComponent,
    AuctionMemberComponent,
    AucMemLandingPageComponent,
    AucMemDetailPageComponent,
    BidValueUpdateComponent,
    EditBidValueComponent,
    ViewProductDetailComponent,
    PricingCommitteeHeadReqComponent,
    AuctionHeadComponent,
    AuctionHeadLandingPageComponent,
    AuctionHeadDetailPageComponent,
    AuctionsComponent,
    AuctionCommiteeComponent,
    AuctionCommiteeLandingPageComponent,
    AuctionCommiteeDetailPageComponent,
    AuctionCommiteeOpenOffersComponent,
  ],
  imports: [
    NgxPaginationModule,
    CountdownModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatRadioModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EAucCommonModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5z_IULt6-aT2mTRRp-ZWxtPnxnktXypY',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CarouselModule,
  ],
  providers: [
    DatePipe,
    CookieService,
    AuthService,
    AuctionHeadDetailPageComponent,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
