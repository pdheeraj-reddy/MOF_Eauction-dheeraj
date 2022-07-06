import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';
import { Component,Input, OnInit } from '@angular/core';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-auction-participation',
  templateUrl: './auction-participation.component.html',
  styleUrls: ['./auction-participation.component.scss']
})
export class AuctionParticipationComponent implements OnInit {
  @Input() upcomingAuction:any;
  @Input() AuctionId:any;
  @Input() isParticipated:boolean;
  constructor(private http: HttpClient, private envService : EnvService, private bidderService:BidderService) { }

  ngOnInit(): void {
  }
  participation() {

  }
  submitparticipation(){
    if(this.AuctionId){
      // "AucId" : this.AuctionId,
      let auctionParticipation ={
        // "AucId" : "9700000300",
        "AucId" : this.AuctionId,
        "ZzUserAction" : "P"
      }
      this.bidderService.makeParticipateIn(auctionParticipation).subscribe((res)=>{

      });
    }
  }
}
