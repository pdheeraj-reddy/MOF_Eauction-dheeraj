import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EnvService } from 'src/app/env.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-no-of-participants-bids',
  templateUrl: './no-of-participants-bids.component.html',
  styleUrls: ['./no-of-participants-bids.component.scss']
})
export class NoOfParticipantsBidsComponent implements OnInit {

  @Input() auctionId:any;

  constructor(private http: HttpClient,
  private api: BidderService) { }
  participants: number = 0;
  bids:number = 0;
  ngOnInit(): void {
    console.log('no of partipate',this.auctionId)
   
    this.getParticipants();
  }
  getParticipants(){

    this.api.getNoOfParticipants(this.auctionId).subscribe((res:any)=>{
      console.log(res.body.d);
      this.participants = res.body.d.NoParticipant =='' ? 0 : res.body.d.NoParticipant;
      this.bids = res.body.d.NoBids == '' ? 0 :res.body.d.NoBids;

      setTimeout(() => {
        // console.log(5);
         this.getParticipants()
      }, 5000);
    })
  }
 
} 
