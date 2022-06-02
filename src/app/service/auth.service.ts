import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "src/app/service/auction.service";
import { environment } from 'src/environments/environment';
import { EnvService } from '../env.service';

@Injectable()
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public router: Router,
    public auctionServc: AuctionService,
    private envService: EnvService,
  ) { }

  loggedIn() {
    let accessToken = '';
    let idToken = '';
    //return true;

    accessToken = this.cookieService.get('IDM_ACCESSTOKEN');
    idToken = this.cookieService.get('IDM_IDTOKEN');
    if (!!accessToken && !!idToken) {
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

  //for RefreshToken
  refreshToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        // ------- For Development
        // 'client_id': '1QIwuXglQ0xImRhjTUbJ7k6x7AR6MibG',
        // 'client_secret': '1d18eecc-6f4e-476f-bec3-f2c2c94521f6',
        // ------- For Pre-Prod
        'client_id': '0da14a804cf648a495353ab748876746',
        'client_secret': 'OUHH4iSTNJ5KdK5QCqqWvMPPqT9Oeyd36ow1ICFFgNk=',
        'grant_type': token,
        'refresh_token': token
      })
    };
    return this.http.post(this.envService.environment.idmLoginURL + '/connect/token', {
      refreshToken: token
    }, httpOptions);
  }



}