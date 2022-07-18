import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionModeratorRoutingModule } from './auction-moderator-routing.module';
import { AuctionModeratorComponent } from './auction-moderator.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuctionModeratorComponent
  ],
  imports: [
    CommonModule,
    AuctionModeratorRoutingModule,
    SharedModule
  ]
})
export class AuctionModeratorModule { }
