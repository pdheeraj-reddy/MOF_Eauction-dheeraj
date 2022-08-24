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
  biddet: any[] = [];
  @Input() aucId: any;
  @Input() pageno: any;
  PageNo: string;
  textDir: any;
  pagelimit: number = 8;
  pageRangeForAttach: any;
  totalElement: any;
  selectedPageNumber: number;
  constructor(private api: AucModeratorService,
    public PaginationServc: PaginationSortingService) { }


  ngOnInit(): void {

    this.PageNo = this.pageno;

    this.getBidDetails(1);
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
      }
      else {
        this.textDir = true;
        this.currentLang = newLang;
      }
    }

  }
  getBidDetails(pageno: any) {
    this.api.getLatestBiddetails(this.aucId, pageno).subscribe((res: any) => {
      if (res['body']['d']['results'][0]['pagetoaucbiddernav']['results'] && res['body']['d']['results'][0]['pagetoaucbiddernav']['results'].length > 0) {
        this.PaginationServc.setPagerValues(
          +res['body']['d']['results'][0].TotEle,
          this.pagelimit,
          +this.PageNo
        );

      }
      this.totalElement = res['body']['d']['results'][0].TotEle;
      console.log("🚀🚀 ~~ this.totalElement", this.totalElement);
      this.biddet = res['body']['d']['results'][0]['pagetoaucbiddernav']['results'];
      this.PaginationServc.resetSorting();
      this.navigateToPage(pageno);
    });

  }

  navigateToPage(pageNoVal: number) {
    this.PaginationServc.setPagerValues(this.totalElement, this.pagelimit, pageNoVal);
    this.pageRangeForAttach = {
      rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * this.pagelimit),
      rangeEnd: pageNoVal == 1 ? (this.pagelimit - 1) : ((pageNoVal - 1) * this.pagelimit) + (this.pagelimit - 1),
      pages: this.PaginationServc.pages,
      currentPage: this.PaginationServc.currentPage,
      totalPages: this.PaginationServc.totalPages,
    }
  }

  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getBidDetails(selectedPageNumber);
    // window.scrollTo(0, 100);
    this.PaginationServc.resetSorting();
  }


  getsince(dat: string, time: string) {
    const [day, month, year] = dat.split('.');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    return this.getTime(date);
  }

  getTime(date: any): any {
    let dt: any = new Date();
    let seconds = Math.floor(dt - date) / (1000)

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months " + "ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days " + "ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
}
