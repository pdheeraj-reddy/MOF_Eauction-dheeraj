import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuctionService } from "../service/auction.service";
import { EnvService } from '../env.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../shared/components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userInfo: any;
  dialogObj: any;

  constructor(
    private _authService: AuthService,
    private cookieService: CookieService,
    public auctionServc: AuctionService,
    private router: Router,
    private envService: EnvService,
    private dialog: MatDialog,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.loggedIn()) {
      const currentUserRole = this.auctionServc.loggedUser;
      if (currentUserRole) {
        // check if idToken has EAuction roles and envi clientId
        let isvalidRole, isvalidClientID;
        if (currentUserRole.roles && currentUserRole.idmclientid) {
          if (typeof currentUserRole.roles === "string") {
            isvalidRole = !!(currentUserRole.roles.includes("EAuction"));
          } else {
            isvalidRole = !!(currentUserRole.roles.find((r: any) => r.includes("EAuction")));
          }
          if (currentUserRole.idmclientid) {
            isvalidClientID = !!(currentUserRole.idmclientid == this.envService.environment.idmClientId);
          }
          if (!isvalidRole && isvalidClientID) {
            this.redirect2IdmHome();
            return false;
          } else {
            return true;
            return this.checkRoles(currentUserRole)
          }
          return true;
        } else {
          this.redirect2IdmHome();
          return false;
        }
      } else {
        this.redirect2IdmHome();
        return false;
      }
    } else {
      this.redirectToHome();
      return false;
    }
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

  redirect2IdmLogin() {
    this.cookieService.deleteAll();
    const redirectUrl = this.envService.environment.idmLoginURL;
    window.location.href = redirectUrl;
  }

  redirectToHome() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/home')
  }

  redirect2IdmHome() {
    this.dialogObj = {
      message: 'You are not Authorized. Please contact Etimad Support Team.',
      mnBtnAction: 'logout',
      mnBtntext: 'Back to Home Page'
    }
    this.dialog.open(AlertModalComponent, {
      data: this.dialogObj
    });
  }

  private checkRoles(roles: any) {
    let isBidder = false;
    if (typeof roles === "string") {
      isBidder = !!(roles.includes("EAuction_Bidder"));
    } else {
      isBidder = !!(roles.find((r: any) => r.includes("EAuction_Bidder")));
    }
    return true
  }
}