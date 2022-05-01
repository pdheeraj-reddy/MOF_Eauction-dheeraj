import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
// import { authCodeFlowConfig } from "./sso.config";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoader: boolean = false;
  public browserLang: string;
  title = 'etimad';
  
  constructor(
    private cookieService:CookieService,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
    
    ){

      
      // this.configureSingleSignOn();
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('en');

      const browserLang:any = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    }

  // configureSingleSignOn(){
  //   this.oauthService.configure(authCodeFlowConfig);
  //   this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //   this.oauthService.loadDiscoveryDocumentAndLogin();
  // }
  ngOnInit(): void {
    this.showLoader = true;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
      if(this.browserLang === 'en'){
        this.loadStyle('https://cdn.etimad.sa/v2/styles/main-en.min.css');
      } else {
        this.loadStyle('https://cdn.etimad.sa/v2/styles/main.min.css');
      }
      setTimeout(() => {
        this.showLoader = false;
      }, 100);
    });
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
