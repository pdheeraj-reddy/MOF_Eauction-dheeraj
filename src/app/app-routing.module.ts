import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './components/auction/auction-indetail/auction.component';
import { TenderComponent } from './tender/tender.component';
import { AuctionListsComponent } from './components/auction/auction-lists/auction-lists.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuctionApproveReq1Component } from './components/auction/auction-controls/auction-approve-req1/auction-approve-req1.component';
import { AuctionPricingRequestComponent } from './components/auction/auction-controls/auction-pricing-request/auction-pricing-request.component';
import { AuctionTotalPricingComponent } from './components/auction/auction-controls/auction-total-pricing/auction-total-pricing.component';
import { AuctionPublishComponent } from './components/auction/auction-controls/auction-publish/auction-publish.component';
import { UpcomingAuctionComponent } from './components/auction/auction-details/upcoming-auction/upcoming-auction.component';
import { OpenOffersComponent } from './components/auction/auction-details/open-offers/open-offers.component';
import { OfferReportComponent } from './components/auction/auction-details/offer-report/offer-report.component';
import { BillPdfProductComponent } from './components/auction/auction-details/bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './components/auction/auction-details/bill-pdf-template/bill-pdf-template.component';
import { SendInvoiceComponent } from './components/auction/auction-details/send-invoice/send-invoice.component';
import { PricingCommitteeHeadReqComponent } from './components/auction/pricing-committee-head-req/pricing-committee-head-req.component';
import { ViewEditPricingComponent } from './components/auction/view-edit-pricing/view-edit-pricing.component';
import { EditPricingComponent } from './components/auction/edit-pricing/edit-pricing.component';
import { AssignAuctionCommitteeComponent } from './components/auction/assign-auction-committee/assign-auction-committee.component';
import { AssignPricingCommitteeComponent } from './components/auction/assign-pricing-committee/assign-pricing-committee.component';
import { AmAuctionComponent } from './components/auction/am-auction/am-auction.component';
import { AmAuctionDetailsComponent } from './components/auction/am-auction-details/am-auction-details.component';
import { SendOfferComponent } from './components/auction/send-offer/send-offer.component';
import { DisableParticipationComponent } from './components/auction/disable-participation/disable-participation.component';
import { PrimaryAwardingComponent } from './components/auction/primary-awarding/primary-awarding.component';
import { PrimaryAwardingBidderComponent } from './components/auction/primary-awarding-bidder/primary-awarding-bidder.component';
import { FinalAwardingComponent } from './components/auction/final-awarding/final-awarding.component';
import { PayInvoiceComponent } from './components/auction/pay-invoice/pay-invoice.component';
// bidder
import { AuctionsComponent} from './components/auctions/auctions.component';
import { PayFinalInvoiceComponent } from './components/auction/pay-final-invoice/pay-final-invoice.component';

import { AuctionModeratorComponent } from './modules/auctionModerator/auction-moderator.component';
import { AmLandingPageComponent } from './modules/auctionModerator/am-landing-page/am-landing-page.component';
import { AmDetailPageComponent } from './modules/auctionModerator/am-detail-page/am-detail-page.component';
import { AucModLandingPageComponent } from './modules/auctionModerator/auc-mod-landing-page/auc-mod-landing-page.component';
import { AuctionMemberComponent } from './modules/auction-member/auction-member.component';
import { AucMemLandingPageComponent } from './modules/auction-member/auc-mem-landing-page/auc-mem-landing-page.component';
import { AucMemDetailPageComponent } from './modules/auction-member/auc-mem-detail-page/auc-mem-detail-page.component';
import { AuctionHeadComponent } from './modules/auction-head/auction-head.component';
import { AuctionHeadLandingPageComponent } from './modules/auction-head/auction-head-landing-page/auction-head-landing-page.component';
import { AuctionHeadDetailPageComponent } from './modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';
import { PendingAwardingComponent } from './components/auction/pending-awarding/pending-awarding.component';
import { AuctionCommiteeComponent } from './modules/auction-commitee/auction-commitee.component';
import { AuctionCommiteeLandingPageComponent } from './modules/auction-commitee/auction-commitee-landing-page/auction-commitee-landing-page.component';
import { AuctionCommiteeDetailPageComponent } from './modules/auction-commitee/auction-commitee-detail-page/auction-commitee-detail-page.component';
import { AuctionCommiteeOpenOffersComponent } from './modules/auction-commitee/auction-commitee-open-offers/auction-commitee-open-offers.component';

import { AuctionSliderComponent } from './common/components/auction-slider/auction-slider.component';
const routes: Routes = [
  { path:'', redirectTo:'/auctionlist', pathMatch:'full' },
  { path:'tender',  component:TenderComponent },
  { path:'dashboard',  component:DashboardComponent },
  // { path:'**', redirectTo:'/dashboard' },
  // { path:'**', redirectTo:'/auctionlist' },
  // { path:'auctionlist', component:AuctionListsComponent },
  { path:'auctionlist', component:AuctionListsComponent , canActivate: [AuthGuard] },
  { path:'auction', component:AuctionComponent , canActivate: [AuthGuard] },
  { path:'auction/:ObjectId/:DraftId/:ViewMode', component:AuctionComponent , canActivate: [AuthGuard] },
  { path: 'tender', component: TenderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'approve-req1', component: AuctionApproveReq1Component }, // Auction Moderater - 2nd screen
  { path: 'pricing-req', component: AuctionPricingRequestComponent }, // Pricing commite head - 1st screen
  { path: 'total-pricing', component: AuctionTotalPricingComponent }, // Auction member/secruety bid update page
  { path: 'auction-publish', component: AuctionPublishComponent }, // Auction Moderator - 6th screen
  { path: 'upcoming-auction', component: UpcomingAuctionComponent },
  { path: 'open-offers', component: OpenOffersComponent },
  { path: 'offer-report', component: OfferReportComponent },
  { path: 'send-invoice', component: SendInvoiceComponent },
  { path: 'pdf-template', component: BillPdfTemplateComponent },
  { path: 'pdf-product', component: BillPdfProductComponent },
  { path: 'slider', component: AuctionSliderComponent },
  {
    path: 'assignpricingcommittee',
    component: AssignPricingCommitteeComponent,
  }, // Auction Moderater 4th screen
  { path: 'headrequest', component: PricingCommitteeHeadReqComponent }, // Pricing commite -> first screen.
  { path: 'vieweditprice', component: ViewEditPricingComponent }, // pricing commite -> 3rd page
  { path: 'editprice', component: EditPricingComponent }, // same as total-pricing
  {
    path: 'assignauctioncommittee',
    component: AssignAuctionCommitteeComponent,
  }, // Auction Moderater - 5th screen
  { path: 'amauction', component: AmAuctionComponent },
  { path: 'amauctiondetails', component: AmAuctionDetailsComponent },
  { path: 'sendofer', component: SendOfferComponent },
  { path: 'disableparticipation', component: DisableParticipationComponent },
  { path: 'primaryawarding', component: PrimaryAwardingComponent },
  { path: 'pendingawarding', component: PendingAwardingComponent },
  { path: 'primaryawardingbidder', component: PrimaryAwardingBidderComponent },
  { path: 'finalawarding', component: FinalAwardingComponent },
  { path: 'paynivoice', component: PayInvoiceComponent },

  { path: 'auctions', component: AuctionsComponent },
  { path: 'payfinalinvoice', component: PayFinalInvoiceComponent },
  // {
  //   path: '',
  //   redirectTo: 'auctionModerator',
  //   pathMatch: 'full',
  // },
  // { path:'**', redirectTo:'/auctionModerator' },
  // { path:'**', redirectTo:'/auctionlist' },
  {
    path: 'auctionModerator',
    component: AuctionModeratorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'landingPage',
        component: AucModLandingPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AmDetailPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'landingPage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auctionMember',
    component: AuctionMemberComponent,
    children: [
      {
        path: 'landingPage',
        component: AucMemLandingPageComponent,
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AucMemDetailPageComponent,
      },
      {
        path: '',
        redirectTo: 'landingPage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auctionHead',
    component: AuctionHeadComponent,
    children: [
      {
        path: 'landingPage',
        component: AuctionHeadLandingPageComponent,
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AuctionHeadDetailPageComponent,
      },
      {
        path: '',
        redirectTo: 'landingPage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auctionCommitee',
    component: AuctionCommiteeComponent,
    children: [
      {
        path: 'landingPage',
        component: AuctionCommiteeLandingPageComponent,
      },
      {
        path: 'detailPage/:ObjectId',
        component: AuctionCommiteeDetailPageComponent,
      },
      {
        path: 'openOffer/:ObjectId',
        component: AuctionCommiteeOpenOffersComponent,
      },
      {
        path: '',
        redirectTo: 'landingPage',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
