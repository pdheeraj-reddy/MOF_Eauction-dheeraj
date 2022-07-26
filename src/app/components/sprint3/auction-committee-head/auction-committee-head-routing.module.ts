import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from '../shared/am-auction/am-auction.component';
import { AuctionCommitteeHeadComponent } from './auction-committee-head.component';
import { OpenOffersComponent } from './open-offers/open-offers.component';

const routes: Routes = [
  { path: '', redirectTo: 'am-auction', pathMatch: 'full', },
  { path: '', component: AuctionCommitteeHeadComponent },
  { path: 'am-auction', component: AmAuctionComponent },
  { path: 'open-offers/:auctionId', component: OpenOffersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionCommitteeHeadRoutingModule { }
