import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-no-of-participants-bids',
  templateUrl: './no-of-participants-bids.component.html',
  styleUrls: ['./no-of-participants-bids.component.scss']
})
export class NoOfParticipantsBidsComponent implements OnInit {

  constructor(private http: HttpClient,private envService: EnvService,) { }
  auctionId:number;
  participants: number = 0;
  bids:number = 0;
  ngOnInit(): void {
    // this.getauctionList();
    // TODO: Call the API and get the numbers
  }
  // getauctionList(pageNumber?: number){
  //   this.auctionId = 9700000780;
  //   // let id = this.auctionId.toString();
  //   this.http.get<any>(this.envService.environment.apiBidderParticipantsBids + "?auctionId="+this.auctionId+"&status=Ongoing",{responseType: 'json'}).subscribe(res=>{
  //   //   const csrfToken = localStorage.getItem("x-csrf-token");    
  //   //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
  //     this.bids = res.d.NoBids;
  //     this.participants = res.d.NoParticipant? res.d.NoParticipant : 0;
  //     // this.auctionListData = this.mapping(res);
  //   }, (error) => {
  //       console.log('getAuctionList RespError : ', error);
  //     });
  // }
} 
