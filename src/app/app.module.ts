import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

// Auth module
import { AuthService } from './service/auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuard } from './guard/auth.guard';

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
  HttpClientXsrfModule
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

import { AuctionHeadComponent } from './modules/auction-head/auction-head.component';
import { AuctionHeadLandingPageComponent } from './modules/auction-head/auction-head-landing-page/auction-head-landing-page.component';
import { AuctionHeadDetailPageComponent } from './modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';

import { AuctionCommiteeComponent } from './modules/auction-commitee/auction-commitee.component';
import { AuctionCommiteeLandingPageComponent } from './modules/auction-commitee/auction-commitee-landing-page/auction-commitee-landing-page.component';
import { AuctionCommiteeDetailPageComponent } from './modules/auction-commitee/auction-commitee-detail-page/auction-commitee-detail-page.component';
import { AuctionCommiteeOpenOffersComponent } from './modules/auction-commitee/auction-commitee-open-offers/auction-commitee-open-offers.component';

import { ProductDetailPopupComponent } from './components/auction/auction-indetail/auction-order-summary/product-detail-popup/product-detail-popup.component';
import { EnvService } from './env.service';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ProductDetailPopupComponent,
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
    AuctionHeadComponent,
    AuctionHeadLandingPageComponent,
    AuctionHeadDetailPageComponent,
    AuctionCommiteeComponent,
    AuctionCommiteeLandingPageComponent,
    AuctionCommiteeDetailPageComponent,
    AuctionCommiteeOpenOffersComponent,
    AlertModalComponent

  ],
  imports: [
    RouterModule,
    MatTooltipModule,
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
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [EnvService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function initConfig(envService: EnvService) {
  return () => envService.loadConfig();
}
