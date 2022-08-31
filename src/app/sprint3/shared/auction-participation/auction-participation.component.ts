import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BidderService } from '../../services/bidder.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auction-participation',
  templateUrl: './auction-participation.component.html',
  styleUrls: ['./auction-participation.component.scss']
})
export class AuctionParticipationComponent implements OnInit {
  @Input() upcomingAuction: any;
  @Input() AuctionId: any;
  @Input() response: any;

  showLoader: boolean = false;
  showSuccessfulModal: boolean = false;
  showConfirmationModal: boolean = false;
  btnDisable = false;
  timeOver: boolean = false;
  constructor(private bidderService: BidderService, private router: Router) { }


  ngOnInit(): void {
    console.log("🚀🚀 ~~ upcomingAuction", this.upcomingAuction);
    if (this.response.ZzBidderSts == 'P') {
      this.btnDisable = true;
    } else if (new Date(`${this.upcomingAuction.auctionStartsdate} ${this.upcomingAuction.auctionStartstime} ${this.upcomingAuction.auctionStartstimeSufix}`).getTime() < new Date().getTime()) {
      this.timeOver = true;
    }
    console.log("Participant time", new Date(`${this.upcomingAuction.auctionStartsdate} ${this.upcomingAuction.auctionStartstime} ${this.upcomingAuction.auctionStartstimeSufix}`), new Date())

  }

  submitparticipation() {
    if (this.AuctionId) {
      this.showLoader = true;
      this.bidderService.makeParticipateIn(this.AuctionId).subscribe((res) => {
        if (res.d.Msgty == 'S') {
          this.showConfirmationModal = false;
          this.showSuccessfulModal = true;
          this.btnDisable = true;
          this.showLoader = false;
        }
      });
    }
  }
  closeModal(model: string) {
    if (model == "close") {
      this.showSuccessfulModal = false;
    }
    if (model == "success") {
      this.showSuccessfulModal = false;
      this.router.navigate(['/bidder']);
    }
  }
}
