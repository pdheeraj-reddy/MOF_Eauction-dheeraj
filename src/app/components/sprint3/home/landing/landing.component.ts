import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuctionList } from '../../interface/bidder.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  auctionListData: AuctionList[] = [];
  lang: string = '';
  @ViewChild('auctionSlide', { read: ElementRef }) public auctionSlide: ElementRef<any>;
  constructor(
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    this.auctionListData = this.mappingObject();
  }

  mappingObject() {
    let resultSet: AuctionList[] = [];
    for (let i = 0; i < 6; i++) {
      const items: AuctionList = {
        ObjectId: '50039555',
        title: 'This is the title',
        description: 'This is the description',
        imgsrc: '',
        statuscode: 'Published',
        product: '5',
        auctiondate: '2022-08-22',
        auctiontime: '16:00',
        auctionenddate: '2022-08-23',
        auctionendtime: '17:00',
        auctiontimeSufix: 'evening',
      }
      resultSet.push(items);
    }
    return resultSet;
  }

  scrollAuctionSlider(side: string) {
    if (side == 'left') {
      this.auctionSlide.nativeElement.scrollTo({ left: (this.auctionSlide.nativeElement.scrollLeft - 250), behavior: 'smooth' });
    } else if (side == 'right') {
      this.auctionSlide.nativeElement.scrollTo({ left: (this.auctionSlide.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  }

  goToAuction() {
    window.scrollTo(0, 1)
  }

}
