import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auction-committe',
  templateUrl: './auction-committe.component.html',
  styleUrls: ['./auction-committe.component.scss'],
})
export class AuctionCommitteComponent implements OnInit {
  @Input() preAuctionData: any;
  @Output() steppernext = new EventEmitter();
  showAuction = false;
  showProduct = false;
  showPricing = false;
  showAuctionCommittee = true;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  _3MembersErrorMsg = false;

  @Input()
  isPublishTab: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _AuctionService: AuctionApprovalService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
    this.getPreAuctionData();
  }

  showErrorMsg(error :any){
    this._3MembersErrorMsg = error;
  }
  callstepper(){
    this.steppernext.emit(true);
  }
  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
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
