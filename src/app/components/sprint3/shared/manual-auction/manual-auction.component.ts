import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-manual-auction',
  templateUrl: './manual-auction.component.html',
  styleUrls: ['./manual-auction.component.scss']
})
export class ManualAuctionComponent implements OnInit {
  @Input() upcomingAuction : any;

  btnDisable : boolean = false;
  showConfirmationModal : boolean = false;
  showLoader: boolean = false;
  auctionId : any;
  constructor(private bidderService: BidderService) { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
  }
  startManualAuction(){
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
