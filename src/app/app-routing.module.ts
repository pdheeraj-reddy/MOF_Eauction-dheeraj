import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './components/auction/auction-indetail/auction.component';
import { TenderComponent } from './tender/tender.component';
import { AuctionListsComponent } from './components/auction/auction-lists/auction-lists.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AuctionModeratorComponent } from './modules/auctionModerator/auction-moderator.component';
import { AmDetailPageComponent } from './modules/auctionModerator/am-detail-page/am-detail-page.component';
import { AucModLandingPageComponent } from './modules/auctionModerator/auc-mod-landing-page/auc-mod-landing-page.component';
import { AuctionMemberComponent } from './modules/auction-member/auction-member.component';
import { AucMemLandingPageComponent } from './modules/auction-member/auc-mem-landing-page/auc-mem-landing-page.component';
import { AucMemDetailPageComponent } from './modules/auction-member/auc-mem-detail-page/auc-mem-detail-page.component';
import { AuctionHeadComponent } from './modules/auction-head/auction-head.component';
import { AuctionHeadLandingPageComponent } from './modules/auction-head/auction-head-landing-page/auction-head-landing-page.component';
import { AuctionHeadDetailPageComponent } from './modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';
import { AuctionCommiteeComponent } from './modules/auction-commitee/auction-commitee.component';
import { AuctionCommiteeLandingPageComponent } from './modules/auction-commitee/auction-commitee-landing-page/auction-commitee-landing-page.component';
import { AuctionCommiteeDetailPageComponent } from './modules/auction-commitee/auction-commitee-detail-page/auction-commitee-detail-page.component';
import { AuctionCommiteeOpenOffersComponent } from './modules/auction-commitee/auction-commitee-open-offers/auction-commitee-open-offers.component';

import { AuctionSliderComponent } from './common/components/auction-slider/auction-slider.component';
import { AppGuard } from './guard/app.guard';
import { ModeratorGuard } from './guard/moderator.guard';
import { MemberGuard } from './guard/member.guard';
import { HeadGuard } from './guard/head.guard';
const routes: Routes = [
  { path: '', redirectTo: '/auctionlist', pathMatch: 'full' },
  { path: 'tender', component: TenderComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path:'**', redirectTo:'/dashboard' },
  // { path:'**', redirectTo:'/auctionlist' },
  // { path:'auctionlist', component:AuctionListsComponent },
  { path: 'auctionlist', component: AuctionListsComponent, canActivate: [AuthGuard, AppGuard] },
  { path: 'auction', component: AuctionComponent, canActivate: [AuthGuard] },
  { path: 'auction/:ObjectId/:DraftId/:ViewMode', component: AuctionComponent, canActivate: [AuthGuard] },
  { path: 'tender', component: TenderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'slider', component: AuctionSliderComponent },
  {
    path: 'auctionModerator',
    component: AuctionModeratorComponent,
    canActivate: [AuthGuard, ModeratorGuard],
    children: [
      {
        path: 'landingPage',
        component: AucModLandingPageComponent,
        canActivate: [AuthGuard, ModeratorGuard],
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AmDetailPageComponent,
        canActivate: [AuthGuard, ModeratorGuard],
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
    canActivate: [AuthGuard, MemberGuard],
    children: [
      {
        path: 'landingPage',
        component: AucMemLandingPageComponent,
        canActivate: [AuthGuard, MemberGuard],
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AucMemDetailPageComponent,
        canActivate: [AuthGuard, MemberGuard],
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
    canActivate: [AuthGuard, HeadGuard],
    children: [
      {
        path: 'landingPage',
        component: AuctionHeadLandingPageComponent,
        canActivate: [AuthGuard, HeadGuard],
      },
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AuctionHeadDetailPageComponent,
        canActivate: [AuthGuard, HeadGuard],
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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'landingPage',
        component: AuctionCommiteeLandingPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detailPage/:ObjectId',
        component: AuctionCommiteeDetailPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'openOffer/:ObjectId',
        component: AuctionCommiteeOpenOffersComponent,
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
    path: 'bidder',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/sprint3/bidder/bidder.module').then(m => m.BidderModule)
  },
  {
    path: 'auctions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/sprint3/auction-moderator/auction-moderator.module').then(m => m.AuctionModeratorModule)
  },
  {
    path: 'auction-committee-head',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/sprint3/auction-committee-head/auction-committee-head.module').then(m => m.AuctionCommitteeHeadModule)
  },
  {
    path: 'auction-details/:auctionId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/sprint3/auction-details/auction-details.module').then(m => m.AuctionDetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
