import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmAuctionComponent } from '../shared/am-auction/am-auction.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';
import { PayFinalInvoiceComponent } from './pay-final-invoice/pay-final-invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'am-auction', pathMatch: 'full', },
  { path: 'am-auction', component: AmAuctionComponent },
  { path: 'my-auctions', component: MyAuctionsComponent },
  { path: 'my-invoices', component: MyInvoicesComponent },
  { path: 'pay-final-invoice/:auctionId', component: PayFinalInvoiceComponent },
  // {
  //   path: '',

  //   // canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'am-auction',
  //       component: AmAuctionComponent,
  //       // canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'my-auctions',
  //       component: MyAuctionsComponent,
  //       // canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'my-invoices',
  //       component: MyInvoicesComponent,
  //     },
  //     {
  //       path: 'pay-final-invoice/:auctionId',
  //       component: PayFinalInvoiceComponent,
  //     }
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidderRoutingModule { }
