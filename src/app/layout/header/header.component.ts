import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "../../service/auction.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public applang: string = 'ar';
  loggedUser: any;
  loggedUserRole: any;
  isAuction: boolean = false;
  title = 'Header';

  constructor(
    public translate: TranslateService,
    public router: Router,
    public auctionServc: AuctionService,
    private cookieService: CookieService
  ) {
    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');

    this.applang = localStorage.getItem('lang_pref') || translate.getBrowserLang() || 'ar';
    translate.use(this.applang.match(/en|ar/) ? this.applang : 'ar');
  }

  ngOnInit(): void {
    this.loggedUser = this.auctionServc.loggedUser;
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    console.log('this.loggedUserRole ➼ ', this.loggedUserRole);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.applang = event.lang
    });
  }

  public onLangChange() {
    this.applang = this.applang == 'en' ? 'ar' : 'en';
    localStorage.setItem('lang_pref', this.applang);
    this.translate.use(this.applang);
  }

  /**
   * logout
   */
  public logout() {
    this.cookieService.deleteAll('/', '.mof.gov.sa');
    localStorage.clear();
    const redirectUrl = environment.idmLogoutUrl;
    window.location.href = redirectUrl;
  }
}
