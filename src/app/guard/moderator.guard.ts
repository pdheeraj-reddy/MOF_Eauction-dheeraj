import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuctionService } from "src/app/service/auction.service";
import { AuthService } from "src/app/service/auth.service";



@Injectable({
    providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        public auctionServc: AuctionService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


        if (this._authService.loggedIn()) {
            const currentUserRole = this.auctionServc.getLoggedUserRole();
            if (currentUserRole?.isAuctionModerator) {
                return true;
            } else {
                window.alert("Access Denied");
                return false;
            }
        } else {
            window.alert("Access Denied");
            return false;
        }
        throw new Error("Method not implemented.");
    }
}