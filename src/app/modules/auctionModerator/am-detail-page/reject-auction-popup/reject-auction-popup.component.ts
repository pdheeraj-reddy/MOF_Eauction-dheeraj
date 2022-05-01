import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';

@Component({
  selector: 'app-reject-auction-popup',
  templateUrl: './reject-auction-popup.component.html',
  styleUrls: ['./reject-auction-popup.component.scss'],
})
export class RejectAuctionPopupComponent implements OnInit {
  preAuctionData: any;
  rejectionNotes: any;
  textDir = 'ltr';
  constructor(
    public dialogRef: MatDialogRef<RejectAuctionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    public _AuctionService: AuctionModeratorService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('lang_pref') == 'ar'){
      this.textDir = 'rtl'
    }
    else{
      this.textDir = 'ltr'
    }
    this.preAuctionData = this.dialogData.auctionData;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  approveOrRejectAuction(action: any) {
    this.preAuctionData.ActionTaken = action;
    if (action == 'R') this.preAuctionData.RejectNotes = this.rejectionNotes;
    console.log(this.preAuctionData);
    this._AuctionService
      .approveOrRejectAuction({
        ActionTaken: action,
        RejectNotes: this.rejectionNotes,
        ObjectId: this.preAuctionData.ObjectId,
        Description: this.preAuctionData.Description,
        Status: 'Pending Review',
        listtoproductnav: [],
      })
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }
}

export interface DialogData {
  auctionData: any;
}
