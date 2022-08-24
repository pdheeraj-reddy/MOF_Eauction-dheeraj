import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { AuctionComponent } from './auction-indetail/auction.component';
import { AuctionListsComponent } from './auction-lists/auction-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuctionProductComponent } from './auction-indetail/auction-product/auction-product.component';
import { AuctionCommitteeMembersComponent } from './auction-indetail/auction-committee-members/auction-committee-members.component';
import { AuctionOrderSummaryComponent } from './auction-indetail/auction-order-summary/auction-order-summary.component';
import { AuctionDetailComponent } from './auction-indetail/auction-detail/auction-detail.component';
import { FormsModule } from '@angular/forms';
// import { AssignAuctionCommitteeComponent } from './assign-pricing-committee/assign-auction-committee.component';
// import { DataTablesModule } from 'angular-datatables';
// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    AuctionListsComponent,
    AuctionProductComponent,
    AuctionCommitteeMembersComponent,
    AuctionOrderSummaryComponent,
    AuctionDetailComponent,
    // DataTablesModule,
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    OAuthModule.forRoot(),
    CarouselModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
