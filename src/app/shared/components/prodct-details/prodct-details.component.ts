import { Component, Input, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBidValueComponent } from './edit-bid-value/edit-bid-value.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuctionHeadDetailPageComponent } from 'src/app/modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';

@Component({
  selector: 'app-prodct-details',
  templateUrl: './prodct-details.component.html',
  styleUrls: ['./prodct-details.component.scss'],
})
export class ProdctDetailsComponent implements OnInit {
  @Input()
  preAuctionData: any;
  @Input()
  isBidUpdate: boolean = false;
  @Input()
  isAuctionHead: boolean = false;

  estimatedValueOfProducts: any;
  selectedPageNumber: number;
  p: number = 1;

  @Input('estimatedValueOfProducts')
  set _estimatedValueOfProducts(data: any) {
    this.estimatedValueOfProducts = data;
    if (!this.isBidUpdate) {
      this.productValue = this.estimatedValueOfProducts;
    }
  }

  productValue: any = 0;
  rejectionNotes: any;
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionModeratorService,
  //  private _AuctionHeadDetailPage :AuctionHeadDetailPageComponent,
    public dialog: MatDialog,
    public router: Router
  ) {}

  editPrice(index: any, product: any) {
    const dialogRef = this.dialog.open(EditBidValueComponent, {
      height: '20%',
      width: '30%',
      position: {
        left: '40%',
      },
      data: {
        index: index,
        name: product?.Description,
        price: product?.ZzPdtEstPricePc,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.preAuctionData['listtoproductnav']['results'][result?.index][
        'ZzPdtEstPricePc'
      ] = result.price;
      let temp = this.preAuctionData['listtoproductnav']['results'];
      this.productValue = 0;
      for (let i = 0; i < temp.length; i++) {
        console.log(parseInt(temp[i]?.ZzPdtEstPricePc));
        this.productValue =
          this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc);
      }
    });
  }

  editPriceInPopup(index: any, product: any) {
    console.log('1', index, product);
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      height: '100%',
      width: '60%',
      position: {
        left: '20%',
      },
      data: {
        index: index,
        productDetails: product,
        isBidUpdate: this.isBidUpdate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.isBidUpdate) {
        this.preAuctionData['listtoproductnav']['results'][result?.index][
          'ZzPdtEstPricePc'
        ] = result.price;
        let temp = this.preAuctionData['listtoproductnav']['results'];
        this.productValue = 0;
        for (let i = 0; i < temp.length; i++) {
          console.log(parseInt(temp[i]?.ZzPdtEstPricePc));
          this.productValue =
            this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc);
        }
      }
    });
  }

  viewProduct(index: any, product: any) {
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      height: '100%',
      width: '70%',
      position: {
        left: '40%',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {
    if (this.preAuctionData.ZzPbEstPricePc != undefined) {
      this.productValue = parseFloat(this.preAuctionData.ZzPbEstPricePc);
      console.log(
        '*******',
        this.preAuctionData.ZzPbEstPricePc,
        this.productValue
      );
    }

    // let temp = this.preAuctionData?.listtoproductnav?.results;
    // // let temp = this.preAuctionData?.listtoproductnav?.results;
    // // if(temp){}
    // for (let i = 0; i < temp?.length; i++) {
    //   this.productValue = this.productValue + parseInt(temp[i]?.ProductValue);
    // }
    // console.log(this.productValue);
    // // this.getPreAuctionData();
  }

  attachmentDownload(attchment: any) {
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }
  adjustPrice() {
  //  this._AuctionHeadDetailPage.adjustPrice();  
  }

  public getServerData(selectedPageNumber: number) {
    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    // this.getAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

  approveOrRejectAuction(action: any, status: any) {
    this.preAuctionData.Status = status;
    this.preAuctionData.ZzEstOpt = !this.isBidUpdate ? 'A' : 'I';
    this.preAuctionData.ZzPbEstPricePc = this.productValue.toString();
    this.preAuctionData.UserId = '1622234795';
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
}
