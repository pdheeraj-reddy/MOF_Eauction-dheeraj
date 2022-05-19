import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { AuctionBasicMaster } from 'src/app/model/auction.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from 'src/app/service/auction.service';
import { subscribeOn } from 'rxjs/operators';
import { Moment } from 'moment-mini';
import * as moment from 'moment-mini';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailPopupComponent } from './product-detail-popup/product-detail-popup.component';

@Component({
  selector: 'app-auction-order-summary',
  templateUrl: './auction-order-summary.component.html',
  styleUrls: ['./auction-order-summary.component.scss'],
})
export class AuctionOrderSummaryComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  @Input() activeStep: number;
  @Input() ObjectId: string;
  @Input() DraftId: string;
  @Input() ViewMode: string;
  @Input() auctionStatus: String;
  @Output() changeSteps = new EventEmitter<number>();
  //variables
  title = 'Auction Details';
  maxChars = 250;
  submitted = false;
  // Dropdown Values
  dropValBeneCategories: any = [
    'category 1',
    'category 2',
    'category 3',
    'category 4',
  ];
  // Form controls
  productsFormGroup: FormGroup;
  addFormGroup: FormGroup;
  order: string = '';
  totalQty: number = 0;
  totalValue: number = 0;
  // Objects
  auctionDetails: any;
  auctionProducts: any[] = [];
  arrayofobject = [];
  auctionAttachement: any[] = [];

  showViewAttachmentsModal: boolean = false;
  showLoader: boolean = false;
  forEdit: boolean = false;
  forProduct: boolean = false;
  showSuccessfulModal: boolean = false;
  pageRangeForProductAttach: any;
  selectedFileFormat: any;
  selectedFileURL: any;

  // Form controls
  basicFormGroup: FormGroup;
  testFormGroup: FormGroup;
  // Objects
  auctionDetailsResp: any;
  auctionItem: AuctionBasicMaster = new AuctionBasicMaster();
  auctionDetailsSubscription$: Subscription;
  viewproduct: any;
  slidesStore: any = [];
  globalProductData: any = [];
  temp: any = [];
  temp1: any = [];
  imageCount = 0;
  receivedCount = 0;

  constructor(
    public PaginationServc: PaginationSortingService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public auctionServc: AuctionService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.ObjectId || this.DraftId) {
      console.log('edit');
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    } else {
      console.log('new');
    }
  }
  getAuctionDetails(ObjectId: string, DraftId: string) {
    this.showLoader = true;
    this.auctionDetailsSubscription$ = this.auctionServc
      .getAuctionDetails(ObjectId, DraftId)
      .subscribe(
        async (auctionDetailsResp: any) => {
          console.log('getAuctionDetails Resp ', auctionDetailsResp);
          this.auctionDetailsResp = auctionDetailsResp.d.results[0];
          this.auctionItem = await this.mappingObjForEdit(auctionDetailsResp);
          this.auctionDetails = auctionDetailsResp.d.results[0];
          await this.mappingObjForProducts(auctionDetailsResp.d.results[0]);
          console.log('YY', this.auctionItem);
          // Load until data loads then slowly load images
          this.showLoader = false;

          // If it has to load until the image loads
          // console.log(this.forEdit , this.forProduct);
          // if(this.forEdit && this.forProduct){
          //   this.showLoader = false;
          // }
        },
        (error) => {
          this.showLoader = false;
          console.log('getAuctionDetails RespError : ', error);
        }
      );
  }

  public getAuctionTypeDesc(type: string) {
    if (type === 'O') {
      return 'Public';
    } else if (type === 'C') {
      return 'Private';
    } else {
      return '';
    }
  }

  public getAuctionSubTypeDesc(type: string) {
    if (type === 'D') {
      return 'Direct';
    } else if (type === 'C') {
      return 'Closed';
    } else {
      return '';
    }
  }

  public getStartAuctionDesc(type: string) {
    if (type === 'T') {
      return 'To me';
    } else if (type === 'M') {
      return 'Manual';
    } else {
      return '';
    }
  }

  // sorting
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId(
      'inventoryAllocationTable',
      columnId,
      sortType,
      dateFormat
    );
  }

  public async mappingObjForEdit(serverObj: any) {
    this.auctionItem.auctionId = serverObj.d.results[0].ObjectId;
    this.auctionItem.auctionType = this.getAuctionTypeDesc(
      serverObj.d.results[0].BidType
    );
    this.auctionItem.auctionSubType = this.getAuctionSubTypeDesc(
      serverObj.d.results[0].ZzCloseInd
    );
    this.auctionItem.prevRefNo = serverObj.d.results[0].ZzPrevAucId1;
    this.auctionItem.auctionName = serverObj.d.results[0].Description;
    this.auctionItem.auctionProduct = serverObj.d.results[0].ZzAucProduct;
    this.auctionItem.entityNo = serverObj.d.results[0].ZzAgencyId;
    this.auctionItem.entityName = serverObj.d.results[0].ZzAgencyName;
    this.auctionItem.auctionDesc = serverObj.d.results[0].ZzAucDesc;
    // this.auctionItem.reasonPrivateAuction = serverObj.d.results[0].Description;
    // this.auctionItem.reason = serverObj.d.results[0].Description;
    this.auctionItem.auctionStartDate = serverObj.d.results[0].ZzAucSrtDt
      ? serverObj.d.results[0].ZzAucSrtDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucSrtDt.split(' ')[0],
          'DD.MM.YYYY'
        ).format('YYYY-MM-DD')
        : ''
      : '';
    this.auctionItem.auctionStartTime = serverObj.d.results[0].ZzAucSrtDt
      ? serverObj.d.results[0].ZzAucSrtDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucSrtDt.split(' ')[1],
          'HH:mm:ss'
        ).format('hh:mm')
        : ''
      : '';
    this.auctionItem.auctionStartTimeSufix = serverObj.d.results[0].ZzAucSrtDt
      ? serverObj.d.results[0].ZzAucSrtDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucSrtDt.split(' ')[1],
          'HH:mm:ss'
        ).format('A')
        : ''
      : '';
    this.auctionItem.auctionEndDate = serverObj.d.results[0].ZzAucEndDt
      ? serverObj.d.results[0].ZzAucEndDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucEndDt.split(' ')[0],
          'DD.MM.YYYY'
        ).format('YYYY-MM-DD')
        : ''
      : '';
    this.auctionItem.auctionEndTime = serverObj.d.results[0].ZzAucEndDt
      ? serverObj.d.results[0].ZzAucEndDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucEndDt.split(' ')[1],
          'HH:mm:ss'
        ).format('hh:mm')
        : ''
      : '';
    this.auctionItem.auctionEndTimeSufix = serverObj.d.results[0].ZzAucEndDt
      ? serverObj.d.results[0].ZzAucEndDt !== 0
        ? moment(
          serverObj.d.results[0].ZzAucEndDt.split(' ')[1],
          'HH:mm:ss'
        ).format('A')
        : ''
      : '';

    this.auctionItem.startAuction = this.getStartAuctionDesc(
      serverObj.d.results[0].ZzStartMethod
    );
    this.auctionItem.auctionAnncStartDate = serverObj.d.results[0].ZzAnncSrtD
      ? moment(serverObj.d.results[0].ZzAnncSrtD, 'DD.MM.YYYY').format(
        'YYYY-MM-DD'
      )
      : '';
    this.auctionItem.auctionAnncEndDate = serverObj.d.results[0].ZzAnncEndD
      ? moment(serverObj.d.results[0].ZzAnncEndD, 'DD.MM.YYYY').format(
        'YYYY-MM-DD'
      )
      : '';
    this.auctionItem.startPrice = serverObj.d.results[0].ZzBidSrtPrice;
    this.auctionItem.lowBidValue = serverObj.d.results[0].ZzLowBidVl;
    this.auctionItem.gnteePercentage = serverObj.d.results[0].ZzIbgaPercent;
    this.auctionItem.finalGntee = serverObj.d.results[0].ZzFbgaDeadline;
    // this.auctionItem.finalGnteeUnit = serverObj.d.results[0].Description;
    this.auctionItem.commissionType = serverObj.d.results[0].ZzCommisionTyp;
    this.auctionItem.pursuitPerCommission =
      serverObj.d.results[0].ZzCommPercent;

    // if(serverObj.d.results[0].listtoattachnav['results']){
    //   this.temp = [];
    //   console.log("att data form API" ,  serverObj.d.results[0].listtoattachnav['results']);
    //   var productImagesArray = this.auctionDetails.listtoattachnav['results'].filter(function (el: any) {
    //     return el.ObjectType == "/AuctionProductImages" &&
    //     el.ZzProductNo.trim() == serverObj.d.results[0].ZzProductNo.trim();
    //   });
    //   var productFilesArray = this.auctionDetails.listtoattachnav['results'].filter(function (el: any) {
    //     return el.ObjectType == "/AuctionProductDocuments" &&
    //     el.ZzProductNo.trim() == serverObj.d.results[0].ZzProductNo.trim();
    //   });
    //   if(productImagesArray.length > 0){
    //     productImagesArray.forEach(
    //       (value: any, index: any, array: any) => {
    //           console.log(index, 'attachment index');
    //           var fileupload = {
    //             name: value.FileName + '.' + value.FileExt,
    //             size: '',
    //             type: '',
    //             filesrc: '',
    //             FilenetId: value.FilenetId,
    //             MIMEType: value.MIMEType,
    //           };
    //           this.auctionServc
    //             .downloadAuctionImages(fileupload.FilenetId)
    //             .subscribe(
    //               async (downloadAuctionImagesResp: any) => {
    //                 const fileResp = downloadAuctionImagesResp.d;
    //                 var byteString = atob(
    //                   atob(fileResp.FileContent).split(',')[1]
    //                 );
    //                 var ab = new ArrayBuffer(byteString.length);
    //                 var ia = new Uint8Array(ab);
    //                 for (var i = 0; i < byteString.length; i++) {
    //                   ia[i] = byteString.charCodeAt(i);
    //                 }
    //                 const blob = new Blob([ab], { type: fileupload.MIMEType });
    //                 // var a = window.URL.createObjectURL(blob);
    //                 var base64String = await this.convertBlobToBase64(blob);
    //                 console.log("base64String in mapping for edit",base64String);

    //                 this.temp.push({
    //                   id: index + 1,
    //                   src: base64String,
    //                   alt: 'test',
    //                   title: 'hello world',
    //                 });
    //                 this.showLoader=false;

    //                 if (
    //                   index + 1 ==
    //                   serverObj.d.results[0].listtoattachnav['results'].length
    //                 ) {
    //                   this.globalProductData = this.temp;
    //                 }
    //                 // console.log('Base64 String - ', base64String);
    //                 this.auctionItem.productAttachment.push(fileupload);
    //                 //  window.open(fileURL, '_blank');
    //                 // window.open(fileContent, "_blank");
    //               },
    //               (error) => {
    //                 this.showLoader = false;
    //                 console.log('downloadAuctionImages RespError : ', error);
    //               }
    //             );

    //       }
    //     );
    //   }else{
    //     this.showLoader=false;
    //   }
    //   if(productFilesArray.length > 0){
    //     productFilesArray.forEach(
    //       (value: any, index: any, array: any) => {
    //           // console.log(value, 'auction doc');
    //           var fileupload = {
    //             name: value.FileName + '.' + value.FileExt,
    //             size: '',
    //             type: '',
    //             filesrc: '',
    //             FilenetId: value.FilenetId,
    //             MIMEType: value.MIMEType,
    //           };
    //           this.auctionItem.auctionAttachement.push(fileupload);
    //       }
    //     );
    //   }else{
    //     this.showLoader = false;
    //   }
    // }
    const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
    if (serverObj.d.results[0].listtoattachnav['results']) {
      this.temp = [];
      console.log("att data form API", serverObj.d.results[0].listtoattachnav['results']);
      let attachments = serverObj.d.results[0].listtoattachnav['results'];
      // forEach(
        for (let index = 0; index < attachments.length; index++)
        // async (value: any, index: any, array: any) => 
        {
          let value = attachments[index];
          if (value.ObjectType == '/AuctionDocuments') {
            var fileupload = {
              name: value.FileName + '.' + value.FileExt,
              size: '',
              type: '',
              filesrc: '',
              FilenetId: value.FilenetId,
              MIMEType: value.MIMEType,
            };
            this.auctionItem.auctionAttachement.push(fileupload);
          }
          if (value.ObjectType == '/AuctionProductImages') {
            console.log(index, 'attachment index');
            this.imageCount++;
            let fileupload = {
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
                  
                  let filenetId = fileupload.FilenetId;
                  console.log(filenetId, "FILENETID")
                  const fileResp = downloadAuctionImagesResp.d;
                  // console.log(fileResp.FileContent);
                  this.receivedCount++;
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
                  console.log("base64String in mapping for edit");
                  console.log(this.imageCount)
                  console.log(this.receivedCount)
                  if(this.imageCount == this.receivedCount){
                    // this.showLoader=false;
                  }

                  this.temp.push({
                    id: index + 1,
                    src: base64String,
                    alt: 'test',
                    title: 'hello world',
                    filenetId: filenetId
                  });
                  // To load until the images load
                  // this.showLoader=false;

                  // var reader = new FileReader();
                  // reader.readAsDataURL(blob);
                  // var base64String = (reader.onloadend = function () {
                  //   var base64String = reader.result;
                  //   return base64String;
                  // });

                  if (
                    index + 1 ==
                    serverObj.d.results[0].listtoattachnav['results'].length
                  ) {
                    this.globalProductData = this.temp;
                    // this.addData(this.temp);
                  }
                  // console.log('Base64 String - ', base64String);
                  this.auctionItem.productAttachment.push(fileupload);
                  //  window.open(fileURL, '_blank');
                  // window.open(fileContent, "_blank");
                },
                (error) => {
                  this.showLoader = false;
                  console.log('downloadAuctionImages RespError : ', error);
                }
              );
            await timer(3000);
          }
          
          
        }
      // );
    }
    
    // console.log('hari', this.auctionItem.productAttachment);

    // serverObj.d.results[0].listtoattachnav['results'].forEach((value:any,index:any,array:any) => {
    //     this.auctionItem.auctionAttachement.push(new FormControl(value));
    // })
    return this.auctionItem;
  }

  addData(temp: any) {
    console.log('Hari');
    this.slidesStore = temp;
    console.log(this.slidesStore);
    const dialogRef = this.dialog.open(ProductDetailPopupComponent, {
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        data: temp,
        viewproduct: this.viewproduct,
      },
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

  public mappingObjForProducts(data: any) {
    console.log('mappingObjForProduct');
    // this.auctionProducts.value.forEach((pItem : any , index : number) => {
    //   this.removeProduct(index-1);
    // });
    // this.productsFormGroup.get('sameLocNDate')?.setValue(false);
    // let sameLocNDateVal = { target : { checked : false } };
    // this.setValidation(sameLocNDateVal);
    let productsArray = data.listtoproductnav.results;
    console.log('productsArray ', productsArray);
    productsArray.forEach((pItem: any) => {
      let productImages: any = [], productFiles: any = [];
      if (pItem.ZzProductNo) {
        // if (this.ViewMode == 'view' || this.ViewMode == 'edit' || this.ObjectId) {
        if (this.ViewMode == 'view' || this.ViewMode == 'edit' || this.ViewMode == '') {
          console.log("KAAR")
          if (data.listtoattachnav['results']) {
            var productImagesArray = data.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductImages" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            var productFilesArray = data.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductDocuments" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            console.log(productFilesArray, "PRODUCT FILES");
            console.log(productImagesArray, "PRODUCT IMAGES");
            if (productImagesArray.length > 0) {
              productImagesArray.forEach((value: any) => {
                var imageupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  "no": pItem.ZzProductNo
                };
                productImages.push(imageupload);
                
              });
              console.log(productImages, "Product images")
            }
            if (productFilesArray.length > 0) {
              productFilesArray.forEach((value: any) => {
                var fileupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  "no": pItem.ZzProductNo
                };
                productFiles.push(fileupload);
              });
              console.log(productFiles, "Product files")
            }
          }
        }
      }
      let item = {
        productNo: pItem.ZzProductNo,
        productName: pItem.Description,
        productCondition: pItem.ZzProductCond,
        productSKUNumber: pItem.ZzProductSku,
        productSerialNumber: pItem.Quantity ? pItem.Quantity.split('.')[0] : '',
        productValue: pItem.ProductValue
          ? pItem.ProductValue.split('.')[0]
          : '',
        productSpec: pItem.ZzProdDesc,
        productImages: productImages,
        productFiles: productFiles,
        location: {
          deliveryDate: pItem.DelivDate
            ? moment(pItem.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
            : '',
          deliveryTime: pItem.DelivTime
            ? pItem.DelivTime !== 0
              ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm')
              : ''
            : '',
          deliveryTimeSufix: pItem.DelivTime
            ? pItem.DelivTime !== 0
              ? moment(pItem.DelivTime, 'HH:mm:ss').format('A')
              : ''
            : '',
          locLatitude: pItem.ZzLocationCord,
          locLongitude: pItem.ZzLocationCord,
          locRegion: pItem.ZzRegion,
          locCity: pItem.ZzCity,
          locNeighborhood: pItem.ZzNeighbourhood,
          locStreet: pItem.ZzStreet,
          notes: pItem.ZzPdOthrNts,
        },
      };
      this.auctionProducts.push(item);
      console.log(this.auctionProducts)
    });
    this.totalValue = 0;
    this.totalQty = 0;
    this.auctionProducts.forEach((product: any) => {
      this.totalValue =
        this.totalValue + +product.productValue * +product.productSerialNumber;
      this.totalQty = this.totalQty + +product.productSerialNumber;
    });
    this.navigateToPage(1, 'productAttach');

    // const serverObjResults = this.auctionDetails;
    // this.productItem.sameLocNDate = serverObjResults.SameAddress;

    // this.productItem.location.deliveryDate = serverObjResults.DelivDate;
    // this.productItem.location.deliveryTime = serverObjResults.DelivTime;
    // this.productItem.location.locLatitude = serverObjResults.ZzLocationCord;
    // this.productItem.location.locLongitude = serverObjResults.ZzLocationCord;
    // this.productItem.location.locRegion = serverObjResults.ZzRegion;
    // this.productItem.location.locCity = serverObjResults.ZzCity;
    // this.productItem.location.locNeighborhood = serverObjResults.ZzNeighbourhood;
    // this.productItem.location.locStreet = serverObjResults.ZzStreet;
    // this.productItem.location.notes = serverObjResults.ZzPdOthrNts;

    // productName: String;
    // productCondition: String;
    // productSKUNumber: String;
    // productSerialNumber: String;
    // productValue: String;
    // productSpec: String;
    // productImages: [];
    // return this.productItem;
    this.forProduct = true;
  }

  public viewProduct(code: any) {
    this.temp1 = [];
    this.viewproduct = code;
    console.log(code);
    console.log(this.temp)

    this.temp.forEach(
      (index: any) => {
        code.productImages.forEach(
          (index0 : any) => {
            if(index.filenetId == index0.FilenetId){
              this.temp1.push(index);
            }
          }
        )
      }
    )
    console.log(this.temp1)

    const dialogRef = this.dialog.open(ProductDetailPopupComponent, {
      disableClose: true,
      height: '90%',
      width: '90%',
      position: {
        left: '10%',
      },
      data: {
        data: this.temp1,
        viewproduct: code,
      },
    });
  }

  public generateAuctionDetailFormat(obj: any) {
    console.log('generateAuctionDetailFormat ', obj);
    let auctionList = obj;
    auctionList.SaveAsDraft = '';
    auctionList.ObjectId = obj.ObjectId.includes('DR') ? '' : obj.ObjectId;
    return auctionList;
  }

  public onSubmit() {
    this.submitted = true;
    this.showLoader = true;
    const auctiondetail = this.generateAuctionDetailFormat(
      this.auctionDetailsResp
    );
    console.log('auctiondetail final format ', auctiondetail);
    this.auctionServc.createAuction(auctiondetail).subscribe(
      (auctionDetailsResp: any) => {
        console.log('createAuction Resp ', auctionDetailsResp);
        // alert('Auction is Saved Successfully');
        this.showLoader = false;
        this.showSuccessfulModal = true;
      },
      (error) => {
        this.showLoader = false;
        console.log('createAuction RespError : ', error);
      }
    );
  }

  navigateToPage(pageNoVal: number, section: string) {
    if (section == 'productAttach') {
      this.PaginationServc.setPagerValues(
        this.auctionProducts.length,
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

  public back() {
    this.activeStep--;
    this.changeSteps.emit(this.activeStep);
  }

  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    }
  }

  viewAttachmentTemp(file: any) {
    this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
      (downloadAuctionImagesResp: any) => {
        console.log(downloadAuctionImagesResp);
        const fileResp = downloadAuctionImagesResp.d;
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        console.log('asdasd', byteString.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: file.MIMEType });
        console.log(blob);
        let fileURL = window.URL.createObjectURL(blob);
        console.log('fileURL', fileURL);
        this.showViewAttachmentsModal = false;
        return fileURL;
        //  window.open(fileURL, '_blank');
        // window.open(fileContent, "_blank");
      },
      (error) => {
        this.showLoader = false;
        console.log('downloadAuctionImages RespError : ', error);
      }
    );
  }

  activeDownloadFileIndex = -1

  viewAttachment(file: any, index:number) {
    if (file.FilenetId) {
      this.activeDownloadFileIndex = index;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
        (downloadAuctionImagesResp: any) => {
          console.log(downloadAuctionImagesResp);
          const fileResp = downloadAuctionImagesResp.d;
          var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
          console.log('asdasd', byteString.split(',')[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: file.MIMEType });
          console.log(blob);
          let fileURL = window.URL.createObjectURL(blob);
          console.log('fileURL', fileURL);
          this.showViewAttachmentsModal = false;
          var newWin = window.open(fileURL, '_blank');
          if(!newWin || newWin.closed || typeof newWin.closed=='undefined') 
          {
              alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
          }
          this.activeDownloadFileIndex = -1;
          // window.open(fileContent, "_blank");
        },
        (error) => {
          this.showLoader = false;
          this.activeDownloadFileIndex = -1;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
    } else {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      // var reader = new FileReader();
      // reader.readAsDataURL(file.filesrc['0']);
      var byteString = atob(file.filesrc['0'].split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: file.type });

      console.log('fileURL', blob);
      let fileURL = window.URL.createObjectURL(blob);
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        this.showViewAttachmentsModal = false;
        console.log('fileURL', fileURL);
        window.open(fileURL, '_blank');
      } else {
        if (file.type.indexOf('image') > -1) {
          this.selectedFileFormat = 'image';
        } else if (file.type.indexOf('video') > -1) {
          this.selectedFileFormat = 'video';
        }
        this.selectedFileURL = file.filesrc['0'].split(',')[1];
        // reader.onload = (_event) => {
        //   this.selectedFileURL = reader.result;
        // }
        this.showViewAttachmentsModal = true;
      }
    }
  }
}
