import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillOffferReportComponent } from './auc_mod/bill-offfer-report/bill-offfer-report.component';
import { BillPdfProductComponent } from './auc_mod/bill-pdf-product/bill-pdf-product.component';
import { BillPdfTemplateComponent } from './auc_mod/bill-pdf-template/bill-pdf-template.component';
import { SendInvoiceComponent } from './auc_mod/send-invoice/send-invoice.component';
import { AmAuctionComponent } from './bidder/am-auction/am-auction.component';
import { MyAuctionsComponent } from './bidder/my-auctions/my-auctions.component';
import { MyInvoicesComponent } from './bidder/my-invoices/my-invoices.component';
import { AuctionDetailsComponent } from './shared/auction-details/auction-details.component';

const routes: Routes = [
  { path: '', component: AmAuctionComponent },
  { path: 'auction-details/:auctionId', component: AuctionDetailsComponent },
  { path: 'offer-report', component: BillOffferReportComponent },
  { path: 'send-invoice', component: SendInvoiceComponent },
  { path: 'pdf-template', component: BillPdfTemplateComponent },
  { path: 'pdf-product', component: BillPdfProductComponent },
  { path: 'myauctions', component: MyAuctionsComponent },
  { path: 'myinvoices', component: MyInvoicesComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmAuctionRoutingModule { }
