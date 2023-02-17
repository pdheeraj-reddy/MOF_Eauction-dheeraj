import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessSupportUserRoutingModule } from './business-support-user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BusinessSupportUserComponent } from './business-support-user.component';



@NgModule({
  declarations: [
    BusinessSupportUserComponent
  ],
  imports: [
    CommonModule,
    BusinessSupportUserRoutingModule,
    SharedModule
  ]
})
export class BusinessSupportUserModule { }
