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
  currentLang: string | null;

  constructor(private api: AucModeratorService,
    public PaginationServc: PaginationSortingService) { }

  biddet: any[] = [];
  @Input() aucId: any;
  @Input() pageno: any;
  PageNo: string;
  textDir: any;
  ngOnInit(): void {

    this.PageNo = this.pageno;

    this.getBidDetails(this.PageNo);
    this.currentLang = localStorage.getItem('lang_pref');
    if (this.currentLang == 'en') {
      this.textDir = true;
    } else {
      this.textDir = false;
    }

    console.log(this.aucId);

  }
  ngDoCheck() {
    let newLang = localStorage.getItem('lang_pref')
    if (this.currentLang != newLang) {
      if (newLang == 'ar') {
        this.currentLang = newLang;
        this.textDir = false;
        // // console.log("🎯TC🎯 ~ file: auction-details.component.ts ~ line 72 ~ textDir", this.textDir);
      }
      else {
        this.textDir = true;
        this.currentLang = newLang;
      }
    }

  }
  getBidDetails(pageno:any) {
    // if (pagenu) {
    //   this.api.getLatestBiddetails(this.aucId, pagenu).subscribe((res => {
    //     console.log(res['body']['d']['results'][0]['pagetoaucbiddernav']['results']);

    //     this.biddet = res['body']['d']['results'][0]['pagetoaucbiddernav']['results']

    //     this.PaginationServc.resetSorting();

    //   }))
    // }
    // else {
    //   this.api.getLatestBiddetails(this.aucId, this.PageNo).subscribe((res => {
    //     console.log(res);

    //     this.PaginationServc.resetSorting();

    //   }))
    // }
    this.api.getLatestBiddetails(this.aucId, pageno).subscribe((res:any)=>{
      this.biddet = res['body']['d']['results'][0]['pagetoaucbiddernav']['results'];
      console.log("🎯TC🎯 ~ file: latest-offers-sent.component.ts ~ line 73 ~ this.biddet", this.biddet);
      this.PaginationServc.resetSorting();
    });

  }


  getsince(dat: string, time: string) {
    let str = "18.07.2022 17:00:00"
    const [dateComponents, timeComponents] = str.split(' ');
    const [day, month, year] = dateComponents.split('.');
    const [hours, minutes, seconds] = timeComponents.split(':');
    const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    // console.log(Date.now()-date.getSeconds());

    return this.getTime(new Date(Date.now() -  date.getSeconds()));
  }


  getTime(date: any): any {

    let dt: any = new Date();
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
