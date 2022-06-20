import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "../../service/auction.service";
import { EnvService } from 'src/app/env.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public applang: string = 'ar';
  loggedUser: any;
  loggedUserRole: any;
  currentUserRole: string;
  isAuction: boolean = false;
  title = 'Header';

  constructor(
    public translate: TranslateService,
    public router: Router,
    public auctionServc: AuctionService,
    private cookieService: CookieService,
    private envService: EnvService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');

    this.applang = localStorage.getItem('lang_pref') || translate.getBrowserLang() || 'ar';
    translate.use(this.applang.match(/en|ar/) ? this.applang : 'ar');
  }

  ngOnInit(): void {
    this.loggedUser = this.auctionServc.loggedUser;
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    this.currentUserRole = this.auctionServc.getLoggedUserEAucRole();
    console.log('this.loggedUserRole ➼ ', this.loggedUserRole);
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
}
