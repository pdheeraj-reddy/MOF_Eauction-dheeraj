import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { RejectAuctionPopupComponent } from './reject-auction-popup/reject-auction-popup.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-am-detail-page',
  templateUrl: './am-detail-page.component.html',
  styleUrls: ['./am-detail-page.component.scss'],
})
export class AmDetailPageComponent implements OnInit {
  preAuctionData: any = {};
  productValue: any;
  rejectionNotes: any;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  selectedIndex = 0;
  tabThreeFour = true;
  tabTwo = false;
  showAuction = true;
  showProduct = false;
  isPublishTab = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public _AuctionService: AuctionModeratorService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
    this.getPreAuctionData();
  }

  selectToggle(type: any) {}

  attachmentDownload(attchment: any) {
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }

  openRejectPopup() {
    const dialogRef = this.dialog.open(RejectAuctionPopupComponent, {
      height: 'auto',
      width: '55%',
      position: {
        left: '20%',
      },
      data: {
        auctionData: this.preAuctionData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  nowchangetoAuction() {
    this.showAuction = true;
    this.showProduct = false;
  }
  nowchangetoProduct() {
    this.showAuction = false;
    this.showProduct = true;
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
        UserId: '1827879980',
        listtoproductnav: [],
      })
      .subscribe(
        (res: any) => {
          alert('Updated Successfully');
          this.getPreAuctionData();
          console.log(res);
        },
        (error) => {
          alert('Error Updating');
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId(
      'inventoryAllocationTable',
      columnId,
      sortType,
      dateFormat
    );
  }

  publishAuction() {
    this._AuctionService
      .approveOrRejectAuction({
        ActionTaken: 'A',
        ZzPrtReason: '', // Reject reason
        ObjectId: this.preAuctionData.ObjectId, // 9700000487     9700000488   9700000489
        Description: this.preAuctionData.Description,
        Status: 'Published', // Rejected
        UserId: '1827879980',
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

  goBack() {
    this.router.navigateByUrl('/');
  }

  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
        if (this.preAuctionData.ActionTaken == 'A') {
          this.tabTwo = true;
        } else {
          this.tabTwo = false;
        }
        if (
          this.preAuctionData.Status == 'Pending Review' ||
          this.preAuctionData.Status == 'Pending Pricing'
        ) {
          this.tabThreeFour = false;
        }
        for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
          this.productValue =
            this.productValue +
            parseFloat(
              this.preAuctionData.listtoproductnav.results[i].ProductValue
            );
        }
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
    // let temp = this._AuctionService.getAuctionDetails(this.ObjectId);
    // this.preAuctionData = temp['d']['results'][0];
    // for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
    //   this.productValue =
    //     this.productValue +
    //     parseFloat(
    //       this.preAuctionData.listtoproductnav.results[i].ProductValue
    //     );
    // }
  }
}
