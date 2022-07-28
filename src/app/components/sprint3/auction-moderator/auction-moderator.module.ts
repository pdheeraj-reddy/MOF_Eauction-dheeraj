import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionModeratorRoutingModule } from './auction-moderator-routing.module';
import { AuctionModeratorComponent } from './auction-moderator.component';
import { SharedModule } from '../shared/shared.module';
import { BillPdfProductComponent } from './bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './bill-pdf-template/bill-pdf-template.component';
import { SendInvoiceComponent } from './send-invoice/send-invoice.component';


@NgModule({
  declarations: [
    AuctionModeratorComponent,
    BillPdfProductComponent,
    BillPdfTemplateComponent,
    SendInvoiceComponent
  ],
  imports: [
    CommonModule,
    AuctionModeratorRoutingModule,
    SharedModule
  ]
})
export class AuctionModeratorModule { }
