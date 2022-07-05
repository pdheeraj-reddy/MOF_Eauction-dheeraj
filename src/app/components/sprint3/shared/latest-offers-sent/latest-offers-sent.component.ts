import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-latest-offers-sent',
  templateUrl: './latest-offers-sent.component.html',
  styleUrls: ['./latest-offers-sent.component.scss']
})
export class LatestOffersSentComponent implements OnInit {

  constructor(private api : AucModeratorService,
    public PaginationServc: PaginationSortingService) { }

  biddet  : any[] = [];
  @Input() aucId: any;
  @Input() pageno: any;
  PageNo : string;
  ngOnInit(): void {

    this.PageNo = this.pageno;
  
    if(this.aucId && this.pageno){
      this.getBidDetails(this.PageNo)
    }

    console.log(this.aucId);
    
  }

  getBidDetails(pagenu?:any){ 
    if(pagenu){
      this.api.getLatestBiddetails(this.aucId,pagenu).subscribe((res=>{
        console.log(res['body']['d']['results'][0]['pagetoaucbiddernav']['results']);

        this.biddet = res['body']['d']['results'][0]['pagetoaucbiddernav']['results']
  
        this.PaginationServc.resetSorting();
  
      }))
    }
    else {
      this.api.getLatestBiddetails(this.aucId,this.PageNo).subscribe((res=>{
        console.log(res);
  
        this.PaginationServc.resetSorting();
  
      }))
    }
   
  }


  getsince(dat:Date,time:Time){

    let totseconds =  100000000;
    return  this.getTime(new Date(Date.now()-totseconds))
  }

 
  getTime(date:any) :any{
    
    let dt : any = new Date();
    let seconds = Math.floor(dt - date) / (1000)
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}
