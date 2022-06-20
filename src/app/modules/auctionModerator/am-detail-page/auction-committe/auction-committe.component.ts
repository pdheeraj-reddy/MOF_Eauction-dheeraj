import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from 'src/app/service/auction.service';

@Component({
  selector: 'app-auction-committe',
  templateUrl: './auction-committe.component.html',
  styleUrls: ['./auction-committe.component.scss'],
})
export class AuctionCommitteComponent implements OnInit {
  @Input() preAuctionData: any;
  @Input() step: number;
  @Output() steppernext = new EventEmitter();
  @Output() stepperACEvent = new EventEmitter();
  @Output() stepperEventAhead = new EventEmitter();
  @Output() stepperNextEvent = new EventEmitter();

  showAuction = false;
  showProduct = false;
  showPricing = false;
  showAuctionCommittee = true;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  _3MembersErrorMsg = false;
  gonext: boolean = true;

  @Input()
  isPublishTab: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public auctionServc: AuctionService,
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['step'].currentValue) {
      this.step = changes['step'].currentValue;
      if (this.step == 3) {
        this.gonext = false;
      } else {
        this.gonext = true;
      }
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  showErrorMsg(error: any) {
    this._3MembersErrorMsg = error;
  }
  callstepper() {
    this.steppernext.emit(true);
  }
  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res.body.d.results[0].CommitteeAssigned, "SKING");
        // if (res.body.d.results[0].CommitteeAssigned == 'X') {
        //   this.gonext = false
        // }
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.preAuctionData = res.body.d.results[0];
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
  }

  goBack() {
    this.stepperACEvent.emit();
  }

  goBackAgain() {
    this.stepperACEvent.emit();
  }

  goAheadAgain() {
    this.stepperNextEvent.emit();
  }

  goAhead() {
    this.stepperEventAhead.emit();
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
