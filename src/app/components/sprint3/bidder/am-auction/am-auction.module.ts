import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmAuctionRoutingModule } from './am-auction-routing.module';
import { AmAuctionComponent } from './am-auction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EAucCommonModule } from 'src/app/common/eauccommon.module';


@NgModule({
  declarations: [
    AmAuctionComponent
  ],
  imports: [
    CommonModule,
    AmAuctionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    EAucCommonModule
  ]
})
export class AmAuctionModule { }
