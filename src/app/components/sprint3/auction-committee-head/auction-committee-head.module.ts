import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionCommitteeHeadRoutingModule } from './auction-committee-head-routing.module';
import { AuctionCommitteeHeadComponent } from './auction-committee-head.component';


@NgModule({
  declarations: [
    AuctionCommitteeHeadComponent
  ],
  imports: [
    CommonModule,
    AuctionCommitteeHeadRoutingModule
  ]
})
export class AuctionCommitteeHeadModule { }
