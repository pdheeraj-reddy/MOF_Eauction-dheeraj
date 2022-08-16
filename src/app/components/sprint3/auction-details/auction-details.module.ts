import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionDetailsRoutingModule } from './auction-details-routing.module';
import { AuctionDetailsComponent } from './auction-details.component';
import { SharedModule } from '../shared/shared.module';
import { PricingCommitteeMemberComponent } from './pricing-committee-member/pricing-committee-member.component';
import { AuctionCommitteeMemberComponent } from './auction-committee-member/auction-committee-member.component';


@NgModule({
  declarations: [
    AuctionDetailsComponent,
    PricingCommitteeMemberComponent,
    AuctionCommitteeMemberComponent
  ],
  imports: [
    CommonModule,
    AuctionDetailsRoutingModule,
    SharedModule,
  ]
})
export class AuctionDetailsModule { }
