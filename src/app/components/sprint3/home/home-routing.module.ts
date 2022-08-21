import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { AuctionComponent } from './auction/auction.component';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction-detail', component: AuctionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
