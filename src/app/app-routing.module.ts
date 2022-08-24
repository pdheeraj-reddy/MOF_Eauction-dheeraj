import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent } from './components/auction/auction-indetail/auction.component';
import { AuctionListsComponent } from './components/auction/auction-lists/auction-lists.component';
import { AuthGuard } from './guard/auth.guard';
import { AuctionModeratorComponent } from './modules/auctionModerator/auction-moderator.component';
import { AmDetailPageComponent } from './modules/auctionModerator/am-detail-page/am-detail-page.component';
import { AuctionMemberComponent } from './modules/auction-member/auction-member.component';
import { AucMemDetailPageComponent } from './modules/auction-member/auc-mem-detail-page/auc-mem-detail-page.component';
import { AuctionHeadComponent } from './modules/auction-head/auction-head.component';
import { AuctionHeadDetailPageComponent } from './modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';
import { AuctionCommiteeComponent } from './modules/auction-commitee/auction-commitee.component';
import { AuctionCommiteeDetailPageComponent } from './modules/auction-commitee/auction-commitee-detail-page/auction-commitee-detail-page.component';
import { AuctionCommiteeOpenOffersComponent } from './modules/auction-commitee/auction-commitee-open-offers/auction-commitee-open-offers.component';

import { AppGuard } from './guard/app.guard';
import { ModeratorGuard } from './guard/moderator.guard';
import { MemberGuard } from './guard/member.guard';
import { HeadGuard } from './guard/head.guard';
import { BidderGuard } from './guard/bidder.guard';
import { AuctionCommiteeGuardGuard } from './guard/auction-commitee-head.guard';
import { MarketerGuard } from './guard/marketer.guard';
const routes: Routes = [
  { path: '', redirectTo: '/auctionlist', pathMatch: 'full' },
  { path: 'auctionlist', component: AuctionListsComponent, canActivate: [AuthGuard, AppGuard] },
  { path: 'auction', component: AuctionComponent, canActivate: [AuthGuard] },
  { path: 'auction/:ObjectId/:DraftId/:ViewMode', component: AuctionComponent, canActivate: [AuthGuard, MarketerGuard] },
  {
    path: 'auctionModerator',
    component: AuctionModeratorComponent,
    canActivate: [AuthGuard, ModeratorGuard],
    children: [
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AmDetailPageComponent,
        canActivate: [AuthGuard, ModeratorGuard],
      }
    ],
  },
  {
    path: 'auctionMember',
    component: AuctionMemberComponent,
    canActivate: [AuthGuard, MemberGuard],
    children: [
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AucMemDetailPageComponent,
        canActivate: [AuthGuard, MemberGuard],
      }
    ],
  },
  {
    path: 'auctionHead',
    component: AuctionHeadComponent,
    canActivate: [AuthGuard, HeadGuard],
    children: [
      {
        path: 'detailPage/:ObjectId/:DraftId/:ViewMode',
        component: AuctionHeadDetailPageComponent,
        canActivate: [AuthGuard, HeadGuard],
      }
    ],
  },
  {
    path: 'auctionCommitee',
    component: AuctionCommiteeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detailPage/:ObjectId',
        component: AuctionCommiteeDetailPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'openOffer/:ObjectId',
        component: AuctionCommiteeOpenOffersComponent,
        canActivate: [AuthGuard],
      }
    ],
  },

  {
    path: 'bidder',
    canActivate: [AuthGuard, BidderGuard],
    loadChildren: () => import('./sprint3/bidder/bidder.module').then(m => m.BidderModule)
  },
  {
    path: 'auctions',
    canActivate: [AuthGuard, ModeratorGuard],
    loadChildren: () => import('./sprint3/auction-moderator/auction-moderator.module').then(m => m.AuctionModeratorModule)
  },
  {
    path: 'auction-committee-head',
    canActivate: [AuthGuard, AuctionCommiteeGuardGuard],
    loadChildren: () => import('./sprint3/auction-committee-head/auction-committee-head.module').then(m => m.AuctionCommitteeHeadModule)
  },
  {
    path: 'auction-details/:auctionId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sprint3/auction-details/auction-details.module').then(m => m.AuctionDetailsModule)
  },
  { path: 'home', loadChildren: () => import('./sprint3/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
