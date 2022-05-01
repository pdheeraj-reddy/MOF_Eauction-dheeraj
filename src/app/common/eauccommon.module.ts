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

@NgModule({
  declarations: [
    NumericDirective,
    CurrencyDirective,
    AuctionCountdownTimerComponent,
    AuctionCardComponent,
    TimePickerDirective,
    DatePickerDirective,
    AuctionSliderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  providers: [],
  exports: [
    NumericDirective,
    CurrencyDirective,
    AuctionCountdownTimerComponent,
    AuctionCardComponent,
    TimePickerDirective,
    DatePickerDirective
  ],
})
export class EAucCommonModule { }
