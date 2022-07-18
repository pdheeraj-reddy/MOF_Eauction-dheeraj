import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionDetailsRoutingModule } from './auction-details-routing.module';
import { AuctionDetailsComponent } from './auction-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuctionDetailsComponent
  ],
  imports: [
    CommonModule,
    AuctionDetailsRoutingModule,
    SharedModule,
  ]
})
export class AuctionDetailsModule { }
