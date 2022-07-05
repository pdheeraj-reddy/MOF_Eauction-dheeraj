import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from './bidder/am-auction/am-auction.component';
import { AuctionDetailsComponent } from './shared/auction-details/auction-details.component';

const routes: Routes = [
  { path: '', component: AmAuctionComponent },
  { path: 'auction-details', component: AuctionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmAuctionRoutingModule { }
