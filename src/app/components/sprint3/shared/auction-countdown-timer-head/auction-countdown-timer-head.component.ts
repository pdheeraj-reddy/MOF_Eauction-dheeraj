import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-auction-countdown-timer-head',
  templateUrl: './auction-countdown-timer-head.component.html',
  styleUrls: ['./auction-countdown-timer-head.component.scss']
})
export class AuctionCountdownTimerComponentHead implements OnInit {
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
    // console.log("🎯TC🎯 ~ file: auction-countdown-timer-head.component.ts ~ line 24 ~ this.auctionEndDate", this.auctionEndDate);
    // console.log("🎯TC🎯 ~ file: auction-countdown-timer-head.component.ts ~ line 24 ~ this.auctionStartDate", this.auctionStartDate);
    this.auctionStartDate = this.convert(this.auctionStartDate);
    this.auctionEndDate = this.convert(this.auctionEndDate);
    let dateStr;

    if (this.auctionStatus == "Upcoming") {
      this.label = 'Starts In';
      dateStr = this.auctionStartDate;
    } else {
      this.label = 'Ends In';
      dateStr = this.auctionEndDate;
    }
    let timestamp: number = 0;
    if (dateStr) {
      timestamp = Number(moment(dateStr, 'DD.MM.YYYY HH:mm:ss').format('x'));
    }
    // console.log(dateStr);
    const timeout = setInterval(() => {
      // get total seconds between the times
      // var date = new Date(Date.now());
      // date.setMinutes(date.getMinutes()-150);
      var delta = (timestamp - Date.now()) / 1000;

      // console.log(delta + 600000); 
      // delta +=7200;
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
  /** Convert the date into Date object */
  convert(hms:any){
    const date = hms.split(" ")[0];
    const Time = hms.split(" ")[1];
    const [day,month,year] = date.split(".");
    const [hours, minutes, seconds] = Time.split(':');
    var time = new Date(year,Number(month)-1,day,hours,minutes,seconds);
    // time.setMinutes(time.getMinutes()+150);
    const arbDate = moment(time).format("DD.MM.YYYY HH:mm:ss");
    return arbDate;
  }
}
