import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from './bidder/am-auction/am-auction.component';

const routes: Routes = [{ path: '', component: AmAuctionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmAuctionRoutingModule { }
