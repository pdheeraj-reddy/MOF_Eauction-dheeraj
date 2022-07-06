import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';
import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-participation',
  templateUrl: './auction-participation.component.html',
  styleUrls: ['./auction-participation.component.scss']
})
export class AuctionParticipationComponent implements OnInit {
  @Input() upcomingAuction:any;
  @Input() AuctionId:any;
  constructor(private http: HttpClient, private envService : EnvService) { }

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

     this.http.post<any>(
      this.envService.environment.apiBidderParticipationAuctions
      , JSON.stringify(auctionParticipation)).subscribe(res=>{
        // alert('Auction is Saved as Draft Successfully');
        console.log('auctionCreateResp', res);
        // this.activeStep ++;
        // this.changeSteps.emit(this.activeStep);
      }, (error) => {
        console.log('createAuction RespError : ', error);
      });
    }
  }
}
