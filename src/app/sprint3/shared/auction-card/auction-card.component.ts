import { Component, OnInit, Input, SecurityContext, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import moment from 'moment';
import { BidderService } from 'src/app/sprint3/services/bidder.service';
import { AuctionService } from 'src/app/service/auction.service';
import { MediaService } from 'src/app/service/media.service';

/**
 * auction-card.ts
 * @author Naveenkumar <naveenkumar@datasack.in>
 */
@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent implements OnInit {

  @Input() auction: any;
  auctionImg: any;
  source: any = '';
  auctionStatus: any = '';
  showLoader: boolean = false;
  auctionStartTime: any;
  auctionStartDateTime: string;
  auctionEndDateTime: string;
  auctionTimeSufix: string;
  /**User roles */
  role = {
    bidder: false,
    auctionMod: false,
    auctionCommitteeHead: false
  }
  constructor(
    public translate: TranslateService,
    public bidderService: BidderService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private ngZone: NgZone,
    private auctionSev: AuctionService,
    private mediaService: MediaService,
  ) { }

  async ngOnInit() {
    let currentUser = this.auctionSev.getLoggedUserRole();
    this.role.auctionMod = currentUser.isAuctionModerator;
    this.role.auctionCommitteeHead = currentUser.isSalesHead;
    this.role.bidder = currentUser.isBidder;
    if (this.auction.statuscode == 'Published') {
      this.auctionStatus = 'Upcoming'
    } else {
      this.auctionStatus = this.auction.statuscode;
    }

    if (this.auction.imgsrc) {
      this.showLoader = true;
      this.downloadImages(this.auction.imgsrc);
    } else {
      // this.auctionImg = 'assets/icons/logo-mini.svg'
    }
    if (this.auction.auctiontime) {
      var timeString = moment(this.auction.auctiontime).format('HH:mm:ss');
      var H = +timeString.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = (H < 12 || H === 24) ? " AM" : " PM";
      this.auctionStartTime = h + timeString.substr(2, 3);
    }
    this.auctionStartDateTime = moment(this.auction.auctiontime).format('DD.MM.YYYY HH:mm:ss');
    this.auctionEndDateTime = moment(this.auction.auctionendtime).format('DD.MM.YYYY HH:mm:ss');
    this.auctionTimeSufix = this.auction.auctiontime ? moment(this.auction.auctiontime).format('A') : '';

  }

  convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  downloadImages(fileId: any) {
    this.mediaService.downloadAuctionImages(fileId).then(async (downloadAuctionImagesResp: any) => {
      const fileResp = downloadAuctionImagesResp.d;
      var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: fileResp.MIMEType });
      var base64String = await this.convertBlobToBase64(blob);
      this.auctionImg = await this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(base64String as string));
      this.auctionSev.auctionImages.push({
        fileId: fileId,
        image: this.auctionImg
      })
      this.showLoader = false;

    },
      (error) => {
        this.showLoader = false;
        this.auctionImg = 'assets/icons/logo-mini.svg'
        console.log('downloadAuctionImages RespError : ', error);
      }
    );
  }

  redirectToDetail(id: string) {

    this.ngZone.run(() => {
      this.router.navigate(['auction-details/' + btoa(id)])
    })
  }

}
