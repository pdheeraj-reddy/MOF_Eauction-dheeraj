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
  showConfirmationModal : boolean = false;
  constructor(private http: HttpClient, private bidderService: BidderService, private router: Router) { }
  btnDisable = false;
  ngOnInit(): void {
    console.log("🚀🚀 ~~ upcomingAuction", this.upcomingAuction);
    console.log("🎯TC🎯 <--", this.response);
    if (this.response.ZzBidderSts == 'P') {
      console.log("🎯TC🎯 <--", this.response);
      this.btnDisable = true;
    }
  }
  // participation() {
  //   this.showSuccessfulModal = true;
  //   console.log("🎯TC🎯 <-- AuctionParticipationComponent <-- participation <-- this.showSuccessfulModal", this.showSuccessfulModal);
  // }
  submitparticipation() {
    if (this.AuctionId) {
      this.showLoader = true;
      this.bidderService.makeParticipateIn(this.AuctionId).subscribe((res) => {
        console.log("🎯TC🎯 ~ file: auction-participation.component.ts ~ line 37 ~ res.d.Msgty", res.d.Msgty);
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
