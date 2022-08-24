import { Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "../../service/auction.service";
import { EnvService } from 'src/app/env.service';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public applang: string = 'ar';
  loggedUser: any;
  loggedUserRole: any;
  isHomePage: boolean = false;
  currentUserRole: string;
  isAuction: boolean = false;
  title = 'Header';
  url: string = '';
  subscription: Subscription;
  auctionModerator = {
    auction: false,
    auction_request: false
  }
  bidderTab = {
    auction: false,
    my_auction: false,
    invitation: false,
    my_invoices: false
  }
  constructor(
    public translate: TranslateService,
    public router: Router,
    public auctionServc: AuctionService,
    private cookieService: CookieService,
    private envService: EnvService,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if (this.url.includes('/home')) {

          this.isHomePage = true;
          console.log("🚀🚀 ~~ this.isHomePage", this.isHomePage);
        }
        this.manageTab();
      }
    });
    if (!this.url && this.router.url) {
      this.url = this.router.url;
      this.manageTab();
    }

    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');

    this.applang = localStorage.getItem('lang_pref') || translate.getBrowserLang() || 'ar';
    translate.use(this.applang.match(/en|ar/) ? this.applang : 'ar');


  }

  ngOnInit(): void {
    this.loggedUser = this.auctionServc.loggedUser;
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    this.currentUserRole = this.auctionServc.getLoggedUserEAucRole();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.applang = event.lang
    });

  }

  public onLangChange() {
    this.applang = this.applang == 'en' ? 'ar' : 'en';
    localStorage.setItem('lang_pref', this.applang);
    this.translate.use(this.applang);
    this.changeLangTag();
  }

  private changeLangTag() {
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = this.applang == 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = this.applang;
  }

  /**
   * logout
   */
  public logout() {
    this.cookieService.deleteAll('/', '.mof.gov.sa');
    localStorage.clear();
    const redirectUrl = this.envService.environment.idmLogoutUrl;
    window.location.href = redirectUrl;
  }

  manageTab() {
    if (!this.loggedUserRole) {
      this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    }
    if (this.loggedUserRole.isAuctionModerator) {
      this.auctionModerator = {
        auction: false,
        auction_request: false
      }
      if (this.url.includes('auctionlist')) {
        this.auctionModerator.auction_request = true;
      } else if (this.url.includes('auctionModerator')) {
        this.auctionModerator.auction_request = true;
      } else if (this.url.includes('auctions')) {
        this.auctionModerator.auction = true;
      } else if (this.url.includes('auction-details')) {
        this.auctionModerator.auction = true;
      }
    } else if (this.loggedUserRole.isBidder) {
      this.bidderTab = {
        auction: false,
        my_auction: false,
        invitation: false,
        my_invoices: false
      }
      if (this.url.includes('bidder/am-auction')) {
        this.bidderTab.auction = true;
      } else if (this.url.includes('bidder/my-auctions')) {
        this.bidderTab.my_auction = true;
      } else if (this.url.includes('bidder/my-invoices')) {
        this.bidderTab.my_invoices = true;
      } else if (this.url.includes('bidder/pay-final-invoice')) {
        this.bidderTab.my_invoices = true;
      } else if (this.url.includes('bidder/invitation')) {
        this.bidderTab.invitation = true;
      } else if (this.url.includes('auction-details')) {
        this.bidderTab.auction = true;
      } else if (this.url.includes('bidder')) {
        this.bidderTab.auction = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
