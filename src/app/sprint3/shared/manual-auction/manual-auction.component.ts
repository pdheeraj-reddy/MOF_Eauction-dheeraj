import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-manual-auction',
  templateUrl: './manual-auction.component.html',
  styleUrls: ['./manual-auction.component.scss']
})
export class ManualAuctionComponent implements OnInit {
  @Input() upcomingAuction: any;

  btnDisable: boolean = false;
  showConfirmationModal: boolean = false;
  showLoader: boolean = false;
  auctionId: any;
  currentDate = new Date();
  currentTime = this.currentDate.getTime();
  offset = this.currentDate.getTimezoneOffset() * (60 * 1000);
  utc = new Date(this.currentTime + this.offset);
  riyadh = new Date(this.utc.getTime() + (3 * 60 * 60 * 1000));

  startDate = new Date();

  constructor(private bidderService: BidderService) { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
    this.timesplit();
    if (this.startDate > this.currentDate) {
      this.btnDisable = true;
    }
    else {
      this.btnDisable = false;
    }

  }

  timesplit() {
    let date = this.upcomingAuction.auction_start_date.split(' ')[0];
    let time = this.upcomingAuction.auction_start_date.split(' ')[1];
    let day = date.split('.')[0];
    let month = date.split('.')[1];
    let year = date.split('.')[2];
    let hour = time.split(':')[0];
    let min = time.split(':')[1];
    let sec = time.split(':')[2];

    this.startDate = new Date(year, Number(month) - 1, day, hour, min, sec);

  }

  startManualAuction() {
    /** Starts the loader in button */
    this.showLoader = true;
    // End
    this.bidderService.manualAuctionStart(this.auctionId).subscribe((res) => {
      if (res.d.Msgty == 'S') {
        this.showLoader = false;
        this.showConfirmationModal = false;
        window.location.reload();
      }
    });


  }
}
