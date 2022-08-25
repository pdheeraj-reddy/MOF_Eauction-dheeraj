import { Component, Input, OnInit, EventEmitter, ViewChild, ElementRef, HostListener, Output } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBidValueComponent } from './edit-bid-value/edit-bid-value.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from "src/app/service/auction.service";
import { InterconversionService } from 'src/app/service/interconversion.service';
import { AuctionHeadDetailPageComponent } from 'src/app/modules/auction-head/auction-head-detail-page/auction-head-detail-page.component';


@Component({
  selector: 'app-prodct-details',
  templateUrl: './prodct-details.component.html',
  styleUrls: ['./prodct-details.component.scss'],
})
export class ProdctDetailsComponent implements OnInit {
  @Input() preAuctionData: any;
  @Input() isBidUpdate: boolean = false;
  @Input() isAuctionHead: boolean = true;
  @Output() tabSwitch = new EventEmitter();
  loggedUserRole: any;
  confirmPublish = false;
  confirmApproval = false;
  confirmRejection = false;
  confirmationPopup = false;
  rejectionModal = false;
  rejectionReason = false;
  showConfim = false;
  maxLen = 250;
  pdtEstPricePc: any;
  temp: any = [];
  auctionProducts: any[] = [];
  inputMode: boolean = false;
  showAdjustPriceOption: boolean = false;
  invalidQty: boolean = false;
  showError: boolean = false;
  indexError = -1;
  isTotalValid: boolean = false;
  isPriceError: boolean = false;
  isPriceSuccess: boolean = false;
  isPriceNull: boolean = false;
  removeError: boolean = true;
  estimatedValueOfProducts: any;
  selectedPageNumber: number;
  p: number = 1;
  pageRangeForProductAttach: any;
  columnLst1 = ['Description', 'Quantity', 'ProductValue', 'ZzProductCond'];
  columnLst2 = ['Description', 'Quantity', 'ProductValue', 'ZzPdtEstPricePc', 'ZzProductCond'];
  @ViewChild('autoFocus') inputFieldElementFocus: ElementRef;

  @Input('estimatedValueOfProducts')
  set _estimatedValueOfProducts(data: any) {
    this.estimatedValueOfProducts = data;
    if (!this.isBidUpdate) {
      this.productValue = this.estimatedValueOfProducts;
    }
  }
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

  productValue: any = 0;
  rejectionNotes: any = '';
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionModeratorService,
    private _AuctionHeadDetailPage: AuctionHeadDetailPageComponent,
    public auctionServc: AuctionService,
    private interconversionService: InterconversionService,
    public dialog: MatDialog,
    public router: Router
  ) {

  }
  checkPrices() {

    if (this.showAdjustPriceOption == true && this.productValue < 1 && this.inputMode) {
      this.invalidQty = true;

      this.inputFieldElementFocus.nativeElement.focus();
      this.inputFieldElementFocus.nativeElement.select();

    } else if (!this.inputMode) {
      if (this.productValue > 0) {
        let product = this.preAuctionData?.listtoproductnav?.results;
        let flag = false;
        this.isPriceNull = false;
        product.forEach((element: any) => {
          if (element.ZzPdtEstPricePc == null) {
            this.isPriceNull = true;
          }
        });

        if (!this.isPriceNull) {
          product.forEach((element: any) => {
            if (element.ZzPdtEstPricePc == 0) {
              flag = true;
            }
          });
        }

        if (flag) {
          this.isPriceError = true;
        } else if (!this.isPriceNull) {
          this.showConfim = true;
        }
      } else {
        this.isTotalValid = true;
        setTimeout(() => {
          this.isTotalValid = false;
        }, 5000);
        let product = this.preAuctionData?.listtoproductnav?.results;
        let flag = false;
        this.isPriceNull = false;
        product.forEach((element: any) => {
          if (element.ZzPdtEstPricePc == null) {
            this.isPriceNull = true;
          }
        });
      }

    }
    else {
      this.showConfim = true;
    }
  }
  closeConfirm() {
    this.showConfim = false;
  }

  goBack() {
    this.tabSwitch.emit();
  }
  editPrice(index: any, product: any) {
    const dialogRef = this.dialog.open(EditBidValueComponent, {
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        data: this.temp,
        viewproduct: this.auctionProducts[index],
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
        this.productValue =
          this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc);
      }
    });
  }


  editPriceInPopup(index: any, product: any) {
    let index_temp = parseInt(product.ZzProductNo);
    const sendProduct = this.auctionProducts.filter((obj) => {
      if (obj.productNo == index_temp) {
        return obj;
      }
    });
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      disableClose: true,
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        data: this.temp,
        viewproduct: sendProduct[0],
        index: index,
        productDetails: product,
        isBidUpdate: this.isBidUpdate,
        status: this.preAuctionData.Status,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.isBidUpdate) {
        // this.adjustProductPrice();
        this.preAuctionData['listtoproductnav']['results'][result?.index][
          'ZzPdtEstPricePc'
        ] = result.price;
        let temp = this.preAuctionData['listtoproductnav']['results'];
        this.productValue = 0;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i]?.ZzPdtEstPricePc) {
            this.productValue = this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc) * temp[i].Quantity;
          }

        }
      }

    });
  }

  viewProduct(index: any, product: any) {
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      height: '90%',
      width: '70%',
      position: {
        left: '40%',
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  hideSuccessfulModal() {
    this.confirmPublish = false;
    this.confirmApproval = false;
    this.confirmRejection = false;
  }

  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.confirmPublish = false;
      this.confirmApproval = false;
      this.confirmRejection = false;
      this.router.navigate(['/auctionlist']);
    }
  }

  ngOnInit(): void {
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    if (this.preAuctionData) {

      if (this.preAuctionData.ZzPbEstPricePc != undefined) {
        this.productValue = parseFloat(this.preAuctionData.ZzPbEstPricePc);
      }
      if (this.preAuctionData.ZzEstOpt == 'I') {
        this.inputMode = false;
        this.isBidUpdate = true;
      } else {
        this.inputMode = true;
        this.isBidUpdate = false;
      }
      this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
        product.show = false;
      });
      this.navigateToPage(1, 'productAttach');
      this.adjustProductPrice();
      if (this.inputMode) {
        if (parseFloat(this.preAuctionData.ZzPbEstPricePc) == 0) {
          this.pdtEstPricePc = null;
          this.productValue = 0;
        }
        else {
          this.pdtEstPricePc = parseFloat(this.preAuctionData.ZzPbEstPricePc);
          this.productValue = this.pdtEstPricePc;
        }
      }
      this.auctionProducts = this.interconversionService.mappingObjForProducts(this.preAuctionData);

    }
    if (this.loggedUserRole.isPricingHead) {
      this.showAdjustPriceOption = false;
    } else if (this.loggedUserRole.isPricingMember) {
      this.showAdjustPriceOption = true;
    }
  }

  selection(value: any) {
    if (!value) this.isBidUpdate = true;
    else this.isBidUpdate = false; this.pdtEstPricePc = null; this.productValue = 0; this.invalidQty = false; this.removeError = false;
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
      product.ZzPdtEstPricePc = null;
    });
  }

  convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  navigateToPage(pageNoVal: number, section: string) {
    if (section == 'productAttach') {
      this.PaginationServc.setPagerValues(
        this.preAuctionData?.listtoproductnav?.results.length,
        10,
        pageNoVal
      );
      this.pageRangeForProductAttach = {
        rangeStart: pageNoVal == 1 ? 0 : (pageNoVal - 1) * 10,
        rangeEnd: pageNoVal == 1 ? 9 : (pageNoVal - 1) * 10 + 9,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
      };
    }
  }


  attachmentDownload(attchment: any) {
    window.open(attchment.DispUrl, '_blank');
  }
  adjustPrice() {
    this.showAdjustPriceOption = !this.showAdjustPriceOption;
  }


  public getServerData(selectedPageNumber: number) {
    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;


    this.PaginationServc.resetSorting();
  }

  openAdjustPriceOption(index: number) {
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any, pindex: number) => {
      if (pindex == index) {
        setTimeout(() => {
          this.inputFieldElementFocus.nativeElement.focus();
          this.inputFieldElementFocus.nativeElement.select();
        }, 0);
        this.preAuctionData.listtoproductnav.results[pindex].ZzPdtEstPricePc = Number(product.ZzPdtEstPricePc);
        product.show = true;
      } else {
        product.show = false;
      }
      this.pdtEstPricePc += product.ZzPdtEstPricePc * product.Quantity.split('.')[0];
    });
  }

  adjustProductPrice() {
    this.pdtEstPricePc = 0.00;
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
      product.show = false;
      this.pdtEstPricePc += product.ZzPdtEstPricePc * product.Quantity.split('.')[0];
    });
    this.productValue = parseFloat(this.pdtEstPricePc as string);

  }
  cancel(index: number) {
    let product = this.preAuctionData?.listtoproductnav?.results;
    product[index].ZzPdtEstPricePc = null;
    this.pdtEstPricePc = 0;
    product[index].show = false;
    product.forEach((p: any) => {
      if (p.ZzPdtEstPricePc !== null) {
        this.pdtEstPricePc += (p.ZzPdtEstPricePc * p.Quantity.split('.')[0]);
      }
    });
    this.productValue = parseFloat(this.pdtEstPricePc as string);
  }

  adjustProductPriceInEdit(index: any) {
    this.pdtEstPricePc = 0.00;
    let product = this.preAuctionData?.listtoproductnav?.results;
    product[index].show = false;

    product.forEach((p: any) => {
      if (p.ZzPdtEstPricePc !== null) {
        this.pdtEstPricePc += (p.ZzPdtEstPricePc * p.Quantity.split('.')[0]);
      }
    });

    this.productValue = parseFloat(this.pdtEstPricePc as string);
  }

  adjustTotalPrice() {
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
      product.ZzPdtEstPricePc = "0.00";
    });
    if (this.pdtEstPricePc < 1) {
      this.invalidQty = true;
      this.productValue = parseFloat('0');
    }
    else {
      this.invalidQty = false;
      this.productValue = parseFloat(this.pdtEstPricePc as string);
    }


  }

  rejectAuction(action: any, status: any) {
    let rejectNote = this.rejectionNotes.trim();
    if (rejectNote) {
      let adjustedPriceData: any = {};
      this.preAuctionData.Status = status;
      this.preAuctionData.ActionTaken = action;
      this.preAuctionData.ZzEstOpt = !this.isBidUpdate ? 'A' : 'I';
      this.preAuctionData.ZzPbEstPricePc = this.productValue.toString();
      this.preAuctionData.RejectNotes = this.rejectionNotes;
      this.preAuctionData.UserId = '1622234795';
      adjustedPriceData = this.preAuctionData;
      delete adjustedPriceData.listtobiddernav;
      adjustedPriceData?.listtoproductnav?.results.forEach((product: any) => {
        product.ZzPdtEstPricePc = product.ZzPdtEstPricePc?.toString();
        delete product.show;
      });

      this._AuctionService.approveOrRejectAuction(adjustedPriceData).subscribe(
        (res: any) => {
          this.rejectionModal = false;
          this.rejectionReason = false;
          this.confirmRejection = true;

        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );

    }
    else {
      this.rejectionNotes = "";
      this.rejectionReason = true;
      setTimeout(() => {
        this.rejectionReason = false;
      }, 5000);
    }
  }


  approveOrRejectAuction(action: any, status: any) {
    this.isPriceSuccess = false;
    this.showConfim = false;
    let adjustedPriceData: any = {};
    this.preAuctionData.Status = status;
    this.preAuctionData.ActionTaken = action;
    this.preAuctionData.ZzEstOpt = !this.isBidUpdate ? 'A' : 'I';
    this.preAuctionData.ZzPbEstPricePc = this.productValue.toString();
    this.preAuctionData.UserId = '1622234795';
    adjustedPriceData = this.preAuctionData;
    delete adjustedPriceData.listtobiddernav;
    adjustedPriceData?.listtoproductnav?.results.forEach((product: any) => {
      product.ZzPdtEstPricePc = product.ZzPdtEstPricePc?.toString();
      delete product.show;
    });
    this._AuctionService.approveOrRejectAuction(adjustedPriceData).subscribe(
      (res: any) => {
        if (status == 'Pending Pricing') {
          this.confirmPublish = true;
        }
        if (status == 'Pending Pricing Approval') {
          this.confirmApproval = true;
        }
        if (status == 'Rejected Prices') {
          this.confirmRejection = true;
        }

      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
      }
    );

  }

  sendPricingValues() {
    if (this.productValue < 1 && this.inputMode) {
      this.invalidQty = true;

      this.inputFieldElementFocus.nativeElement.focus();
      this.inputFieldElementFocus.nativeElement.select();
    } else if (!this.inputMode) {
      if (this.productValue > 0) {
        this.isTotalValid = false;
        let product = this.preAuctionData?.listtoproductnav?.results;
        let flag = false;
        this.isPriceNull = false;
        product.forEach((element: any) => {
          if (element.ZzPdtEstPricePc == null) {
            this.isPriceNull = true;
          }
        });

        if (!this.isPriceNull) {
          product.forEach((element: any) => {
            if (element.ZzPdtEstPricePc == 0) {
              flag = true;
            }
          });
        }

        if (flag) {
          this.isPriceError = true;
        } else if (!this.isPriceNull) {
          this.isPriceSuccess = true;
        }
      } else {
        this.isTotalValid = true;
        setTimeout(() => {
          this.isTotalValid = false;
        }, 5000);
        let product = this.preAuctionData?.listtoproductnav?.results;
        let flag = false;
        this.isPriceNull = false;
        product.forEach((element: any) => {
          if (element.ZzPdtEstPricePc == null) {
            this.isPriceNull = true;
          }
        });
      }

    } else {
      this.isPriceSuccess = true;
    }


  }

  sendPricingValuesFinal() {
    this.isPriceError = false;
    if (this.loggedUserRole.isPricingHead) {
      this.showConfim = true;
    } else if (this.loggedUserRole.isPricingMember) {
      this.isPriceSuccess = true;
    }

  }

  rejectPrices() {
    this.rejectionModal = true;
  }

  closeRejectionModal() {
    this.rejectionModal = false;
  }

  closeAllModal() {
    this.isPriceError = false;
    this.isPriceSuccess = false;
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    let tableData1 = [];
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    if ((this.preAuctionData?.Status == 'Pending Pricing' || this.preAuctionData?.Status == 'Pending Pricing Approval' || this.preAuctionData?.Status == 'Rejected Prices') && this.preAuctionData?.Status != 'Pending to Publish') {
      tableData1 = this.PaginationServc.sortAllTableData(this.preAuctionData?.listtoproductnav?.results, (this.columnLst2[columnId]));
    } else {
      tableData1 = this.PaginationServc.sortAllTableData(this.preAuctionData?.listtoproductnav?.results, (this.columnLst1[columnId]));
      this.preAuctionData.listtoproductnav.results = tableData1
    }
  }

  isSorting(columnId: number) {
    return this.PaginationServc.columnId !== columnId;
  }
  isSortAsc(columnId: number) {
    return this.PaginationServc.isSortAsc(columnId);
  }
  isSorDesc(columnId: number) {
    return this.PaginationServc.isSortDesc(columnId);
  }

  sortByAuctionAttachTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('auctionAttachment', columnId, sortType, dateFormat);
  }


}
