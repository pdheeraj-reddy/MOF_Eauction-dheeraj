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
import { AuctionCountdownTimerComponent } from './components/auction-countdown-timer/auction-countdown-timer.component';
import { AuctionCardComponent } from './components/auction-card/auction-card.component';
import { TimePickerDirective } from './directives/time-picker.directive';
import { DatePickerDirective } from './directives/date-picker.directive';
import { AuctionSliderComponent } from './components/auction-slider/auction-slider.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { CommaDirective } from './directives/comma.directive';

@NgModule({
  declarations: [
    NumericDirective,
    DigitOnlyDirective,
    CurrencyDirective,
    AuctionCountdownTimerComponent,
    AuctionCardComponent,
    TimePickerDirective,
    DatePickerDirective,
    AuctionSliderComponent,
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
    AuctionCountdownTimerComponent,
    AuctionCardComponent,
    TimePickerDirective,
    DatePickerDirective,
    CommaDirective
  ],
})
export class EAucCommonModule { }
