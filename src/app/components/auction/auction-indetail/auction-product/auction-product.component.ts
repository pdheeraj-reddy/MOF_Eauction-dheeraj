import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionBasicMaster, AuctionProductMaster, AuctionProduct } from "src/app/model/auction.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuctionService } from "src/app/service/auction.service";
import { Moment } from 'moment-mini';
import moment from 'moment-mini';
declare var $: any;

@Component({
  selector: 'app-auction-product',
  templateUrl: './auction-product.component.html',
  styleUrls: ['./auction-product.component.scss']
})
export class AuctionProductComponent implements OnInit {
  @Input() activeStep: number;
  @Input() ObjectId: string;
  @Input() DraftId: string;
  @Input() ViewMode: string;
  @Output() changeSteps = new EventEmitter<number>();
  // AUCTION edit start
  @Input() auctionStatus: String;
  @Input() statusOfAuction: string;
  @Output() productCreateResp = new EventEmitter<any>();
  @Output() changeauctiontype = new EventEmitter<string>();
  // AUCTION edit end
  //variables
  lang: string;
  title = 'Auction Product';
  sCount = 1;
  maxChars = 250;
  submitted = false;
  onAddProductSubmitted = false;
  isSameaddress: boolean = false;
  // Dropdown Values
  dropValBeneCategories: any = ['New', 'Refurbished', 'Good Usage', 'Bad Usage', 'Average Usage'];
  // Form controls
  productsFormGroup: FormGroup;
  addFormGroup: FormGroup;
  order: string = '';
  totalQty: number = 0;
  totalValue: number = 0;
  activePictureIndex = -1;
  activeFileIndex = -1;
  columnLst = ['productName', 'productSerialNumber', 'productValue', 'productCondition'];
  columnPicList = ['index', 'name'];
  columnFileList = ['index', 'name'];
  // ------- product file attachment --------
  // ------- file validation         --------
  maxFileCount: Number = 30;
  acceptedImagesExtensions = ['mp4', 'mov', 'png', 'jpg', 'jpeg'];
  acceptedFilesExtensions = ['docx', 'doc', 'pdf'];
  @ViewChild('myModalClose') modalClose: any;
  msg: String = '';
  selectedFiles: File[];
  files: any[] = [];
  selectedFileFormat: any;
  selectedFileURL: any;
  selectedDocs: File[];
  docs: any[] = [];
  selectedDocFormat: any;
  selectedDocURL: any;
  showViewAttachmentsModal: boolean = false;
  showSuccessfulModal: boolean = false;
  showProductModal: boolean = false;
  invalidQty: boolean = false;
  isValidDeliveryDate: boolean = false;
  isValidPDeliveryDate: boolean = false;
  isValidDeliveryTime: boolean = false;
  isValidPDeliveryTime: boolean = false;
  invalidImageSize: boolean = false;
  invalidImageType: boolean = false;
  invalidFileSize: boolean = false;
  invalidFileType: boolean = false;
  showDeleteSuccessfulModal: boolean = false;
  // -------------

  //--------------- google map loc ---------
  lat: number;
  lng: number;
  locationChoose = false;
  pageRangeForProductAttach: any;
  pageRangeForProductFileAttach: any;
  pageRangeForProductPictureAttach: any;

  // Objects
  auctionDetails: any;
  productItem: AuctionProductMaster = new AuctionProductMaster();
  productlist: AuctionProduct = new AuctionProduct();
  dropValCategory: any = ['New', 'Refurbished', 'Good Usage', 'Bad Usage', 'Average Usage'];
  showLoader: boolean = false;
  showPopupLoader: boolean = false;
  showSaveBtnLoader: boolean = false;
  showSaveasdraftBtnLoader: boolean = false;
  auctionDetailsSubscription$: Subscription;
  atLeastOneRequired: boolean = false;
  showConfirmCancelModal: boolean = false;
  showCancelSuccessfulModal: boolean = false;
  showGoogleMap: boolean = false;
  showAlertModal: boolean = false;

  constructor(
    public PaginationServc: PaginationSortingService,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    public auctionServc: AuctionService,
    public translate: TranslateService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.refreshCalendarCntrl();
    });
    this.pageRefresh();
  }


  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    let selectedDate = '';
    const todayDate = moment().format('YYYY-MM-DD');
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip(({ delay: { hide: 800 } }));
      $("#deliveryDate").unbind().removeData();
      $("#deliveryTime").unbind().removeData();
      $("#deliveryDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        minDate: todayDate,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });

      var deliveryTime = $("#deliveryTime").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "hh:mm A",
        showSwitcher: false,
        showTodayButton: false,
        icons: {
          up: 'icon-arrow-up text-normal',
          down: 'icon-arrow-down text-normal',
        },
      });

      $("#deliveryDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#deliveryDate");
        e?.dispatchEvent(v);
      });
      $("#deliveryTime").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#deliveryTime");
        e?.dispatchEvent(v);
      });

    }, 100);
  }

  pageRefresh() {
    this.closeProductModal('close');
    this.createForm();
    this.addProductForm();
    if (this.ViewMode == 'edit' || this.ViewMode == 'view') {
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    } else {
      if (this.ObjectId || this.DraftId) {
        this.getAuctionDetails(this.ObjectId, this.DraftId);
      }
    }
    if (this.ViewMode == 'view') {
      this.productsFormGroup.disable();
    }
  }

  addDaysWRONG(date: any, days: number) {
    var result = new Date();
    result.setDate(date.getDate() + days);
    return result;
  }



  onQuantityChange = (inc: boolean) => {
    let quantity = this.addFormGroup.get('productSerialNumber')?.value || 0
    if (inc) {
      quantity++;
    } else {
      quantity--;
    }
    if (quantity < 2) {
      quantity = 1;
    }
    this.addFormGroup.get('productSerialNumber')?.setValue(quantity);
    this.onChangeQuantity();
  }

  onChangeQuantity() {
    if (this.addFormGroup.get('productSerialNumber')?.value < 1) {
      this.invalidQty = true;
    } else {
      this.invalidQty = false;
    }
  }

  getAuctionDetails(ObjectId: string, DraftId: string) {
    this.showLoader = true;
    // let auctionDetailsResp = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000283',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000283',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 11.10.2021 12:31","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"24.02.2022","ZzPrevAucId3":"","ZzAucDesc":"","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000283","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"X","ZzCommisionTyp":"","PsEmdAmnt":"200.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"results":[{"Description":"Trip Form","DispUrl":"http://ry1drvemksr1.mof.gov.sa:8000/sap/ebp/docserver/2200%20%2D%20T0000000005.pdf?phioget&KpId=0050569725271EEC8F8EF7DD5352AE47&KpClass=BBP_P_DOC&sap-client=100","PhioExt":"pdf","PhioMime":"application/pdf","SL_NO":"1 ","ObjectId":"","PhioFname":"2200 - T0000000005.pdf","UserId":"SRMLAUSR","ProductId":""}]},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000283',UserId='')/listtobiddernav"}},"listtoproductnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/ProductItemSet(ProductId='1',ObjectId='9700000283',UserId='SRMLAUSR')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/ProductItemSet(ProductId='1',ObjectId='9700000283',UserId='SRMLAUSR')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.ProductItem"},"ZzProdDesc":"","DelivTime":"000000","ProductValue":"0.00 ","ZzProductCond":"","Currency":"SAR","Description":"MS Office 365-cloud based(Pro-Plus)","ZzProductSku":"","ZzLocationCord":"","ProductId":"1","ZzRegion":"","CategoryId":"01001","ZzCity":"","Quantity":"100.000 ","ZzNeighbourhood":"","ObjectId":"9700000283","Unit":"EA","ZzStreet":"","Price":"0.00 ","UserId":"SRMLAUSR","ZzPdOthrNts":"","DelivDate":"30.10.2021"}]},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000283',UserId='')/listtocomiteememnav"}}}]}};
    this.auctionServc.getAuctionDetails(ObjectId, DraftId).subscribe((auctionDetailsResp: any) => {
      console.log('getAuctionDetails Resp ', auctionDetailsResp.body);
      this.auctionServc.XCSRFToken = auctionDetailsResp.headers.get('x-csrf-token');
      this.auctionDetails = auctionDetailsResp.body.d.results[0];
      if (this.ViewMode == 'edit' || this.ViewMode == 'view' || (this.ObjectId || this.DraftId)) {
        this.mappingObjForEdit();
      }
      // this.refreshCalendarCntrl();
      this.showLoader = false;
      // this.createForm();
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionDetails RespError : ', error);
    });
  }

  public mappingObjForEdit() {
    console.log('mappingObjForEdit ', this.auctionDetails);

    let productsArray = this.auctionDetails.listtoproductnav.results;
    let productImages: any = [], productFiles: any = [];
    productsArray.forEach((pItem: any, index: number) => {



      productImages = [], productFiles = [];
      if (pItem.ZzProductNo) {
        if (this.ViewMode == 'view' || this.ViewMode == 'edit' || (this.ObjectId || this.DraftId)) {
          if (this.auctionDetails.listtoattachnav['results']) {
            var productImagesArray = this.auctionDetails.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductImages" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            var productFilesArray = this.auctionDetails.listtoattachnav['results'].filter(function (el: any) {
              return el.ObjectType == "/AuctionProductDocuments" &&
                el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
            });
            if (productImagesArray.length > 0) {
              // let i = 0;
              productImagesArray.forEach((value: any) => {
                value.name = value.FileName + value.FileExt;
                var imageupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  downloading: false,
                  // index: i,
                };
                // i++;
                productImages.push(new FormControl(imageupload));
              });
            }
            if (productFilesArray.length > 0) {
              // let i = 0;
              productFilesArray.forEach((value: any) => {
                value.name = value.FileName + value.FileExt;
                var fileupload = {
                  "name": value.FileName + '.' + value.FileExt,
                  "size": '',
                  "type": '',
                  "filesrc": '',
                  "FilenetId": value.FilenetId,
                  "MIMEType": value.MIMEType,
                  downloading: false,
                  // index: i,
                };
                // i++;
                productFiles.push(new FormControl(fileupload));
              });
            }
          }
        }
      }
      let item = {
        productNo: pItem.ZzProductNo,
        productName: pItem.Description,
        productCondition: pItem.ZzProductCond,
        productSKUNumber: pItem.ZzProductSku,
        productSerialNumber: pItem.Quantity.split(".")[0],
        productValue: pItem.ProductValue,
        productSpec: pItem.ZzProdDesc,
        productImages: productImages,
        productFiles: productFiles,
        location: {
          deliveryDate: pItem.DelivDate ? moment(pItem.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : '',
          deliveryTime: pItem.DelivTime ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm A') : '',
          // locLatitude: pItem.ZzLocationCord.split(",")[0],
          // locLongitude: pItem.ZzLocationCord.split(",")[1],
          locRegion: pItem.ZzRegion,
          locCity: pItem.ZzCity,
          locNeighborhood: pItem.ZzNeighbourhood,
          locStreet: pItem.ZzStreet,
          notes: pItem.ZzPdOthrNts
        }
      }

      if (this.lang == 'ar') {
        item.location.deliveryTime = item.location.deliveryTime?.split(' ')[1] == 'PM' ? item.location.deliveryTime.replace(item.location.deliveryTime.split(' ')[1], 'م') : item.location.deliveryTime?.split(' ')[1] == 'AM' ? item.location.deliveryTime.replace(item.location.deliveryTime.split(' ')[1], 'ص') : item.location.deliveryTime
      }


      this.addProducts(item);
      if (this.auctionDetails.SameAddress == 'Y') {
        this.productsFormGroup.get('sameLocNDate')?.setValue(true);
        let sameLocNDateVal = { target: { checked: true } };
        this.setValidation(sameLocNDateVal);
        this.productsFormGroup.get('location')?.get('deliveryDate')?.setValue(pItem.DelivDate ? moment(pItem.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : '');

        if (this.lang == 'ar') {
          let delTime = pItem.DelivTime ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm A') : '';

          delTime = delTime?.split(' ')[1] == 'PM' ? delTime.replace(delTime.split(' ')[1], 'م') : delTime?.split(' ')[1] == 'AM' ? delTime.replace(delTime.split(' ')[1], 'ص') : delTime

          this.productsFormGroup.get('location')?.get('deliveryTime')?.setValue(delTime)
        }
        else {
          this.productsFormGroup.get('location')?.get('deliveryTime')?.setValue(pItem.DelivTime ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm A') : '');
        }


        // this.productsFormGroup.get('location')?.get('locLatitude')?.setValue(pItem.ZzLocationCord.split(",")[0]);
        // this.productsFormGroup.get('location')?.get('locLongitude')?.setValue(pItem.ZzLocationCord.split(",")[1]);
        this.productsFormGroup.get('location')?.get('locRegion')?.setValue(pItem.ZzRegion);
        this.productsFormGroup.get('location')?.get('locCity')?.setValue(pItem.ZzCity);
        this.productsFormGroup.get('location')?.get('locNeighborhood')?.setValue(pItem.ZzNeighbourhood);
        this.productsFormGroup.get('location')?.get('locStreet')?.setValue(pItem.ZzStreet);
        this.productsFormGroup.get('location')?.get('notes')?.setValue(pItem.ZzPdOthrNts);
      } else {
        this.productsFormGroup.get('sameLocNDate')?.setValue(false);
        let sameLocNDateVal = { target: { checked: false } };
        this.setValidation(sameLocNDateVal);
      }

    });
    this.totalValue = 0;
    this.totalQty = 0;
    this.auctionProducts.value.forEach((product: any) => {
      this.totalValue = this.totalValue + (+product.productValue * +product.productSerialNumber);
      this.totalQty = this.totalQty + (+product.productSerialNumber);
    });
    if (this.auctionProducts['controls'].length > 0) {
      this.productsFormGroup.controls['sameLocNDate'].disable();
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    }
  }
  // Beneficiary category onchange select
  changeSelect(e: any, dd: string) {
    if (e.target.value != '') {
      this.addFormGroup.controls[dd].setValue(e.target.value, {
        onlySelf: true
      })
    }
  }

  //time on click event
  changedatetime(e: any, dd: string) {
    this.locationForm[dd].setValue(e.target.value);
    if (dd == 'deliveryDate') {
      let startDate = this.auctionDetails.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
      let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
      let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
      let deliveryDate = this.locationForm['deliveryDate'].value;
      let deliveryTime = this.locationForm['deliveryTime'].value;
      if (this.lang == 'ar') {
        endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
        deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
      }
      let aucEndDate = new Date(endDate + " " + endTime);
      let aucDelDate = new Date(deliveryDate + " " + deliveryTime);
      if (endDate && deliveryDate) {
        if ((moment(endDate).isAfter(deliveryDate, 'day'))) {
          this.isValidDeliveryDate = true;
        } else {
          this.isValidDeliveryDate = false;
          if (aucEndDate >= aucDelDate) {
            this.isValidDeliveryTime = true;
          } else {
            this.isValidDeliveryTime = false;
          }
        }
      }
    }
  }

  onChangeDelTime($event: any) {
    let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
    let deliveryDate = this.locationForm['deliveryDate'].value;
    let deliveryTime = this.locationForm['deliveryTime'].value;
    if (this.lang == 'ar') {
      endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
      deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
    }
    let aucEndDate = new Date(endDate + " " + endTime);
    let aucDelDate = new Date(deliveryDate + " " + deliveryTime);

    if (aucEndDate >= aucDelDate) {
      this.isValidDeliveryTime = true;
    } else {
      this.isValidDeliveryTime = false;
    }

  }

  productchangedatetime(e: any, dd: string) {
    this.addproductlocationForm[dd].setValue(e.target.value);
    if (dd == 'deliveryDate') {
      let startDate = this.auctionDetails.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
      let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
      let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
      let deliveryDate = this.addproductlocationForm['deliveryDate'].value;
      let deliveryTime = this.addproductlocationForm['deliveryTime'].value;
      if (this.lang == 'ar') {
        endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
        deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
      }
      let aucEndDate = new Date(endDate + " " + endTime);
      let aucDelDate = new Date(deliveryDate + " " + deliveryTime);



      if (endDate && deliveryDate) {
        if ((moment(endDate).isAfter(deliveryDate, 'day'))) {
          this.isValidPDeliveryDate = true;
          return
        }
        else {
          this.isValidPDeliveryDate = false;
          if (aucEndDate >= aucDelDate) {
            this.isValidPDeliveryTime = true;
          } else {
            this.isValidPDeliveryTime = false;
          }
        }
      }


    }
  }

  onChangePDelTime($event: any) {
    let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
    let deliveryDate = this.addproductlocationForm['deliveryDate'].value;
    let deliveryTime = this.addproductlocationForm['deliveryTime'].value;
    if (this.lang == 'ar') {
      endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
      deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
    }
    let aucEndDate = new Date(endDate + " " + endTime);
    let aucDelDate = new Date(deliveryDate + " " + deliveryTime);
    if (aucEndDate >= aucDelDate) {
      this.isValidPDeliveryTime = true;
    } else {
      this.isValidPDeliveryTime = false;
    }
  }
  //google map location
  onChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoose = true;
    // this.locationForm['locLatitude'].setValue(this.lat);
    // this.locationForm['locLongitude'].setValue(this.lat);
  }

  // <!----------add product event function------------------------>

  //google map location
  onaddProductChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoose = true;
    // this.addproductlocationForm['locLatitude'].setValue(this.lat);
    // this.addproductlocationForm['locLongitude'].setValue(this.lat);
  }

  createForm() {
    this.productsFormGroup = this.formBuilder.group({
      sameLocNDate: new FormControl(this.productItem.sameLocNDate ? this.productItem.sameLocNDate : false, Validators.required),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(this.productItem.location?.deliveryDate ? this.productItem.location.deliveryDate : '', Validators.required),
        deliveryTime: new FormControl(this.productItem.location?.deliveryTime ? this.productItem.location.deliveryTime : '', Validators.required),
        // locLatitude: new FormControl(''),
        // locLongitude: new FormControl(''),
        locRegion: new FormControl(this.productItem.location?.locRegion ? this.productItem.location.locRegion : '', Validators.required),
        locCity: new FormControl(this.productItem.location?.locCity ? this.productItem.location.locCity : '', Validators.required),
        locNeighborhood: new FormControl(this.productItem.location?.locNeighborhood ? this.productItem.location.locNeighborhood : '', Validators.required),
        locStreet: new FormControl(this.productItem.location?.locStreet ? this.productItem.location.locStreet : '', Validators.required),
        notes: new FormControl(this.productItem.location?.notes ? this.productItem.location.notes : '')
      }),
      productFormGroup: this.formBuilder.group({
        products: new FormArray([]),
      })
    });

    var deliveryTime = $("#deliveryTime");
    if (this.productItem.location?.deliveryTime) {
      console.log(this.productItem.location?.deliveryTime);
      deliveryTime.val(this.productItem.location?.deliveryTime);
    }
    this.productItem.products = [];
    if (this.productItem.products.length > 0) {
      this.productItem.products.forEach(item => {
        this.addProducts(item);
      });
    }
    if (this.ViewMode == 'view') {
      this.productsFormGroup.get('location')?.get('deliveryDate')?.disable();
      this.productsFormGroup.get('location')?.get('deliveryTime')?.disable();
      // this.productsFormGroup.get('location')?.get('locLatitude')?.disable();
      // this.productsFormGroup.get('location')?.get('locLongitude')?.disable();
      this.productsFormGroup.get('location')?.get('locRegion')?.disable();
      this.productsFormGroup.get('location')?.get('locCity')?.disable();
      this.productsFormGroup.get('location')?.get('locNeighborhood')?.disable();
      this.productsFormGroup.get('location')?.get('locStreet')?.disable();
      this.productsFormGroup.get('location')?.get('notes')?.disable();
    }
  }

  addProducts(pItem?: any) {
    const item = this.formBuilder.group({
      productNo: new FormControl(pItem.productNo ? pItem.productNo : ''),
      productName: new FormControl(pItem.productName ? pItem.productName : '', Validators.required),
      productCondition: new FormControl(pItem.productCondition ? pItem.productCondition : '', Validators.required),
      productSKUNumber: new FormControl(pItem.productSKUNumber ? pItem.productSKUNumber : '', Validators.required),
      productSerialNumber: new FormControl(pItem.productSerialNumber ? pItem.productSerialNumber : '', [Validators.required, Validators.pattern("^[0-9]*$")]),
      productValue: new FormControl(pItem.productValue ? pItem.productValue : '', [Validators.required, Validators.pattern("^[1-9][0-9 .]*$")]),
      productSpec: new FormControl(pItem.productSpec ? pItem.productSpec : '', Validators.required),
      productImages: new FormArray(pItem.productImages ? pItem.productImages : []),
      productFiles: new FormArray(pItem.productFiles ? pItem.productFiles : []),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(pItem.location?.deliveryDate ? pItem.location.deliveryDate : '', Validators.required),
        deliveryTime: new FormControl(pItem.location?.deliveryTime ? pItem.location.deliveryTime : '', Validators.required),
        // locLatitude: new FormControl(''),
        // locLongitude: new FormControl(''),
        locRegion: new FormControl(pItem.location?.locRegion ? pItem.location.locRegion : '', Validators.required),
        locCity: new FormControl(pItem.location?.locCity ? pItem.location.locCity : '', Validators.required),
        locNeighborhood: new FormControl(pItem.location?.locNeighborhood ? pItem.location.locNeighborhood : '', Validators.required),
        locStreet: new FormControl(pItem.location?.locStreet ? pItem.location.locStreet : '', Validators.required),
        notes: new FormControl(pItem.location?.notes ? pItem.location.notes : '')
      })
    });
    this.auctionProducts.push(item);
    this.navigateToPage(1, 'productAttach');
  }

  addProductForm() {
    this.addFormGroup = this.formBuilder.group({
      editIndex: new FormControl(),
      productNo: new FormControl(this.productlist.productNo ? this.productlist.productNo : ''),
      productName: new FormControl(this.productlist.productName ? this.productlist.productName : '', Validators.required),
      productCondition: new FormControl(this.productlist.productCondition ? this.productlist.productCondition : '', Validators.required),
      productSKUNumber: new FormControl(this.productlist.productSKUNumber ? this.productlist.productSKUNumber : '', Validators.required),
      productSerialNumber: new FormControl(this.productlist.productSerialNumber ? this.productlist.productSerialNumber : '', [Validators.required, Validators.pattern("^[0-9]*$")]),
      productValue: new FormControl(this.productlist.productValue ? this.productlist.productValue : '', [Validators.required, Validators.pattern("^[1-9][0-9 .]*$")]),
      productSpec: new FormControl(this.productlist.productSpec ? this.productlist.productSpec : '', Validators.required),
      productImages: new FormArray(this.productlist.productImages ? this.productlist.productImages : []),
      productFiles: new FormArray(this.productlist.productFiles ? this.productlist.productFiles : []),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(this.productlist.location?.deliveryDate ? this.productlist.location.deliveryDate : ''),
        deliveryTime: new FormControl(this.productlist.location?.deliveryTime ? this.productlist.location.deliveryTime : ''),
        // locLatitude: new FormControl(''),
        // locLongitude: new FormControl(''),
        locRegion: new FormControl(this.productlist.location?.locRegion ? this.productlist.location.locRegion : ''),
        locCity: new FormControl(this.productlist.location?.locCity ? this.productlist.location.locCity : ''),
        locNeighborhood: new FormControl(this.productlist.location?.locNeighborhood ? this.productlist.location.locNeighborhood : ''),
        locStreet: new FormControl(this.productlist.location?.locStreet ? this.productlist.location.locStreet : ''),
        notes: new FormControl(this.productlist.location?.notes ? this.productlist.location.notes : ''),
      }),
    });

    if (this.ViewMode == 'view') {
      this.addFormGroup.get('productName')?.disable();
      this.addFormGroup.get('productCondition')?.disable();
      this.addFormGroup.get('productSKUNumber')?.disable();
      this.addFormGroup.get('productSerialNumber')?.disable();
      this.addFormGroup.get('productValue')?.disable();
      this.addFormGroup.get('productSpec')?.disable();
      this.addFormGroup.get('location')?.get('deliveryDate')?.disable();
      this.addFormGroup.get('location')?.get('deliveryTime')?.disable();
      // this.addFormGroup.get('location')?.get('locLatitude')?.disable();
      // this.addFormGroup.get('location')?.get('locLongitude')?.disable();
      this.addFormGroup.get('location')?.get('locRegion')?.disable();
      this.addFormGroup.get('location')?.get('locCity')?.disable();
      this.addFormGroup.get('location')?.get('locNeighborhood')?.disable();
      this.addFormGroup.get('location')?.get('locStreet')?.disable();
      this.addFormGroup.get('location')?.get('notes')?.disable();
    }
  }

  public setValidation(e: any) {
    // this.refreshCalendarCntrl();
    const val = e.target.value;
    const locFormGroup = this.productsFormGroup.get('location');
    const addProdcutFormGroup = this.addFormGroup.get('location');
    // const locFormGroup = this.productsFormGroup.controls['location'] as FormGroup;
    // const addProdcutFormGroup = this.addFormGroup.controls['location'] as FormGroup;
    if (e.target.checked) {
      this.isSameaddress = true;

      this.setRequireValidator(locFormGroup);
      this.removeValidator(addProdcutFormGroup);
    } else {
      this.isSameaddress = false;
      this.setRequireValidator(addProdcutFormGroup);
      this.removeValidator(locFormGroup);
      this.productsFormGroup.get('location')?.get('notes')?.clearValidators();
    }
  }

  setRequireValidator(form: any) {
    for (const field in form.controls) {
      // 'field' is a string
      if (field !== 'notes') {
        let con = form.get(field); // 'control' is a FormControl
        con.setValidators([Validators.required]);
        con.updateValueAndValidity();
      }
    }
  }

  removeValidator(form: any) {

    for (const field in form.controls) {
      // 'field' is a string
      let con = form.get(field); // 'control' is a FormControl
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }
  get auctionProducts(): FormArray {
    return this.productsFormGroup.controls['productFormGroup'].get('products') as FormArray;
  }

  set auctionProducts(value) {
    this.productsFormGroup.controls['productFormGroup'].get('products')!.setValue(value);
  }

  get auctionLocation(): FormGroup {
    return this.productsFormGroup.get('locationFormGroup') as FormGroup;
  }

  get form(): { [key: string]: AbstractControl } {
    return this.productsFormGroup.controls;
  }

  get locationForm(): { [key: string]: AbstractControl } {
    const locFormGroupForm = this.productsFormGroup.controls['location'] as FormGroup;
    return locFormGroupForm.controls;
  }

  get location(): any {
    return this.productsFormGroup.get('location') as FormGroup;
  }

  // add product
  addproduct() {
    // alert("Add +");
    this.invalidQty = false;
    this.invalidImageSize = false;
    this.invalidImageType = false;
    this.invalidFileSize = false;
    this.invalidFileType = false;
    this.submitted = true;
    this.showPopupLoader = false;
    this.validateFormControls("addProduct");
    if (this.productsFormGroup.status === 'VALID' && !this.isValidDeliveryDate && !this.isValidDeliveryTime) {
      this.showProductModal = true;
    }
    // this.refreshCalendarCntrl();
    this.onAddProductSubmitted = false;
    this.addFormGroup.reset();
    this.productImages.clear();
    this.productFiles.clear();
    this.addFormGroup.get('productCondition')?.setValue('');
    this.files = [];
    this.docs = [];
  }
  get addForm(): { [key: string]: AbstractControl } {
    return this.addFormGroup.controls;
  }

  get productImages(): FormArray {
    return this.addFormGroup.get('productImages') as FormArray;
  }

  get productFiles(): FormArray {
    return this.addFormGroup.get('productFiles') as FormArray;
  }

  get addproductlocationForm(): { [key: string]: AbstractControl } {
    const addlocFormGroup = this.addFormGroup.controls['location'] as FormGroup;
    return addlocFormGroup.controls;
  }
  // file attachment
  // selectFiles(e: any,dd:string): void {
  //   this.selectedFiles = e.target.files;
  //   let filecount = this.selectedFiles.length;
  //     if(this.selectedFiles && filecount<=this.maxFileCount){
  //       this.msg="";
  //       for(let i=0;i<filecount;i++){
  //         let filesize = this.selectedFiles[i]['size'];
  //         if(filesize <= 2097152){
  //           if(this.files.length<this.maxFileCount){

  //             const reader = new FileReader();
  //             reader.readAsDataURL(e.target.files[i]);
  //               var fileupload = {
  //                 "name"    : e.target.files[i]['name'],
  //                 "size"    : e.target.files[i]['size'],
  //                 "type"    : e.target.files[i]['type'],
  //                 "filesrc" : new Array()
  //               };
  //               reader.onload = () => {
  //                 fileupload.filesrc[0] = reader.result;
  //               };

  //               this.files.push(fileupload);
  //               this.productImages.push(new FormControl(fileupload));
  //               this.navigateToPage(1, 'productPictureAttach');
  //           }
  //         }else if(this.files.length==0 || this.files.length==1){
  //           this.msg="Invalid file Size";
  //         }
  //       }
  //     } else {
  //       this.msg="Invalid file count";
  //     }
  // }
  selectImages(e: any, dd: string): void {
    this.invalidImageSize = false;
    this.invalidImageType = true;
    let filecount = e.target.files.length;
    if (e.target.files && filecount <= this.maxFileCount) {
      this.customLoopforImages(0, filecount, e.target.files);
    } else {
    }
  }
  customLoopforImages(index: number, limit: number, file: any) {
    let filesize = file[index]['size'];
    const fileType = file[index]['name'].split(".").pop()?.toLowerCase();
    if (!!this.acceptedImagesExtensions.find(x => x === fileType)) {
      this.invalidImageType = false;
      if (filesize <= 2097152) {
        if (this.productImages['controls'].length < this.maxFileCount) {
          // var fileupload: {[k: string]: any} = {};
          this.FilePushTOArray(file[index], (filesrc: any) => {
            var fileupload = {
              "name": file[index]['name'],
              "size": file[index]['size'],
              "type": file[index]['type'],
              "filesrc": [filesrc]
            };
            if (index < limit - 1) {
              this.customLoopforImages(++index, limit, file);
            }
            this.files.push(fileupload);
            this.productImages.push(new FormControl(fileupload));
            this.navigateToPage(1, 'productPictureAttach');
          });
        }
      } else {
        this.invalidImageSize = true;
        this.invalidImageType = false;
      }
    }
  }
  FilePushTOArray(file: any, callback: (filesrc: any) => any) {
    const reader = new FileReader();
    reader.onload = (function (f) {
      return function () {
        callback(reader.result);
      }
    })(file);
    reader.readAsDataURL(file);
  }

  selectFiles(e: any, dd: string): void {
    // this.invalidImageSize = false;
    // this.invalidImageType = true;
    this.invalidFileSize = false;
    this.invalidFileType = true;
    let filecount = e.target.files.length;
    if (e.target.files && filecount <= this.maxFileCount) {
      this.customLoopforFiles(0, filecount, e.target.files);
    } else {
    }
  }
  customLoopforFiles(index: number, limit: number, file: any) {
    let filesize = file[index]['size'];
    const fileType = file[index]['name'].split(".").pop()?.toLowerCase();
    if (!!this.acceptedFilesExtensions.find(x => x === fileType)) {
      this.invalidFileType = false;
      if (filesize <= 2097152) {
        if (this.productFiles['controls'].length < this.maxFileCount) {
          // var fileupload: {[k: string]: any} = {};
          this.FilePushTOArray(file[index], (filesrc: any) => {
            var fileupload = {
              "name": file[index]['name'],
              "size": file[index]['size'],
              "type": file[index]['type'],
              "filesrc": [filesrc]
            };
            if (index < limit - 1) {
              this.customLoopforFiles(++index, limit, file);
            }
            this.docs.push(fileupload);
            this.productFiles.push(new FormControl(fileupload));
            this.navigateToPage(1, 'productFileAttach');
          });
        }
      } else {
        this.invalidFileSize = true;
      }
    }
  }

  // attachemnt view
  viewAttachment(file: any, index: any, category: any) {
    if (category == "File") {
      this.activeFileIndex = index;
    }
    else {
      this.activePictureIndex = index;
    }
    console.log('viewAttachment');
    if (file.FilenetId) {
      file.downloading = true;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe((downloadAuctionImagesResp: any) => {
        const fileResp = downloadAuctionImagesResp.d;
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: file.MIMEType });
        console.log(blob);
        let fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        if (category == "File") {
          this.activeFileIndex = -1;
        }
        else {
          this.activePictureIndex = -1;
          // console.log("We got the picture");
        }
        file.downloading = false;
        // window.open(fileContent, "_blank");
      }, (error) => {
        file.downloading = false;
        if (category == "File") {
          this.activeFileIndex = -1;
        }
        else {
          this.activePictureIndex = -1;
        }
        this.showLoader = false;
        console.log('downloadAuctionImages RespError : ', error);
      });
    } else {
      const fileType = file.name.split(".").pop()?.toLowerCase();
      // var reader = new FileReader();
      // reader.readAsDataURL(file.filesrc['0']);
      var byteString = atob(file.filesrc['0'].split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: file.type });

      let fileURL = window.URL.createObjectURL(blob);
      if ((file.type.indexOf('image') > -1) || (file.type.indexOf('video') > -1) || fileType === 'docx' || fileType === 'doc' || fileType === 'pdf') {
        this.showViewAttachmentsModal = false;
        window.open(fileURL, '_blank');
      } else {
        if (file.type.indexOf('image') > -1) {
          this.selectedFileFormat = 'image';
        } else if (file.type.indexOf('video') > -1) {
          this.selectedFileFormat = 'video';
        }
        this.selectedFileURL = file.filesrc['0'].split(',')[1];;
        // reader.onload = (_event) => {
        //   this.selectedFileURL = reader.result;
        // }
        this.showViewAttachmentsModal = true;
      }
    }
  }

  // removeFile(index:number, currentPage: number){
  //   this.invalidFileSize = false;
  //   this.showAlertModal = true;
  //   // this.files.splice(index,1);
  //   // this.productImages.removeAt(index);
  //   // this.navigateToPage(currentPage, 'productFileAttach');
  // }

  removeFile(file: any, index: number, currentPage: number) {
    this.invalidImageSize = false;
    this.invalidImageType = false;
    if (file.FilenetId) {
      // this.showAlertModal = true;
      this.showPopupLoader = true;
      this.auctionServc.deleteAuctionImages(file.FilenetId).subscribe((deleteAuctionImagesResp: any) => {
        console.log(deleteAuctionImagesResp);
        this.showPopupLoader = false;
        this.files.splice(index, 1);
        this.productImages.removeAt(index);
        if (this.files.length % 10 === 0) {
          this.navigateToPage(currentPage - 1, 'productPictureAttach');
        } else {
          this.navigateToPage(currentPage, 'productPictureAttach');
        }
      }, (error) => {
        this.showLoader = false;
        console.log('deleteAuctionImagesResp RespError : ', error);
      });
    } else {
      this.files.splice(index, 1);
      this.productImages.removeAt(index);
      if (this.files.length % 10 === 0) {
        this.navigateToPage(currentPage - 1, 'productPictureAttach');
      } else {
        this.navigateToPage(currentPage, 'productPictureAttach');
      }
    }
  }

  removeDoc(file: any, index: number, currentPage: number) {
    this.invalidFileSize = false;
    this.invalidFileType = false;
    if (file.FilenetId) {
      // this.showAlertModal = true;
      this.showPopupLoader = true;
      this.auctionServc.deleteAuctionImages(file.FilenetId).subscribe((deleteAuctionImagesResp: any) => {
        console.log(deleteAuctionImagesResp);
        this.showPopupLoader = false;
        this.files.splice(index, 1);
        this.productFiles.removeAt(index);
        if (this.files.length % 10 === 0) {
          this.navigateToPage(currentPage - 1, 'productFileAttach');
        } else {
          this.navigateToPage(currentPage, 'productFileAttach');
        }
      }, (error) => {
        this.showLoader = false;
        console.log('deleteAuctionImagesResp RespError : ', error);
      });
    } else {
      this.files.splice(index, 1);
      this.productFiles.removeAt(index);
      if (this.files.length % 10 === 0) {
        this.navigateToPage(currentPage - 1, 'productFileAttach');
      } else {
        this.navigateToPage(currentPage, 'productFileAttach');
      }
    }
  }

  //<!----------------------- product add,edit delete--------------------->

  public onAddProduct(submitSrc: string) {
    this.invalidImageSize = false;
    this.invalidImageType = false;
    this.invalidFileSize = false;
    this.invalidFileType = false;
    this.onAddProductSubmitted = true;
    if (this.addFormGroup.get('productSerialNumber')?.value < 1) {
      this.invalidQty = true;
      return;
    }
    let startDate = this.auctionDetails?.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
    let deliveryDate = this.addproductlocationForm['deliveryDate'].value;
    let deliveryTime = this.addproductlocationForm['deliveryTime'].value;
    if (this.lang == 'ar') {
      endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
      deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
    }
    let aucEndDate = new Date(endDate + " " + endTime);
    let aucDelDate = new Date(deliveryDate + " " + deliveryTime);

    if (endDate && deliveryDate) {
      if ((moment(endDate).isAfter(deliveryDate, 'day'))) {
        this.isValidPDeliveryDate = true;
        return;
      }
    }

    if (aucEndDate >= aucDelDate) {
      this.isValidPDeliveryTime = true;
      return;
    } else {
      this.isValidPDeliveryTime = false;
    }
    if (submitSrc === 'save') {
      if (this.addFormGroup.status === 'VALID') {
        this.showLoader = true;
        this.showProductModal = false;
        // Edit Mode -Product
        if (this.addFormGroup.value['editIndex'] != null) {
          this.auctionProducts.at(this.addFormGroup.value['editIndex']).patchValue(this.addFormGroup.value);
          (this.auctionProducts.at(this.addFormGroup.value['editIndex']).value).productImages = this.addFormGroup.value.productImages;
          (this.auctionProducts.at(this.addFormGroup.value['editIndex']).value).productFiles = this.addFormGroup.value.productFiles;

          const auctiondetail = this.generateProductFormat(this.productsFormGroup.getRawValue(), this.addFormGroup.value, 'edit');
          this.auctionServc.createAuction(auctiondetail).subscribe(async (productDetailsResp: any) => {
            console.log('createAuction Resp ', productDetailsResp);
            // alert('Auction is Saved Successfully. Please Continue...');
            let productCreateResp = {
              DraftId: productDetailsResp.d.DraftId,
              ObjectId: productDetailsResp.d.ObjectId,
            }
            this.productCreateResp.emit(productCreateResp);
            if (this.addFormGroup.value.productImages.length > 0 || this.addFormGroup.value.productFiles.length > 0) {
              // fileNet Services
              let productAttachments = [];
              if (this.addFormGroup.value.productImages.length > 0) {
                let fileNetProductImages: any;

                let productImages = this.addFormGroup.value.productImages.filter(function (file: any) { return (file.filesrc['0'] && !file.FilenetId) });
                for (let i = 0; i < productImages.length; i++) {
                  let file = productImages[i];
                  fileNetProductImages = {
                    "FileName": file.name.split('.')[0],
                    // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
                    "FileContent": btoa(file.filesrc),
                    "MIMEType": file.type,
                    "FileLength": '' + file.size,
                    "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
                    "Version": "1.0",
                    "ObjectType": "/AuctionProductImages",
                    "ObjectId": this.ObjectId,
                    "ZzProductNo": productDetailsResp.d.listtoproductnav.results[0].ZzProductNo,
                  };
                  productAttachments.push(fileNetProductImages);
                }

              }
              // fileNet Services for Product files
              if (this.addFormGroup.value.productFiles.length > 0) {
                //   alert(this.addFormGroup.value.productFiles.length);
                let fileNetProductFiles: any;
                let productFiles = this.addFormGroup.value.productFiles.filter(function (file: any) { return (file.filesrc['0'] && !file.FilenetId) });
                for (let i = 0; i < productFiles.length; i++) {
                  let file = productFiles[i];
                  //      alert(file.name);
                  fileNetProductFiles = {
                    "FileName": file.name.split('.')[0],
                    // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
                    "FileContent": btoa(file.filesrc),
                    "MIMEType": file.type,
                    "FileLength": '' + file.size,
                    "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
                    "Version": "1.0",
                    "ObjectType": "/AuctionProductDocuments",
                    "ObjectId": this.ObjectId,
                    "ZzProductNo": productDetailsResp.d.listtoproductnav.results[0].ZzProductNo,
                  };
                  productAttachments.push(fileNetProductFiles);
                }
              }
              if (productAttachments.length > 0) {
                this.productAttachmentsUploads(productAttachments);
              } else {
                this.showLoader = false;
                this.pageRefresh();
              }
            } else {
              this.showLoader = false;
              this.pageRefresh();
            }
          }, (error) => {
            this.showLoader = false;
            this.pageRefresh();
            console.log('createAuction RespError : ', error);
          });
          // this.addFormGroup.reset();
          // this.productImages.clear();
          // this.productFiles.clear();
        }
        // Create Mode - Product
        else {
          console.log(this.auctionProducts);
          this.auctionProducts.push(new FormControl(this.addFormGroup.value));
          (this.auctionProducts.value.at(this.auctionProducts.length - 1)).productImages = this.addFormGroup.value.productImages;
          (this.auctionProducts.value.at(this.auctionProducts.length - 1)).productFiles = this.addFormGroup.value.productFiles;
          if (this.auctionProducts['controls'].length > 0) {
            this.productsFormGroup.controls['sameLocNDate'].disable();
          }
          if (true) {
            const auctiondetail = this.generateProductFormat(this.productsFormGroup.getRawValue(), this.addFormGroup.value, 'create');
            this.auctionServc.createAuction(auctiondetail).subscribe(async (productDetailsResp: any) => {
              console.log('createAuction Resp ', productDetailsResp);
              // alert('Auction is Saved Successfully. Please Continue...');
              let productCreateResp = {
                DraftId: productDetailsResp.d.DraftId,
                ObjectId: productDetailsResp.d.ObjectId,
              }
              this.productCreateResp.emit(productCreateResp);
              if (this.addFormGroup.value.productImages.length > 0 || this.addFormGroup.value.productFiles.length > 0) {
                // fileNet Services
                let productAttachments = [];
                if (this.addFormGroup.value.productImages.length > 0) {
                  let fileNetAuctionDetail: any;
                  for (let i = 0; i < this.addFormGroup.value.productImages.length; i++) {
                    let file = this.addFormGroup.value.productImages[i];
                    fileNetAuctionDetail = {
                      "FileName": file.name.split('.')[0],
                      // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
                      "FileContent": btoa(file.filesrc),
                      "MIMEType": file.type,
                      "FileLength": '' + file.size,
                      "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
                      "Version": "1.0",
                      "ObjectType": "/AuctionProductImages",
                      "ObjectId": this.ObjectId,
                      "ZzProductNo": productDetailsResp.d.listtoproductnav.results[0].ZzProductNo,
                    };
                    productAttachments.push(fileNetAuctionDetail);
                  }

                }
                // fileNet Services for Product files
                if (this.addFormGroup.value.productFiles.length > 0) {
                  //   alert(this.addFormGroup.value.productFiles.length);
                  let fileNetAuctionDetail: any;
                  for (let i = 0; i < this.addFormGroup.value.productFiles.length; i++) {
                    let file = this.addFormGroup.value.productFiles[i];
                    //      alert(file.name);
                    fileNetAuctionDetail = {
                      "FileName": file.name.split('.')[0],
                      // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
                      "FileContent": btoa(file.filesrc),
                      "MIMEType": file.type,
                      "FileLength": '' + file.size,
                      "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
                      "Version": "1.0",
                      "ObjectType": "/AuctionProductDocuments",
                      "ObjectId": this.ObjectId,
                      "ZzProductNo": productDetailsResp.d.listtoproductnav.results[0].ZzProductNo,
                    };
                    productAttachments.push(fileNetAuctionDetail);
                  }
                }
                if (productAttachments.length > 0) {
                  this.productAttachmentsUploads(productAttachments);
                } else {
                  this.showLoader = false;
                  this.pageRefresh();
                }
              } else {
                this.showLoader = false;
                this.pageRefresh();
              }
            }, (error) => {
              this.showLoader = false;
              this.pageRefresh();
              console.log('createAuction RespError : ', error);
            });
          }
        }
      } else {
      }
    } else if (submitSrc === 'saveasdraft') {
    }
    console.log('this.auctionProducts ', this.auctionProducts);
  }

  productAttachmentsUploads(productAttachments: any) {
    let filestoUpload = productAttachments;
    console.log('filestoUpload ', filestoUpload);

    if (filestoUpload.length > 0) {

      const customLoop = (i: number) => {
        if (i < filestoUpload.length) {
          const fileNetAuctionDetail = filestoUpload[i];
          this.auctionServc.uploadAuctionImages(fileNetAuctionDetail).subscribe(result => {
            customLoop(i + 1);
          }, (error: any) => {
            console.log('Error ', error);
            customLoop(i + 1);
          })
        } else {
          this.showLoader = false;
          this.pageRefresh();
        }
      }
      customLoop(0);

    } else {
      this.showLoader = false;
      this.pageRefresh();
    }
  }

  // edit Product

  editProduct(item: any) {
    let index: number = 0;
    this.auctionProducts.controls.forEach((element, i) => {
      if (element.value == item) {
        index = i;
      }
    });
    this.invalidQty = false;
    this.showProductModal = true;
    const editdata = this.auctionProducts.controls[index].value;
    this.files = [];
    this.docs = [];
    this.productImages.clear();
    this.productFiles.clear();
    Object.keys(editdata).forEach(key => {
      if (key != "productImages" && key != "location" && key != "productFiles") {
        this.addFormGroup.controls[key].setValue(editdata[key]);
        this.addFormGroup.controls[key].updateValueAndValidity();
      } else {
        if (key == "productImages") {
          editdata[key].forEach((value: any, index: any, array: any) => {
            this.files.push(value);
            this.productImages.push(new FormControl(value));
            this.navigateToPage(1, 'productPictureAttach');
            this.productImages.updateValueAndValidity();
          });
        } else if (key == "productFiles") {
          editdata[key].forEach((value: any, index: any, array: any) => {
            this.docs.push(value);
            this.productFiles.push(new FormControl(value));
            this.navigateToPage(1, 'productFileAttach');
            this.productFiles.updateValueAndValidity();
          });
        } else if (key == "location") {
          Object.keys(editdata[key]).forEach(key1 => {
            this.addproductlocationForm[key1].setValue(editdata[key][key1]);
            this.addproductlocationForm[key1].updateValueAndValidity();
          });
        }
      }
    });
    this.addFormGroup.controls["editIndex"].setValue(index);

    this.totalValue = 0;
    this.totalQty = 0;
    this.auctionProducts.value.forEach((product: any) => {
      this.totalValue = this.totalValue + (+product.productValue * +product.productSerialNumber);
      this.totalQty = this.totalQty + (+product.productSerialNumber);
    });
    this.addFormGroup.updateValueAndValidity();
  }

  removeProduct(index: number, currentPage: number, Product: any) {
    const editdata = Product;
    this.files = [];
    this.docs = [];
    this.productImages.clear();
    this.productFiles.clear();
    Object.keys(editdata).forEach(key => {
      if (key != "productImages" && key != "location" && key != "productFiles") {
        this.addFormGroup.controls[key].setValue(editdata[key]);
        this.addFormGroup.controls[key].updateValueAndValidity();
      } else if (key == "productImages") {
        editdata[key].forEach((value: any, index: any, array: any) => {
          this.files.push(value);
          this.productImages.push(new FormControl(value));
          this.navigateToPage(1, 'productPictureAttach');
          this.productImages.updateValueAndValidity();
        });
      } else if (key == "productFiles") {
        editdata[key].forEach((value: any, index: any, array: any) => {
          this.docs.push(value);
          this.productFiles.push(new FormControl(value));
          this.navigateToPage(1, 'productFileAttach');
          this.productFiles.updateValueAndValidity();
        });
      } else if (key == "location") {
        Object.keys(editdata[key]).forEach(key1 => {
          this.addproductlocationForm[key1].setValue(editdata[key][key1]);
          this.addproductlocationForm[key1].updateValueAndValidity();
        })
      }
    });
    this.addFormGroup.controls["editIndex"].setValue(index);
    if (true) {
      const auctiondetail = this.generateProductFormat(this.productsFormGroup.getRawValue(), this.addFormGroup.value, 'delete');
      this.auctionServc.createAuction(auctiondetail).subscribe((productDetailsResp: any) => {
        console.log('createAuction Resp ', productDetailsResp);
        // alert('Auction is Saved Successfully. Please Continue...');
        let productCreateResp = {
          DraftId: productDetailsResp.d.DraftId,
          ObjectId: productDetailsResp.d.ObjectId,
        }
        this.productCreateResp.emit(productCreateResp);
        this.pageRefresh();
      }, (error) => {
        console.log('createAuction RespError : ', error);
        this.pageRefresh();
      });
    }
  }
  //<!----------------------- product add,edit delete end--------------------->

  public onSubmit(submitSrc: string) {
    // this.showLoader = true;
    console.log('this.productsFormGroup: ', this.productsFormGroup);
    if (this.productsFormGroup.controls['sameLocNDate']) {
      let startDate = this.auctionDetails.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';

      let endDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD, 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
      let endTime = this.auctionDetails.ZzAnncSrtT ? this.auctionDetails.ZzAnncSrtT !== 0 ? moment(this.auctionDetails.ZzAnncSrtT, 'hh:mm:ss').format('hh:mm A') : '' : '';
      let deliveryDate = this.locationForm['deliveryDate'].value;
      let deliveryTime = this.locationForm['deliveryTime'].value;
      if (this.lang == 'ar') {
        endTime = endTime?.split(' ')[1] == 'م' ? endTime.replace(endTime.split(' ')[1], 'PM') : endTime?.split(' ')[1] == 'ص' ? endTime.replace(endTime.split(' ')[1], 'AM') : endTime
        deliveryTime = deliveryTime?.split(' ')[1] == 'م' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'PM') : deliveryTime?.split(' ')[1] == 'ص' ? deliveryTime.replace(deliveryTime.split(' ')[1], 'AM') : deliveryTime
      }
      let aucEndDate = new Date(endDate + " " + endTime);
      let aucDelDate = new Date(deliveryDate + " " + deliveryTime);


      if (aucEndDate >= aucDelDate) {
        this.isValidDeliveryTime = true;
      } else {
        this.isValidDeliveryTime = false;
      }

      if (endDate && deliveryDate) {
        if ((moment(endDate).isAfter(deliveryDate, 'day'))) {
          this.isValidDeliveryDate = true;
          return;
        } else {
          this.isValidDeliveryDate = false;
          if (aucEndDate >= aucDelDate) {
            this.isValidDeliveryTime = true;
            return;
          } else {
            this.isValidDeliveryTime = false;
          }
        }
      }
    }
    this.submitted = true;
    if (submitSrc === 'save') {
      this.validateFormControls(submitSrc);
      if (this.productsFormGroup.status === 'VALID') {
        let productCreateResp = {
          DraftId: this.DraftId,
          ObjectId: this.ObjectId,
        }
        this.productCreateResp.emit(productCreateResp);
        this.activeStep++;
        this.changeSteps.emit(this.activeStep);
      }
    } else if (submitSrc === 'saveasdraft') {
      this.validateFormControls(submitSrc);
      console.log(this.productsFormGroup);
      if (this.isSaveasdraftValid()) {
        if (this.productsFormGroup.status === 'VALID') {
          let productCreateResp = {
            DraftId: this.DraftId,
            ObjectId: this.ObjectId,
          }
          this.productCreateResp.emit(productCreateResp);
          this.showSaveasdraftBtnLoader = false;
          this.showSuccessfulModal = true;
        }
      }
    }

  }

  /**
   * isSaveasdraftValid
   */
  public isSaveasdraftValid() {
    if (this.auctionProducts['controls'].length > 0) {
      this.atLeastOneRequired = false;
      return true;
    } else {
      this.atLeastOneRequired = true;
      return false;
    }
  }


  public validateFormControls(submitType: string) {
    if (submitType === 'save') {
      if (this.productsFormGroup.controls['sameLocNDate'].value) {
        this.location.controls['deliveryDate'].setValidators([Validators.required]);
        this.location.controls['deliveryTime'].setValidators([Validators.required]);
        // this.location.controls['locLatitude'].setValidators();
        // this.location.controls['locLongitude'].setValidators();
        this.location.controls['locRegion'].setValidators([Validators.required]);
        this.location.controls['locCity'].setValidators([Validators.required]);
        this.location.controls['locNeighborhood'].setValidators([Validators.required]);
        this.location.controls['locStreet'].setValidators([Validators.required]);
        this.location.controls['notes'].clearValidators();
        this.auctionProducts.setValidators([Validators.required]);
      } else {
        this.location.controls['deliveryDate'].clearValidators();
        this.location.controls['deliveryTime'].clearValidators();
        // this.location.controls['locLatitude'].clearValidators();
        // this.location.controls['locLongitude'].clearValidators();
        this.location.controls['locRegion'].clearValidators();
        this.location.controls['locCity'].clearValidators();
        this.location.controls['locNeighborhood'].clearValidators();
        this.location.controls['locStreet'].clearValidators();
        this.location.controls['notes'].clearValidators();
        this.location.clearValidators();
        this.auctionProducts.setValidators([Validators.required]);
      }
    } else if (submitType === 'saveasdraft') {
      this.productsFormGroup.controls['sameLocNDate'].clearValidators();
      this.location.controls['deliveryDate'].clearValidators();
      this.location.controls['deliveryTime'].clearValidators();
      // this.location.controls['locLatitude'].clearValidators();
      // this.location.controls['locLongitude'].clearValidators();
      this.location.controls['locRegion'].clearValidators();
      this.location.controls['locCity'].clearValidators();
      this.location.controls['locNeighborhood'].clearValidators();
      this.location.controls['locStreet'].clearValidators();
      this.location.controls['notes'].clearValidators();
      this.auctionProducts.clearValidators();
    } else if (submitType == 'addProduct') {
      if (this.productsFormGroup.controls['sameLocNDate'].value) {
        this.location.controls['deliveryDate'].setValidators([Validators.required]);
        this.location.controls['deliveryTime'].setValidators([Validators.required]);
        // this.location.controls['locLatitude'].setValidators();
        // this.location.controls['locLongitude'].setValidators();
        this.location.controls['locRegion'].setValidators([Validators.required]);
        this.location.controls['locCity'].setValidators([Validators.required]);
        this.location.controls['locNeighborhood'].setValidators([Validators.required]);
        this.location.controls['locStreet'].setValidators([Validators.required]);
        this.location.controls['notes'].clearValidators();
        this.auctionProducts.clearValidators();
      } else {
        this.location.controls['deliveryDate'].clearValidators();
        this.location.controls['deliveryTime'].clearValidators();
        // this.location.controls['locLatitude'].clearValidators();
        // this.location.controls['locLongitude'].clearValidators();
        this.location.controls['locRegion'].clearValidators();
        this.location.controls['locCity'].clearValidators();
        this.location.controls['locNeighborhood'].clearValidators();
        this.location.controls['locStreet'].clearValidators();
        this.location.controls['notes'].clearValidators();
        this.auctionProducts.clearValidators();
      }
    }
    this.productsFormGroup.controls['sameLocNDate'].updateValueAndValidity();
    this.location.controls['deliveryDate'].updateValueAndValidity();
    this.location.controls['deliveryTime'].updateValueAndValidity();
    // this.location.controls['locLatitude'].updateValueAndValidity();
    // this.location.controls['locLongitude'].updateValueAndValidity();
    this.location.controls['locRegion'].updateValueAndValidity();
    this.location.controls['locCity'].updateValueAndValidity();
    this.location.controls['locNeighborhood'].updateValueAndValidity();
    this.location.controls['locStreet'].updateValueAndValidity();
    this.location.controls['notes'].updateValueAndValidity();
    this.auctionProducts.updateValueAndValidity();
    this.location.updateValueAndValidity();
    this.productsFormGroup.updateValueAndValidity();
  }



  public getAuctionType(code: string) {
    if (code === 'Public') {
      return 'O';
    } else if (code === 'Private') {
      return 'C';
    } else {
      return '';
    }
  }

  public generateProductFormat(obj: any, product: any, action: string) {
    if (this.lang == 'ar') {
      obj.location.deliveryTime = obj.location.deliveryTime?.split(' ')[1] == 'م' ? obj.location.deliveryTime.replace(obj.location.deliveryTime.split(' ')[1], 'PM') : obj.location.deliveryTime?.split(' ')[1] == 'ص' ? obj.location.deliveryTime.replace(obj.location.deliveryTime.split(' ')[1], 'AM') : obj.location.deliveryTime
    }

    if (this.lang == 'ar') {
      product.location.deliveryTime = product.location.deliveryTime?.split(' ')[1] == 'م' ? product.location.deliveryTime.replace(product.location.deliveryTime.split(' ')[1], 'PM') : product.location.deliveryTime?.split(' ')[1] == 'ص' ? product.location.deliveryTime.replace(product.location.deliveryTime.split(' ')[1], 'AM') : product.location.deliveryTime
    }


    let productList: any = [];
    let auctionList = {};
    let pObj = product;
    const sameLocNDate = this.productsFormGroup.controls['sameLocNDate'].value;
    if (sameLocNDate) {
      let product = {};
      product = {
        DelInd: action == 'delete' ? 'X' : '',
        ZzProductNo: pObj.productNo ? pObj.productNo : '',
        Description: pObj.productName,
        ZzProductCond: pObj.productCondition,
        ProductValue: pObj.productValue ? parseFloat(pObj.productValue).toFixed(2) : '',
        ZzProductSku: pObj.productSKUNumber,
        Quantity: (pObj.productSerialNumber).toString(),
        ZzProdDesc: pObj.productSpec,
        DelivDate: obj.location.deliveryDate ? moment(obj.location.deliveryDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
        DelivTime: obj.location.deliveryTime ? moment(obj.location.deliveryTime, 'h:m:s A').format('HH:mm:ss') : '',
        ZzLocationCord: '21.486256032618705 , 39.19187197360076',
        ZzRegion: obj.location.locRegion,
        ZzCity: obj.location.locCity,
        ZzNeighbourhood: obj.location.locNeighborhood,
        ZzStreet: obj.location.locStreet,
        ZzPdOthrNts: obj.location.notes ? obj.location.notes : '',
      }
      productList.push(product);
    } else {
      let product = {};
      product = {
        DelInd: action == 'delete' ? 'X' : '',
        ZzProductNo: pObj.productNo ? pObj.productNo : '',
        Description: pObj.productName,
        ZzProductCond: pObj.productCondition,
        ProductValue: pObj.productValue ? parseFloat(pObj.productValue).toFixed(2) : '',
        ZzProductSku: pObj.productSKUNumber,
        Quantity: (pObj.productSerialNumber).toString(),
        ZzProdDesc: pObj.productSpec,
        DelivDate: pObj.location.deliveryDate ? moment(pObj.location.deliveryDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
        DelivTime: pObj.location.deliveryTime ? moment(pObj.location.deliveryTime, 'h:m:s A').format('HH:mm:ss') : '',
        ZzLocationCord: '21.486256032618705 , 39.19187197360076',
        ZzRegion: pObj.location.locRegion,
        ZzCity: pObj.location.locCity,
        ZzNeighbourhood: pObj.location.locNeighborhood,
        ZzStreet: pObj.location.locStreet,
        ZzPdOthrNts: pObj.location.notes ? pObj.location.notes : '',
      }
      productList.push(product);
    }
    auctionList = {
      SaveAsDraft: "X",
      DraftId: this.DraftId ? this.DraftId : '',
      ObjectId: this.ObjectId ? this.ObjectId : '',
      SameAddress: sameLocNDate ? 'Y' : 'N',
      //Auction Details
      BidType: this.auctionDetails.BidType,
      ZzCloseInd: this.auctionDetails.ZzCloseInd,
      ZzPrevAucId1: this.auctionDetails.ZzPrevAucId1, // for Private
      Description: this.auctionDetails.Description,
      ZzAucProduct: this.auctionDetails.ZzAucProduct,
      ZzAucDesc: this.auctionDetails.ZzAucDesc,
      ZzPrtReason: this.auctionDetails.ZzPrtReason,
      ZzOtherNote: this.auctionDetails.ZzOtherNote,
      ZzAucSrtDt: this.auctionDetails.ZzAucSrtDt,
      ZzAucEndDt: this.auctionDetails.ZzAucEndDt,
      ZzStartMethod: this.auctionDetails.ZzStartMethod,
      ZzAnncSrtD: this.auctionDetails.ZzAnncSrtD,
      ZzAnncSrtT: this.auctionDetails.ZzAnncSrtT,
      ZzBidSrtPrice: this.auctionDetails.ZzBidSrtPrice,
      ZzLowBidVl: this.auctionDetails.ZzLowBidVl,
      ZzIbgaPercent: this.auctionDetails.ZzIbgaPercent,
      ZzFbgaPercent: this.auctionDetails.ZzFbgaPercent,
      ZzFbgaDeadline: this.auctionDetails.ZzFbgaDeadline,
      ZzCommisionTyp: this.auctionDetails.ZzCommisionTyp,
      ZzCommPercent: this.auctionDetails.ZzCommPercent,
      // -------------------------------------
      listtoproductnav: productList
    }
    return auctionList;
  }

  public generateProductDetailFormat(obj: any) {
    let productList: any = [];
    let auctionList = {};
    if (obj.sameLocNDate) {
      obj.productFormGroup.products.forEach((pObj: any) => {
        let product = {};
        product = {
          Description: pObj.productName,
          ZzProductCond: pObj.productCondition,
          ProductValue: pObj.productValue ? parseFloat(pObj.productValue).toFixed(2) : '',
          ZzProductSku: pObj.productSKUNumber,
          Quantity: (pObj.productSerialNumber).toString(),
          ZzProdDesc: pObj.productSpec,
          DelivDate: obj.location.deliveryDate ? moment(obj.location.deliveryDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
          DelivTime: obj.location.deliveryTime ? moment(obj.location.deliveryTime, 'h:m:s A').format('HH:mm:ss') : '',
          ZzLocationCord: '21.486256032618705 , 39.19187197360076',
          ZzRegion: obj.location.locRegion,
          ZzCity: obj.location.locCity,
          ZzNeighbourhood: obj.location.locNeighborhood,
          ZzStreet: obj.location.locStreet,
          ZzPdOthrNts: obj.location.notes ? obj.location.notes : '',
        }
        productList.push(product);
      });
    } else {
      obj.productFormGroup.products.forEach((pObj: any) => {
        let product = {};
        product = {
          Description: pObj.productName,
          ZzProductCond: pObj.productCondition,
          ProductValue: pObj.productValue ? parseFloat(pObj.productValue).toFixed(2) : '',
          ZzProductSku: pObj.productSKUNumber,
          Quantity: (pObj.productSerialNumber).toString(),
          ZzProdDesc: pObj.productSpec,
          DelivDate: pObj.location.deliveryDate ? moment(pObj.location.deliveryDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
          DelivTime: pObj.location.deliveryTime ? moment(pObj.location.deliveryTime, 'h:m:s A').format('HH:mm:ss') : '',
          ZzLocationCord: '21.486256032618705 , 39.19187197360076',
          ZzRegion: pObj.location.locRegion,
          ZzCity: pObj.location.locCity,
          ZzNeighbourhood: pObj.location.locNeighborhood,
          ZzStreet: pObj.location.locStreet,
          ZzPdOthrNts: pObj.location.notes ? pObj.location.notes : '',
        }
        productList.push(product);
      });
    }
    auctionList = {
      SaveAsDraft: "X",
      DraftId: this.DraftId ? this.DraftId : '',
      ObjectId: this.ObjectId ? this.ObjectId : '',
      SameAddress: obj.sameLocNDate ? 'Y' : 'N',
      //Auction Details
      BidType: this.auctionDetails.BidType,
      ZzCloseInd: this.auctionDetails.ZzCloseInd,
      ZzPrevAucId1: this.auctionDetails.ZzPrevAucId1, // for Private
      Description: this.auctionDetails.Description,
      ZzAucProduct: this.auctionDetails.ZzAucProduct,
      ZzAucDesc: this.auctionDetails.ZzAucDesc,
      ZzPrtReason: this.auctionDetails.ZzPrtReason,
      ZzOtherNote: this.auctionDetails.ZzOtherNote,
      ZzAucSrtDt: this.auctionDetails.ZzAucSrtDt,
      ZzAucEndDt: this.auctionDetails.ZzAucEndDt,
      ZzStartMethod: this.auctionDetails.ZzStartMethod,
      ZzAnncSrtD: this.auctionDetails.ZzAnncSrtD,
      ZzAnncSrtT: this.auctionDetails.ZzAnncSrtT,
      ZzBidSrtPrice: this.auctionDetails.ZzBidSrtPrice,
      ZzLowBidVl: this.auctionDetails.ZzLowBidVl,
      ZzIbgaPercent: this.auctionDetails.ZzIbgaPercent,
      ZzFbgaDeadline: this.auctionDetails.ZzFbgaDeadline,
      ZzCommisionTyp: this.auctionDetails.ZzCommisionTyp,
      ZzCommPercent: this.auctionDetails.ZzCommPercent,
      // -------------------------------------
      listtoproductnav: productList,
    }
    return auctionList;
  }

  public back() {
    this.activeStep--;
    this.changeSteps.emit(this.activeStep);
    this.changeauctiontype.emit("auctionedit");
  }

  navigateToPage(pageNoVal: number, section: string) {
    if (section == 'productAttach') {
      this.PaginationServc.setPagerValues(
        this.auctionProducts.length,
        10,
        pageNoVal
      );
      this.pageRangeForProductAttach = {
        rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * 10),
        rangeEnd: pageNoVal == 1 ? 9 : ((pageNoVal - 1) * 10) + 9,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
      }
    } else if (section == 'productFileAttach') {
      this.PaginationServc.setPagerValues(
        this.docs.length,
        10,
        pageNoVal
      );
      this.pageRangeForProductFileAttach = {
        rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * 10),
        rangeEnd: pageNoVal == 1 ? 9 : ((pageNoVal - 1) * 10) + 9,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
      }
    } else if (section == 'productPictureAttach') {
      this.PaginationServc.setPagerValues(
        this.files.length,
        10,
        pageNoVal
      );
      this.pageRangeForProductPictureAttach = {
        rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * 10),
        rangeEnd: pageNoVal == 1 ? 9 : ((pageNoVal - 1) * 10) + 9,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
      }
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

  // sorting
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    // this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    const tableData = this.PaginationServc.sortAllTableData(this.auctionProducts.value, this.columnLst[columnId]);
  }

  sortPictureByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    // this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    const tableData = this.PaginationServc.sortAllTableData(this.productImages.value, this.columnPicList[columnId]);
  }

  sortAttachByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    // this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    const tableData = this.PaginationServc.sortAllTableData(this.productFiles.value, this.columnFileList[columnId]);
  }

  formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('/');
  }

  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showSuccessfulModal = false;
    }
  }

  public closeProductModal(confirmType: string) {
    this.activeFileIndex = -1;
    this.activePictureIndex = -1;
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      this.showProductModal = false;
    }
  }

  public openConfirmCancelModal() {
    this.showConfirmCancelModal = true;
  }

  public closeConfirmCancelModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showConfirmCancelModal = false;
      this.showCancelSuccessfulModal = true;
    } else if (confirmType == 'close') {
      this.showConfirmCancelModal = false;
    }
  }

  public closeCancelSuccessfulModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showCancelSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showCancelSuccessfulModal = false;
    }
  }

  public closeAlertModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showAlertModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showAlertModal = false;
    }
  }

  public closeDeleteSuccessfulModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showDeleteSuccessfulModal = true;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showDeleteSuccessfulModal = false;
    }
  }
}
