import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AuctionCardComponent } from './auction-card/auction-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    AuctionComponent,
    AuctionDetailComponent,
    AuctionCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
