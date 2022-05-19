import { Component, Input, OnInit } from '@angular/core';
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
  loggedUserRole: any;
  confirmPublish = false;
  confirmApproval =false;
  confirmRejection = false;
  maxLen = 250;
  pdtEstPricePc: any;
  temp: any = [];
  auctionProducts: any[] = [];
  inputMode: boolean = true;
  showAdjustPriceOption: boolean = false;
  invalidQty: boolean = false;
  showError: boolean = false;
  indexError = -1;

  estimatedValueOfProducts: any;
  selectedPageNumber: number;
  p: number = 1;
  pageRangeForProductAttach: any;

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
  rejectionNotes: any ='';
  constructor(
    public PaginationServc: PaginationSortingService,
    private _AuctionService: AuctionModeratorService,
   private _AuctionHeadDetailPage :AuctionHeadDetailPageComponent,
   public auctionServc: AuctionService,
   private interconversionService: InterconversionService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  editPrice(index: any, product: any) {
    console.log("Click");
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
        console.log(parseInt(temp[i]?.ZzPdtEstPricePc));
        this.productValue =
          this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc);
      }
    });
  }


  editPriceInPopup(index: any, product: any) {
    console.log("saurabh", product)
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      disableClose: true,
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        data: this.temp,
        viewproduct: this.auctionProducts[index],
        index: index,
        productDetails: product,
        isBidUpdate: this.isBidUpdate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.isBidUpdate) {
        console.log(result);
        // this.adjustProductPrice();
        this.preAuctionData['listtoproductnav']['results'][result?.index][
          'ZzPdtEstPricePc'
        ] = result.price;
        let temp = this.preAuctionData['listtoproductnav']['results'];
        console.log(temp);
        this.productValue = 0;
        for (let i = 0; i < temp.length; i++) {
          console.log(parseInt(temp[i]?.ZzPdtEstPricePc));
          this.productValue =
            this.productValue + parseInt(temp[i]?.ZzPdtEstPricePc) * temp[i].Quantity;
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
    dialogRef.afterClosed().subscribe((result) => {});
  }

  hideSuccessfulModal(){
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
    console.log('this.loggedUserRole ➼ ', this.loggedUserRole);
    if(this.preAuctionData){

      if (this.preAuctionData.ZzPbEstPricePc != undefined) {
        this.productValue = parseFloat(this.preAuctionData.ZzPbEstPricePc);
        console.log(
          '*******',
          this.preAuctionData.ZzPbEstPricePc,
          this.productValue
        );
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
      if(this.inputMode){
        this.pdtEstPricePc = parseFloat(this.preAuctionData.ZzPbEstPricePc);
        this.productValue = this.pdtEstPricePc;
      }
      this.auctionProducts = this.interconversionService.mappingObjForProducts(this.preAuctionData);
      if (this.preAuctionData?.listtoattachnav['results']) {
        this.temp = [];
        console.log("att data form API", this.preAuctionData?.listtoattachnav['results']);
        this.preAuctionData?.listtoattachnav['results'].forEach(
          (value: any, index: any, array: any) => {
            if (value.ObjectType == '/AuctionProductImages') {
              console.log(index, 'attachment index');
              var fileupload = {
                name: value.FileName + '.' + value.FileExt,
                size: '',
                type: '',
                filesrc: '',
                FilenetId: value.FilenetId,
                MIMEType: value.MIMEType,
              };
              this.auctionServc
                .downloadAuctionImages(fileupload.FilenetId)
                .subscribe(
                  async (downloadAuctionImagesResp: any) => {
                    const fileResp = downloadAuctionImagesResp.d;
                    var byteString = atob(
                      atob(fileResp.FileContent).split(',')[1]
                    );
                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < byteString.length; i++) {
                      ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ab], { type: fileupload.MIMEType });
                    // var a = window.URL.createObjectURL(blob);
                    var base64String = await this.convertBlobToBase64(blob);
                    console.log("base64String in mapping for edit", base64String);

                    this.temp.push({
                      id: index + 1,
                      src: base64String,
                      alt: 'test',
                      title: 'hello world',
                    });
                    if (
                      index + 1 ==
                      this.preAuctionData?.listtoattachnav['results'].length
                    ) {
                    }
                  },
                  (error) => {
                    console.log('downloadAuctionImages RespError : ', error);
                  }
                );
            }
          }
        );
      }
    }
    if(this.loggedUserRole.isPricingHead){
      this.showAdjustPriceOption = false;
    } else if(this.loggedUserRole.isPricingMember){
      this.showAdjustPriceOption = true;
    }
  }

  selection(value: any) {
    if (!value) this.isBidUpdate = true;
    else this.isBidUpdate = false;this.pdtEstPricePc=0;
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
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }
  adjustPrice() {
    this.showAdjustPriceOption = !this.showAdjustPriceOption;
  }


  // adjustTotalPriceAuction(action: any) {
  //   this.preAuctionData.ActionTaken = action;
  //   console.log(this.preAuctionData);
  //   this._AuctionService
  //     .approveOrRejectAuction({
  //       ObjectId: this.preAuctionData.ObjectId,
  //       Description: this.preAuctionData.Description,
  //       Status: 'Pending Pricing',
  //       ZzPbEstPricePc: this.totalBidValue.toString(),
  //       ZzEstOpt: 'A',
  //       UserId: '1622234795',
  //       listtoproductnav: [],
  //     })
  //     .subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.getPreAuctionData();
  //       },
  //       (error) => {
  //         console.log('approveOrRejectAuction RespError : ', error);
  //       }
  //     );
  // }

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

  openAdjustPriceOption(index: number){
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any, pindex: number) => {
      if(pindex == index){
        product.show = true;
      } else {
        product.show = false;
      }
      this.pdtEstPricePc +=  product.ZzPdtEstPricePc * product.Quantity.split('.')[0];
    });
  }

  adjustProductPrice(){
    this.pdtEstPricePc = 0.00;
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
      console.log(product);
      product.show = false;
      this.pdtEstPricePc += product.ZzPdtEstPricePc * product.Quantity.split('.')[0];
    });
    this.productValue = parseFloat(this.pdtEstPricePc as string);
    // this.preAuctionData?.listtoproductnav?.results?[index]?.ZzPdtEstPricePc = 'asdf' ;
  }
  adjustProductPriceInEdit(){
    this.pdtEstPricePc = 0.00;
    let product = this.preAuctionData?.listtoproductnav?.results;
    for(let i=0;i<product.length;i++){
      console.log(product[i]);
      product[i].show = false;
      if(product[i].ZzPdtEstPricePc<1){
        this.indexError = i;
        this.showError = true;
        break;
      }else{
        this.indexError = -1;
        this.showError = false;
      }
      this.pdtEstPricePc += product[i].ZzPdtEstPricePc * product[i].Quantity.split('.')[0];

    }
    // this.preAuctionData?.listtoproductnav?.results.forEach((product:any, index:number) => {
    //   console.log(product);
    //   product.show = false;
    //   this.pdtEstPricePc += product.ZzPdtEstPricePc * product.Quantity.split('.')[0];
    //   if(product.ZzPdtEstPricePc<1){
    //     this.indexError = index;
    //     console.log(this.indexError);
    //     this.showError = true;
    //   }else{
    //     this.indexError = -1;
    //     this.showError = false;
    //   }
    // });
    this.productValue = parseFloat(this.pdtEstPricePc as string);
    // this.preAuctionData?.listtoproductnav?.results?[index]?.ZzPdtEstPricePc = 'asdf' ;
  }

  adjustTotalPrice(){
    this.preAuctionData?.listtoproductnav?.results.forEach((product: any) => {
      product.ZzPdtEstPricePc = "0.00";
    });
    if(this.pdtEstPricePc < 1){
      this.invalidQty = true;
    }
    else{
      this.invalidQty = false;
      
      this.productValue = parseFloat(this.pdtEstPricePc as string);
    }
    // this.preAuctionData?.listtoproductnav?.results?[index]?.ZzPdtEstPricePc = 'asdf' ;
      // this.productValue = parseFloat(this.pdtEstPricePc as string);

  }

  approveOrRejectAuction(action: any, status: any) {
    let adjustedPriceData : any = {};
    this.preAuctionData.Status = status;
    this.preAuctionData.ActionTaken = action;
    this.preAuctionData.ZzEstOpt = !this.isBidUpdate ? 'A' : 'I';
    this.preAuctionData.ZzPbEstPricePc = this.productValue.toString();
    this.preAuctionData.UserId = '1622234795';
    console.log(this.preAuctionData);
    adjustedPriceData = this.preAuctionData;
    adjustedPriceData?.listtoproductnav?.results.forEach((product: any)=>{
      delete product.show;
    });
    this._AuctionService.approveOrRejectAuction(adjustedPriceData).subscribe(
      (res: any) => {
        if(status == 'Pending Pricing'){
          this.confirmPublish = true;
        }
        if(status == 'Pending Pricing Approval'){
          this.confirmApproval = true;
        }
        if(status == 'Rejected Prices'){
          this.confirmRejection = true;
        }

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
