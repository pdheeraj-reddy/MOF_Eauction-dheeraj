import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-auction-countdown-timer',
  templateUrl: './auction-countdown-timer.component.html',
  styleUrls: ['./auction-countdown-timer.component.scss']
})
export class AuctionCountdownTimerComponent implements OnInit {
  @Input() auctionStatus: string;
  @Input() auctionStartDate: string;
  @Input() auctionEndDate: string;
  @Input() larger: boolean = false;
  constructor() { }

  days: number = 0
  hours: number = 0
  minutes: number = 0
  seconds: number = 0
  label: string = ''

  ngOnInit(): void {
    let dateStr;
    
    if(this.auctionStatus=="Ongoing") {
      this.label = 'Ends Through';
      dateStr = this.auctionEndDate;
    } else if(this.auctionStatus=="Published") {
      this.label = 'Starts During';
      dateStr = this.auctionStartDate;
    }else{
      this.label = 'Ends Through';
    }
    let timestamp:number = 0;
    if(dateStr) {
      timestamp = Number(moment(dateStr, 'DD.MM.YYYY HH:mm:ss').format('x'));
    }

    const timeout = setInterval(() => {
      // get total seconds between the times
      var delta = (timestamp - Date.now()) / 1000;

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
