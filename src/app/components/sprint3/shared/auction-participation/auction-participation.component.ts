import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';
import { Component, Input, OnInit } from '@angular/core';
import { BidderService } from '../../services/bidder.service';
import { mode } from 'crypto-js';

@Component({
  selector: 'app-auction-participation',
  templateUrl: './auction-participation.component.html',
  styleUrls: ['./auction-participation.component.scss']
})
export class AuctionParticipationComponent implements OnInit {
  @Input() upcomingAuction: any;
  @Input() AuctionId: any;
  @Input() isParticipated: any;
  showSuccessfulModal: boolean = false;
  constructor(private http: HttpClient, private bidderService: BidderService, private router: Router) { }
  btnDisable = false;
  ngOnInit(): void {
    console.log("🎯TC🎯 <--", this.isParticipated);
    if (this.isParticipated.ZzBidderSts == 'P') {
      console.log("🎯TC🎯 <--", this.isParticipated);
      this.btnDisable = true;
    }
  }
  // participation() {
  //   this.showSuccessfulModal = true;
  //   console.log("🎯TC🎯 <-- AuctionParticipationComponent <-- participation <-- this.showSuccessfulModal", this.showSuccessfulModal);
  // }
  submitparticipation() {
    if (this.AuctionId) {
      this.bidderService.makeParticipateIn(this.AuctionId).subscribe((res) => {
        if (res) {
          this.showSuccessfulModal = true;
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
