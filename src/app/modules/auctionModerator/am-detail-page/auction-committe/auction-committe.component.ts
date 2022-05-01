import { Component, Input, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/service/auction.service-2';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';

@Component({
  selector: 'app-auction-committe',
  templateUrl: './auction-committe.component.html',
  styleUrls: ['./auction-committe.component.scss'],
})
export class AuctionCommitteComponent implements OnInit {
  preAuctionData: any;
  showAuction = false;
  showProduct = false;
  showPricing = false;
  showAuctionCommittee = true;

  @Input()
  isPublishTab: boolean = false;

  constructor(
    private _AuctionService: AuctionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPreAuctionData();
  }

  getPreAuctionData() {
    // this._AuctionService.getPreAuctionApproval('9700000300').subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log('getAuctionList RespError : ', error);
    //   }
    // );
    let temp = this._AuctionService.getPreAuctionApproval('9700000300');
    this.preAuctionData = temp['d']['results'][0];
  }
  changeToAuction() {
    this.showAuction = true;
    this.showProduct = false;
    this.showPricing = false;
    this.showAuctionCommittee = false;
  }
  changeToProduct() {
    this.showAuction = false;
    this.showProduct = true;
    this.showPricing = false;
    this.showAuctionCommittee = false;
  }
  changeToPricing() {
    this.showAuction = false;
    this.showProduct = false;
    this.showPricing = true;
    this.showAuctionCommittee = false;
  }
  changeToAuctionCommittee() {
    this.showAuction = false;
    this.showProduct = false;
    this.showPricing = false;
    this.showAuctionCommittee = true;
  }
}
