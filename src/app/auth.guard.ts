import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "./service/auction.service";

@Injectable()
export class AuthGuard implements CanActivate {
  userInfo: any;

  constructor(
    private _authService: AuthService,
    private cookieService: CookieService,
    public auctionServc: AuctionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // let idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE1OUMyOEYxMUUwM0MzMzRFMDkyQjAxOERENEM0NDA3MkRGMzlBQzkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJwWndvOFI0RHd6VGdrckFZM1V4RUJ5M3ptc2sifQ.eyJuYmYiOjE2NDY4MzQzNTQsImV4cCI6MTY0NjgzNDY1NCwiaXNzIjoiaHR0cHM6Ly8xMC4xNC44LjYxOjgwNTUiLCJhdWQiOiJlOTAyNWQ3NTg5YTg0OWNhODRiMTI4ZDc5M2Q1OTU4ZSIsIm5vbmNlIjoiM2ZkYTYyOGEyNjFmMTkyYyIsImlhdCI6MTY0NjgzNDM1NCwiYXRfaGFzaCI6ImRIX3VyY0hRcmxZbGd0R2l3VUJnOGciLCJjX2hhc2giOiJPTy0yMG1vdlBqTXRQOUc3aUVsLXpBIiwic19oYXNoIjoiUkpPSm9YNGk1eFBFbVpqaFpLaU5GUSIsInNpZCI6Ik5YV0w4ejk2V05oUTBKMnBMTk02X0EiLCJzdWIiOiI2ODYxMCIsImF1dGhfdGltZSI6MTY0NjgzNDM1MCwiaWRwIjoibG9jYWwiLCJyb2xlIjoiRUF1Y3Rpb25fSW50ZXJpb3JNYXJrZXRlciIsInVzZXJDYXRlZ29yeSI6IjEiLCJmdWxsbmFtZSI6Ik1vaGFtZWQgUyBTYXFpYiBTYXFpYiIsImZpcnN0TmFtZSI6Ik1vaGFtZWQiLCJzZWNvbmROYW1lIjoiUyIsInRoaXJkTmFtZSI6IlNhcWliIiwibGFzdE5hbWUiOiJTYXFpYiIsImVuZ2xpc2hGdWxsbmFtZSI6ImVuZ0ZpcnN0IGVuZ1NlY29uZCBlbmdUaGlyZCBlbmdMYXN0IiwiZW5nbGlzaEZpcnN0TmFtZSI6ImVuZ0ZpcnN0IiwiZW5nbGlzaFNlY29uZE5hbWUiOiJlbmdTZWNvbmQiLCJlbmdsaXNoVGhpcmROYW1lIjoiZW5nVGhpcmQiLCJlbmdsaXNoTGFzdE5hbWUiOiJlbmdMYXN0IiwiZW1haWwiOiJtb2hAbW9mLmdvdi5zYSIsIm1vYmlsZSI6IjA1NTcwOTE0NjUiLCJuYXRpb25hbGl0eSI6IiIsIm5hdGlvbmFsaXR5Q29kZSI6IiIsImRhdGVPZkJpcnRoIjoiMDEvMDIvMTk4NSIsImRhdGVPZkJpcnRoSGlqcmkiOiIxMS8wNS8xNDA1IiwiaWRFeHBpcnlEYXRlU3RyaW5nIjoiIiwiaWRFeHBpcnlEYXRlU3RyaW5nSGlqcmkiOiIiLCJnZW5kZXIiOiIiLCJnZW5kZXJTdHJpbmciOiIiLCJpc1NlbWlHb3ZBZ2VuY3kiOiIwIiwiaXNJbmRpdmlkdWFsVXNlciI6IjAiLCJsYXN0TG9naW5HYXRlIjoiTU9GIiwiQWdlbmN5VHlwZUlEIjoiMyIsImdvdkVudGl0eSI6IjIyICwwMjIgLCDZiNiy2KfYsdipINin2YTYtdit2KkiLCJ2cm9vZmZpY2UiOiJWUk8wMDAwMDciLCJ2cm9vZmZpY2VhcmFiaWNuYW1lIjoiLNmF2YPYqtioINiq2K3ZgtmK2YIg2KfZhNix2KTZitipINmI2LLYp9ix2Kkg2KfZhNi12K3YqSIsInZyb29mZmljZWVuZ2xpc2huYW1lIjoiLCIsImlzcmVsYXRlZHZybyI6IlRydWUiLCJzZWxlY3RlZEFnZW5jeSI6IjQzNywwMjIwMDEwMDAwMDAs2YjYstin2LHYqSDYp9mE2LXYrdipIC0g2KfZhNiv2YrZiNin2YYg2KfZhNi52KfZhSxGYWxzZSAsNDM3ICxVcGxvYWQvR2V0RmlsZT9maWxlSWQ9b2M0alJzT2RWazhDY2JTaWJBNk5BZz09Oti02LnYp9ixINmI2LLYp9ix2Kkg2KfZhNi12K3YqS5QTkc6dUlJSGRNWHVJNjZFeSs5OHg2NmprZz09IiwiSXNQcml2YXRlIjoiRmFsc2UiLCJpc21pZ3JhdGVkIjoiVHJ1ZSIsIkFnZW5jeVR5cGVJZCI6IjQiLCJwZXJtaXNzaW9uIjpbItin2YTZhdiy2KfYryDYp9mE2KfZhNmD2KrYsdmI2YbZiixodHRwczovL2FxYXJhdHRlc3QubW9mLmdvdi5zYSxBZ2VuY3kucG5nLDIsIiwi2KfYudiq2YXYp9ivINin2YTYo9iz2KfYs9mK2KksaHR0cDovLzEwLjE0LjguNjE6ODA2OS9Ib21lL0xvZ2luLEV0aW1hZC5wbmcsNCwiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMTcwNDQ5MjczMyIsIm5hbWUiOiIxNzA0NDkyNzMzIiwiYW1yIjpbInB3ZCJdfQ.EBY6WgU9mWuJ13PjYHhGvMZ62pUSyZDcEMz4tp6W3rf3bWlOUHIrKSkNZRml6CYf0QDvPAp-_TG6GRsLF_gcBi_Bv1nQyQr_gp4GW9xZCQ88R3zmI6H5Xdii1cGEqMfrD8VhgpTcYfUP6B1unBiidjWHdo7uDYxlUz8SuhTZyHiW4UNAQnKUbW86cE3ziPKfaqhelHw6hOSzxgqEepOGlanWnYYq3QeRNKjuc37H6ocKtwv0rjZ4JPNDeT6zxGDr48b8cLQBOVAxvUGUODMIoadJU6lchHe5srxgsI55l1FGgPgr7-Fb8sLmAvt5shPPtlvFQdFKQFuDoa2cgDX3Yw";
    // let accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkE1OUMyOEYxMUUwM0MzMzRFMDkyQjAxOERENEM0NDA3MkRGMzlBQzkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJwWndvOFI0RHd6VGdrckFZM1V4RUJ5M3ptc2sifQ.eyJuYmYiOjE2NDY4MzQzNTQsImV4cCI6MTY0NjgzNzk1NCwiaXNzIjoiaHR0cHM6Ly8xMC4xNC44LjYxOjgwNTUiLCJjbGllbnRfaWQiOiJlOTAyNWQ3NTg5YTg0OWNhODRiMTI4ZDc5M2Q1OTU4ZSIsInN1YiI6IjY4NjEwIiwiYXV0aF90aW1lIjoxNjQ2ODM0MzUwLCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJyb2xlcyJdLCJhbXIiOlsicHdkIl19.SKQun8V5naGXf8IZzVuWe0a03P2Bo1TmMCUtthBk7xxZzlZqeLTLprFWzq5pgH_DbufIN4uhiHxQu7rX3Ga5LjznazdRvNk7R_0h7a0D1lD1UJrYtebsUyAhP9dWHdAiMEEBgqZe5ICzi6wAJp8wFzxReXnyOWKdb_pyigQjzCltVCTmTrPw5GBxbnlcvt6dZiNEdcL5tfrNrDnw4cMtqlSxIZcMXDXW0n4Bu5BZauyCF2-INJUaBsDFtKdMyCLVuYHKsY98hm21Ox7Pdeln9jKd9GbSZFA8SW4Hx6qpuQkQJ-2sODRllLIpe7yGaLd6NCj9bje3fQMTeK3I8U_uBQ';
    // this.cookieService.set('IDM_IDTOKEN', idToken); 
    // this.cookieService.set('IDM_ACCESSTOKEN', accessToken); 

    if (this._authService.loggedIn()) {
      const currentUserRole = this.auctionServc.loggedUser;
      console.log('currentUserRole ➼ ', currentUserRole);
      if (currentUserRole) {
        // check if the currentuserRole is array or string
        if (typeof currentUserRole.roles === 'string') {
          if (!(currentUserRole.roles.includes("EAuction")) && !(currentUserRole.idmclientid == environment.idmClientId)) {
            if (!(currentUserRole.roles.includes("EAuction"))) {
              console.log('inValid Role');
            }
            if (!(currentUserRole.idmclientid == environment.idmClientId)) {
              console.log('inValid ClientId', currentUserRole.idmclientid + " -- " + environment.idmClientId);
            }
            this.cookieService.deleteAll();
            this.redirect2IdmLogin();
            return false;
          }
        }
        // check if idToken has EAuction roles and envi clientId
        else if (!(currentUserRole.roles.find((role: any) => role.includes("EAuction"))) && !(currentUserRole.idmclientid == environment.idmClientId)) {
          if (!(currentUserRole.roles.find((role: any) => role.includes("EAuction")))) {
            console.log('inValid Role');
          }
          if (!(currentUserRole.idmclientid == environment.idmClientId)) {
            console.log('inValid ClientId', currentUserRole.idmclientid + " -- " + environment.idmClientId);
          }
          this.cookieService.deleteAll();
          this.redirect2IdmLogin();
          return false;
        } else {
          return true;
        }
        return true;
      } else {
        this.redirect2IdmLogin();
        return false;
      }
    } else {
      this.redirect2IdmLogin();
      return false;
    }
  }

  redirect2IdmLogin() {
    const redirectUrl = environment.idmLoginURL;
    console.log('redirectUrl ➼ ', redirectUrl);
    window.location.href = redirectUrl;
  }
}