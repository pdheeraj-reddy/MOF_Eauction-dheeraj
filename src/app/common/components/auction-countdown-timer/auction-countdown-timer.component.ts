import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

/**
 * auction-countdown-timer.ts
 * @author Naveenkumar <naveenkumar@datasack.in>
 */
@Component({
  selector: 'app-auction-countdown-timer',
  templateUrl: './auction-countdown-timer.component.html',
  styleUrls: ['./auction-countdown-timer.component.scss']
})
export class AuctionCountdownTimerComponent implements OnInit {

  @Input() date: string;
  @Input() showText : string;

  constructor() { }

  days: number = 0
  hours: number = 0
  minutes: number = 0
  seconds: number = 0
  timestamp : any;

  ngOnInit(): void {
    console.log("🎯TC🎯 ~ file: auction-countdown-timer.component.ts ~ line 28 ~ this.date", this.date);
    let dateStr = this.date;
    let timestamp: number = 0;
    if (dateStr) {
      timestamp = Number(moment(dateStr, 'DD.MM.YYYY HH:mm:ss').format('x'));
    }
    // console.log(dateStr);
    const timeout = setInterval(() => {
      // get total seconds between the times
      var delta = (timestamp - Date.now()) / 1000;
      // console.log(delta);
      if (delta > 0) {
        // calculate (and subtract) whole days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        const seconds = Math.round(delta % 60);  // in theory the modulus is not required
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        // console.log(this.days);
      } else {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(timeout);
      }
    }, 1000);
  }

}
