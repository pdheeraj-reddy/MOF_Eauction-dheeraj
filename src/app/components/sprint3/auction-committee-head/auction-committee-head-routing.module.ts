import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionCommitteeHeadComponent } from './auction-committee-head.component';
import { OpenOffersComponent } from './open-offers/open-offers.component';

const routes: Routes = [
  { path: '', component: AuctionCommitteeHeadComponent },
  { path: 'open-offers', component: OpenOffersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionCommitteeHeadRoutingModule { }
