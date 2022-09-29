import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-reject-auction-popup',
  templateUrl: './reject-auction-popup.component.html',
  styleUrls: ['./reject-auction-popup.component.scss'],
})
export class RejectAuctionPopupComponent implements OnInit {
  preAuctionData: any;
  rejectionNotes = '';
  rejectionReason: string = '';
  maxLen = 250;
  textDir: string;
  showSubmitBtnLoader: boolean = false;
  submitForm: boolean = false;
  showCancelSuccessfulModal: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RejectAuctionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    public _AuctionService: AuctionModeratorService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      this.textDir = 'ltr'
    }
    this.preAuctionData = this.dialogData.auctionData;
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      this.textDir = 'ltr'
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

  approveOrRejectAuction(action: any) {
    this.submitForm = true;
    this.rejectionReason = this.rejectionReason.trim();
    if (!this.rejectionReason) return;
    this.showSubmitBtnLoader = true;
    this.preAuctionData.ActionTaken = action;
    if (action == 'R') {
      this.preAuctionData.RejectNotes = this.rejectionReason;
      this._AuctionService
        .approveOrRejectAuction({
          ActionTaken: action,
          RejectNotes: this.preAuctionData.RejectNotes,
          ObjectId: this.preAuctionData.ObjectId,
          Description: this.preAuctionData.Description,
          Status: 'Pending Review',
          listtoproductnav: [],
        })
        .subscribe(
          (res: any) => {
            this.showSubmitBtnLoader = false;
            this.showCancelSuccessfulModal = true;
          },
          (error) => {
            console.log('approveOrRejectAuction RespError : ', error);
          }
        );
    }
  }


  public closeCancelSuccessfulModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showCancelSuccessfulModal = false;
      this.closeDialog();
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showCancelSuccessfulModal = false;
    }
  }
}


export interface DialogData {
  auctionData: any;
}
