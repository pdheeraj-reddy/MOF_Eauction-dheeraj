import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-offers-card',
  templateUrl: './open-offers-card.component.html',
  styleUrls: ['./open-offers-card.component.scss']
})
export class OpenOffersCardComponent implements OnInit {
  @Input() auctionId :any;
  @Input() importantInfo :any;

  constructor() { }

  ngOnInit(): void {
    console.log("🎯TC🎯 ~ file: open-offers-card.component.ts ~ line 16 ~ this.importantInfo", this.importantInfo);
  }

}
