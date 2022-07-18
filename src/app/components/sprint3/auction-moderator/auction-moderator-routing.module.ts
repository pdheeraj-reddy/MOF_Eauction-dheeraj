import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from '../shared/am-auction/am-auction.component';
import { BillOffferReportComponent } from './bill-offfer-report/bill-offfer-report.component';
import { BillPdfProductComponent } from './bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './bill-pdf-template/bill-pdf-template.component';
import { SendInvoiceComponent } from './send-invoice/send-invoice.component';

const routes: Routes = [
  { path: '', component: AmAuctionComponent },
  { path: 'offer-report', component: BillOffferReportComponent },
  { path: 'send-invoice', component: SendInvoiceComponent },
  { path: 'pdf-template', component: BillPdfTemplateComponent },
  { path: 'pdf-product', component: BillPdfProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionModeratorRoutingModule { }
