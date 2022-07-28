import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from '../shared/am-auction/am-auction.component';
import { BillPdfProductComponent } from './bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './bill-pdf-template/bill-pdf-template.component';
import { SendInvoiceComponent } from './send-invoice/send-invoice.component';

const routes: Routes = [
  { path: '', component: AmAuctionComponent },
  { path: 'send-invoice/:auctionId', component: SendInvoiceComponent },
  { path: 'pdf-template', component: BillPdfTemplateComponent },
  { path: 'pdf-product', component: BillPdfProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionModeratorRoutingModule { }
