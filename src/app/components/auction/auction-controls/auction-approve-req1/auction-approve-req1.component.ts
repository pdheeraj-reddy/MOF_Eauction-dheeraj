import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
@Component({
  selector: 'app-auction-approve-req1',
  templateUrl: './auction-approve-req1.component.html',
  styleUrls: ['./auction-approve-req1.component.scss'],
})
export class AuctionApproveReq1Component implements OnInit {
  preAuctionData: any;
  productValue: any;
  rejectionNotes: any;
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionApprovalService
  ) { }

  ngOnInit(): void {
    this.getPreAuctionData();
  }

  attachmentDownload(attchment: any) {
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }

  approveOrRejectAuction(action: any) {
    this.preAuctionData.ActionTaken = action;
    if (action == 'R') this.preAuctionData.RejectNotes = this.rejectionNotes;
    console.log(this.preAuctionData);
    this._AuctionService.approveOrRejectAuction(this.preAuctionData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
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
    for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
      this.productValue =
        this.productValue +
        parseFloat(
          this.preAuctionData.listtoproductnav.results[i].ProductValue
        );
    }
  }
}
