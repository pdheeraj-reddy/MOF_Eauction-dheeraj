import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from '../shared/am-auction/am-auction.component';
import { BusinessSupportAmAuctionComponent } from '../shared/business-support-am-auction/business-support-am-auction.component';

const routes: Routes = [
  { path: '', redirectTo: 'am-auction', pathMatch: 'full', },
  // { path: '', component: AuctionCommitteeHeadComponent },
  { path: 'am-auction', component: BusinessSupportAmAuctionComponent },
  // { path: 'open-offers/:auctionId/:auctionSubType', component: OpenOffersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessSupportUserRoutingModule { }
