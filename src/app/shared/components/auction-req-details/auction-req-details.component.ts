import { Component, Input, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionService } from 'src/app/service/auction.service-2';
@Component({
  selector: 'app-auction-req-details',
  templateUrl: './auction-req-details.component.html',
  styleUrls: ['./auction-req-details.component.scss']
})
export class AuctionReqDetailsComponent implements OnInit {
  @Input()
  preAuctionData: any;

  productValue: any;
  rejectionNotes: any;
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionService
  ) {}

  ngOnInit(): void {
  //  this.getPreAuctionData();
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
    console.log(this.preAuctionData);
    for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
      this.productValue =
        this.productValue +
        parseFloat(
          this.preAuctionData.listtoproductnav.results[i].ProductValue
        );
    }
  }
}
