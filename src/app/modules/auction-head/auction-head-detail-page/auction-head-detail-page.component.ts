import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';

@Component({
  selector: 'app-auction-head-detail-page',
  templateUrl: './auction-head-detail-page.component.html',
  styleUrls: ['./auction-head-detail-page.component.scss'],
})
export class AuctionHeadDetailPageComponent implements OnInit {
  preAuctionData: any;
  editmode1: boolean = false;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  isAuctionHead: boolean = false;
  isBidUpdate: boolean = false;
  priceAdjustment: boolean = false;
  showPageLoader: boolean = false;
  showAuction = false;
  showProduct = true;
  showPricing = false;
  showAuctionCommittee = false;
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionModeratorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
    this.getPreAuctionData();
  }

  adjustPrice() {
    this.priceAdjustment = !this.priceAdjustment;
    // this.isBidUpdate = !this.isBidUpdate;
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId(
      'inventoryAllocationTable',
      columnId,
      sortType,
      dateFormat
    );
  }

  edit() {
    this.editmode1 = true;
  }

  discard() {
    this.editmode1 = false;
  }

  getPreAuctionData() {
    this.showPageLoader = true;
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
        if (this.preAuctionData.ZzEstOpt == 'A') this.isBidUpdate = false;
        else this.isBidUpdate = true;
        this.showPageLoader = false;
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
