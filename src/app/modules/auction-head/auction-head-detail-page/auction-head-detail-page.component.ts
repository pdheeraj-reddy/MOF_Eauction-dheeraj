import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { AuctionService } from 'src/app/service/auction.service';
import { EnvService } from 'src/app/env.service';

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
    public auctionServc: AuctionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public envService: EnvService
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

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
  }

  goBack() {
    this.router.navigateByUrl('/');
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
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.preAuctionData = res.body.d.results[0];
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
