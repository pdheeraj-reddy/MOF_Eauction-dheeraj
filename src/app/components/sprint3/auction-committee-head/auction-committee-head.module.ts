import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionCommitteeHeadRoutingModule } from './auction-committee-head-routing.module';
import { AuctionCommitteeHeadComponent } from './auction-committee-head.component';
import { SharedModule } from '../shared/shared.module';
import { OpenOffersComponent } from './open-offers/open-offers.component';


@NgModule({
  declarations: [
    AuctionCommitteeHeadComponent,
    OpenOffersComponent
  ],
  imports: [
    CommonModule,
    AuctionCommitteeHeadRoutingModule,
    SharedModule
  ]
})
export class AuctionCommitteeHeadModule { }
