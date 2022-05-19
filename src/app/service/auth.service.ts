import { Injectable } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "src/app/service/auction.service";

@Injectable()
export class AuthService {

  constructor(
    private cookieService:CookieService,
    public router: Router,
    public auctionServc: AuctionService,
    ) { }

  loggedIn(){
    let accessToken = '';
    let idToken = '';
    //return true;
    
    accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    idToken = this.cookieService.get('IDM_IDTOKEN');
    if(!!accessToken && !!idToken){
      const jwtTokenInfo = this.auctionServc.getDecodedAccessToken(idToken);
      const userInfo = {
        fullname: jwtTokenInfo.fullname,
        userid: jwtTokenInfo.name,
        roles: jwtTokenInfo.role
      }
      this.auctionServc.loggedUser = userInfo;
      return true;
    } else {
      return false;
    }
  }

}