import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-offers-card',
  templateUrl: './open-offers-card.component.html',
  styleUrls: ['./open-offers-card.component.scss']
})
export class OpenOffersCardComponent implements OnInit {
  @Input() auctionId: any;
  @Input() importantInfo: any;
  btnDisable: boolean = false;
  currentDate = new Date();
  currentTime = this.currentDate.getTime();
  offset = this.currentDate.getTimezoneOffset() * (60 * 1000);
  utc = new Date(this.currentTime + this.offset);
  riyadh = new Date(this.utc.getTime() + (3 * 60 * 60 * 1000));

  startDate = new Date();

  constructor() { }

  ngOnInit(): void {
    if (this.startDate > this.riyadh) {
      this.btnDisable = true;
    }
    else {
      this.btnDisable = false;
    }
  }

}
