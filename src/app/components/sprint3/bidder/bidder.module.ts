import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidderRoutingModule } from './bidder-routing.module';
import { BidderComponent } from './bidder.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BidderComponent
  ],
  imports: [
    CommonModule,
    BidderRoutingModule,
    SharedModule
  ]
})
export class BidderModule { }
