import { Component, OnInit, Input, SecurityContext, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BidderService } from 'src/app/components/sprint3/services/bidder.service';

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
  constructor(
    public translate: TranslateService,
    public bidderService: BidderService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {

    console.log("🚀🚀 ~~ this.auction", this.auction);
    if (this.auction.statuscode == 'Published') {
      this.auctionStatus = 'Upcoming'
    } else {
      this.auctionStatus = this.auction.statuscode;
    }

    if (this.auction.imgsrc) {
      this.showLoader = true;
      this.downloadImages(this.auction.imgsrc);
    } else {
      this.auctionImg = 'assets/icons/logo-mini.svg'
    }
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
    this.bidderService.downloadAuctionImages(fileId).subscribe(async (downloadAuctionImagesResp: any) => {
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
    console.log("🚀 ~ redirectToDetailredirectToDetail ~ id", id)
    this.ngZone.run(() => {
      this.router.navigate(['auction-details/' + id])
    })
  }

}
