import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-bidding-offer',
  templateUrl: './send-bidding-offer.component.html',
  styleUrls: ['./send-bidding-offer.component.scss']
})
export class SendBiddingOfferComponent implements OnInit {

  amount: number = 0;
  minAmount: number = 30000;
  persuitRate: number = 0;
  addedTaxValue: number = 0;
  totalOfferPrice: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.amount = 30005;
    this.calc();
  }

  decAmt() {
    if(this.amount > this.minAmount) {
      this.amount--;
      this.calc();
    }
  }

  incAmt() {
    this.amount++;
    this.calc();
  }

  calc() {
    this.persuitRate = Math.round(2.5 * this.amount) / 100;
    this.addedTaxValue = Math.round(8 * this.amount) / 100;
    this.totalOfferPrice = this.persuitRate + this.addedTaxValue + this.amount;
  }
}
