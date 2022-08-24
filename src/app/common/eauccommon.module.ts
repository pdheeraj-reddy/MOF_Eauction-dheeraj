import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Common module
import { NumericDirective } from './directives/positive-numeric.directive';
import { CurrencyDirective } from './directives/currency.directive';
import { TimePickerDirective } from './directives/time-picker.directive';
import { DatePickerDirective } from './directives/date-picker.directive';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { CommaDirective } from './directives/comma.directive';

@NgModule({
  declarations: [
    NumericDirective,
    DigitOnlyDirective,
    CurrencyDirective,
    TimePickerDirective,
    DatePickerDirective,
    CommaDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  providers: [],
  exports: [
    NumericDirective,
    DigitOnlyDirective,
    CurrencyDirective,
    TimePickerDirective,
    DatePickerDirective,
    CommaDirective
  ],
})
export class EAucCommonModule { }
