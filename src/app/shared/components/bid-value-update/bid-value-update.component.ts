import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-value-update',
  templateUrl: './bid-value-update.component.html',
  styleUrls: ['./bid-value-update.component.scss'],
})
export class BidValueUpdateComponent implements OnInit {
  userInfo : any;
  preAuctionData: any;
  editmode1: boolean = false;
  inputMode: boolean = true;
  totalBidValue: any;
  isBidUpdate: boolean = false;
  ObjectId: any = '';
  showPageLoader: boolean = false;
  isAuctionHead: boolean = false;
  estimatedValueOfProducts = 0;
  types: any = [
    {
      name: 'Enter the total estimated value of the products',
      value: true,
    },
    {
      name: 'Enter the estimated value for each product separately',
      value: false,
    },
  ];
  constructor(
    public PaginationServc: PaginationSortingService,
    private activatedRoute: ActivatedRoute,
    private _AuctionService: AuctionModeratorService
  ) {}

  saveBidValue() {
    this.estimatedValueOfProducts = this.totalBidValue;
  }

  selection(value: any) {
    if (!value) this.isBidUpdate = true;
    else this.isBidUpdate = false;
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
    }
    this.userInfo = this.getUserInfo();
    if(this.userInfo.role === 'EAuction_InteriorMarketer'){
    } else if(this.userInfo.role === 'EAuction_AuctionManager'){
      this.isAuctionHead = true;
    } else if(this.userInfo.role === 'EAuction_PricingCommitteeChairman'){
      this.isAuctionHead = true;
    } else if(this.userInfo.role === 'EAuction_PricingCommitteeMember'){
      this.isAuctionHead = false;
    } 
    this.getPreAuctionData();
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId(
      'applicationsList',
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
  adjustTotalPriceAuction(action: any) {
    this.preAuctionData.ActionTaken = action;
    console.log(this.preAuctionData);
    this._AuctionService
      .approveOrRejectAuction({
        ObjectId: this.preAuctionData.ObjectId,
        Description: this.preAuctionData.Description,
        Status: 'Pending Pricing',
        ZzPbEstPricePc: this.totalBidValue.toString(),
        ZzEstOpt: 'A',
        UserId: '1622234795',
        listtoproductnav: [],
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.getPreAuctionData();
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }
  getPreAuctionData() {
    this.showPageLoader = true;
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
        this.totalBidValue = parseFloat(this.preAuctionData.ZzPbEstPricePc);
        if (this.preAuctionData.ZzEstOpt == 'I') {
          this.inputMode = false;
          this.isBidUpdate = true;
        } else {
          this.inputMode = true;
          this.isBidUpdate = false;
        }
        this.showPageLoader = false;
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
    // let temp = this._AuctionService.getPreAuctionApproval('9700000300');
    // this.preAuctionData = temp['d']['results'][0];
  }

  public getUserInfo(){
    return localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : '';
  }
}
