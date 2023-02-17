import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuctionService } from '../service/auction.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    public auctionServc: AuctionService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoles();
  }

  private checkRoles() {
    const currentUserRole = this.auctionServc.getLoggedUserRole();
    if (currentUserRole.isBidder) return this.router.parseUrl('bidder');
    if (currentUserRole.isSalesHead) return this.router.parseUrl('auction-committee-head');
    if (currentUserRole.isBusinessSupportUser) return this.router.parseUrl('business-support-user');
    return true
  }

}
