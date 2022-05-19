import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionProductMaster, AuctionProduct } from "src/app/model/auction.model";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-auction-product',
  templateUrl: './auction-product.component.html',
  styleUrls: ['./auction-product.component.scss']
})
export class AuctionProductComponent implements OnInit {
  @Input() activeStep: number;
  @Output() changeSteps = new EventEmitter<number>();
  // AUCTION edit start
  @Input() auctionStatus: String;
  @Output() changeauctiontype = new EventEmitter<string>();
  // AUCTION edit end
  //variables
  title = 'Auction Product';
  maxChars = 250;
  submitted = false;
  onAddProductSubmitted = false;
  isSameaddress: boolean = true;
  // Dropdown Values
  dropValBeneCategories: any = ['category 1', 'category 2', 'category 3', 'category 4'];
  // Form controls
  productsFormGroup: FormGroup;
  addFormGroup: FormGroup;
  order: string = '';

  // ------- product file attachment --------
  // ------- file validation         --------
  maxFileCount: Number = 6;
  acceptedExtensions = "mp4,mov,png,jpg,docx,doc,pdf";
  @ViewChild('myModalClose') modalClose: any;
  msg: String = '';
  selectedFiles: File[];
  files: any[] = [];
  selectedFileFormat: any;
  selectedFileURL: any;
  showViewAttachmentsModal: boolean = false;
  // -------------

  //--------------- google map loc ---------
  lat: number;
  lng: number;
  locationChoose = false;

  // Objects
  productItem: AuctionProductMaster = new AuctionProductMaster();
  productlist: AuctionProduct = new AuctionProduct();
  dropValCategory: any = ['category 1', 'category 2', 'category 3', 'category 4'];
  public arrayofobject: any = [];

  constructor(
    public PaginationServc: PaginationSortingService,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.addProductForm();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
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
    console.log(e.target.value)
    if (e.target.value != '') {
      this.addFormGroup.controls[dd].setValue(e.target.value, {
        onlySelf: true
      })
    }
  }

  //time on click event 
  changetime(e: any, dd: string) {
    this.locationForm[dd].setValue(e.target.value);
  }

  //google map location
  onChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoose = true;
    this.locationForm['locLatitude'].setValue(this.lat);
    this.locationForm['locLongitude'].setValue(this.lat);
  }

  // <!----------add product event function------------------------>

  //google map location
  onaddProductChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChoose = true;
    this.addproductlocationForm['locLatitude'].setValue(this.lat);
    this.addproductlocationForm['locLongitude'].setValue(this.lat);
  }

  createForm() {
    console.log(this.productItem);
    this.productsFormGroup = this.formBuilder.group({
      sameLocNDate: new FormControl(this.productItem.sameLocNDate ? this.productItem.sameLocNDate : true, Validators.required),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(this.productItem.location?.deliveryDate ? this.productItem.location.deliveryDate : '', Validators.required),
        deliveryTime: new FormControl(this.productItem.location?.deliveryTime ? this.productItem.location.deliveryTime : '', Validators.required),
        locLatitude: new FormControl(this.productItem.location?.locLatitude ? this.productItem.location.locLatitude : '', Validators.required),
        locLongitude: new FormControl(this.productItem.location?.locLongitude ? this.productItem.location.locLongitude : '', Validators.required),
        locRegion: new FormControl(this.productItem.location?.locRegion ? this.productItem.location.locRegion : '', Validators.required),
        locCity: new FormControl(this.productItem.location?.locCity ? this.productItem.location.locCity : '', Validators.required),
        locNeighborhood: new FormControl(this.productItem.location?.locNeighborhood ? this.productItem.location.locNeighborhood : '', Validators.required),
        locStreet: new FormControl(this.productItem.location?.locStreet ? this.productItem.location.locStreet : '', Validators.required),
        notes: new FormControl(this.productItem.location?.notes ? this.productItem.location.notes : '')
      }),
      productFormGroup: this.formBuilder.group({
        products: new FormArray([], (Validators.required)),
      })
    });

    this.productItem.products = [];
    if (this.productItem.products.length > 0) {
      this.productItem.products.forEach(item => {
        this.addProducts(item);
      });
    }
  }

  addProducts(pItem?: any) {
    const item = this.formBuilder.group({
      productName: new FormControl(pItem.productName ? pItem.productName : '', Validators.required),
      productCategory: new FormControl(pItem.productCategory ? pItem.productCategory : '', Validators.required),
      productSKUNumber: new FormControl(pItem.productSKUNumber ? pItem.productSKUNumber : '', Validators.required),
      productSerialNumber: new FormControl(pItem.productSerialNumber ? pItem.productSerialNumber : '', Validators.required),
      productValue: new FormControl(pItem.productValue ? pItem.productValue : '', Validators.required),
      productSpec: new FormControl(pItem.productSpec ? pItem.productSpec : '', Validators.required),
      productImages: new FormArray([]),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(pItem.location.deliveryDate ? pItem.location.deliveryDate : '', Validators.required),
        deliveryTime: new FormControl(pItem.location.deliveryTime ? pItem.location.deliveryTime : '', Validators.required),
        locLatitude: new FormControl(pItem.location.locLatitude ? pItem.location.locLatitude : '', Validators.required),
        locLongitude: new FormControl(pItem.location.locLongitude ? pItem.location.locLongitude : '', Validators.required),
        locRegion: new FormControl(pItem.location.locRegion ? pItem.location.locRegion : '', Validators.required),
        locCity: new FormControl(pItem.location.locCity ? pItem.location.locCity : '', Validators.required),
        locNeighborhood: new FormControl(pItem.location.locNeighborhood ? pItem.location.locNeighborhood : '', Validators.required),
        locStreet: new FormControl(pItem.location.locStreet ? pItem.location.locStreet : '', Validators.required),
        notes: new FormControl(pItem.location.notes ? pItem.location.notes : '', Validators.required),
      })
    });
    this.auctionProducts.push(item);
  }

  addProductForm() {
    this.addFormGroup = this.formBuilder.group({
      editIndex: new FormControl(),
      productName: new FormControl(this.productlist.productName ? this.productlist.productName : '', Validators.required),
      productCategory: new FormControl(this.productlist.productCategory ? this.productlist.productCategory : '', Validators.required),
      productSKUNumber: new FormControl(this.productlist.productSKUNumber ? this.productlist.productSKUNumber : '', Validators.required),
      productSerialNumber: new FormControl(this.productlist.productSerialNumber ? this.productlist.productSerialNumber : '', Validators.required),
      productValue: new FormControl(this.productlist.productValue ? this.productlist.productValue : '', Validators.required),
      productSpec: new FormControl(this.productlist.productSpec ? this.productlist.productSpec : '', Validators.required),
      productImages: new FormArray([], (this.productlist.productImages ? this.productlist.productImages : '', Validators.required)),
      location: this.formBuilder.group({
        deliveryDate: new FormControl(this.productlist.location?.deliveryDate ? this.productlist.location.deliveryDate : ''),
        deliveryTime: new FormControl(this.productlist.location?.deliveryTime ? this.productlist.location.deliveryTime : ''),
        locLatitude: new FormControl(this.productlist.location?.locLatitude ? this.productlist.location.locLatitude : ''),
        locLongitude: new FormControl(this.productlist.location?.locLongitude ? this.productlist.location.locLongitude : ''),
        locRegion: new FormControl(this.productlist.location?.locRegion ? this.productlist.location.locRegion : ''),
        locCity: new FormControl(this.productlist.location?.locCity ? this.productlist.location.locCity : ''),
        locNeighborhood: new FormControl(this.productlist.location?.locNeighborhood ? this.productlist.location.locNeighborhood : ''),
        locStreet: new FormControl(this.productlist.location?.locStreet ? this.productlist.location.locStreet : ''),
        notes: new FormControl(this.productlist.location?.notes ? this.productlist.location.notes : ''),
      }),
    });
  }

  public setValidation(e: any) {
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
    }
  }

  setRequireValidator(form: any) {
    for (const field in form.controls) {
      // 'field' is a string
      let con = form.get(field); // 'control' is a FormControl
      con.setValidators([Validators.required]);
      con.updateValueAndValidity();
    }
  }

  removeValidator(form: any) {
    console.log('form contro', form);

    for (const field in form.controls) {
      // 'field' is a string
      let con = form.get(field); // 'control' is a FormControl
      console.log('key is ', field, con);
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }
  get auctionProducts(): FormArray {
    // console.log(this.productsFormGroup.get('productFormGroup'));
    return this.productsFormGroup.controls['productFormGroup'].get('products') as FormArray;
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
    return this.productsFormGroup.get('location');
  }

  // add product
  get addForm(): { [key: string]: AbstractControl } {
    return this.addFormGroup.controls;
  }

  get addproductImage(): FormArray {
    return this.addFormGroup.get('productImages') as FormArray;
  }

  get addproductlocationForm(): { [key: string]: AbstractControl } {
    // console.log("add product location");
    // console.log(this.addFormGroup.controls['location']);
    const addlocFormGroup = this.addFormGroup.controls['location'] as FormGroup;
    return addlocFormGroup.controls;
  }
  // file attachment
  selectFiles(e: any, dd: string): void {
    this.selectedFiles = e.target.files;
    let filecount = this.selectedFiles.length;
    if (this.selectedFiles && filecount <= this.maxFileCount) {
      this.msg = "";
      for (let i = 0; i < filecount; i++) {
        let filesize = this.selectedFiles[i]['size'];
        if (filesize <= 2097152) {
          if (this.files.length < this.maxFileCount) {

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            var fileupload = {
              "name": e.target.files[i]['name'],
              "size": e.target.files[i]['size'],
              "type": e.target.files[i]['type'],
              "filesrc": new Array()
            };
            reader.onload = () => {
              fileupload.filesrc[0] = reader.result;
            };

            this.files.push(fileupload);
            this.addproductImage.push(new FormControl(fileupload));
          }
        } else if (this.files.length == 0 || this.files.length == 1) {
          this.msg = "Invalid file Size";
        }
      }
    } else {
      this.msg = "Invalid file count";
    }
  }

  // attachemnt view
  viewAttachment(file: any) {
    console.log(file);
    console.log(file.type);
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
    if (fileType === 'docx' || fileType === 'doc' || fileType === 'pdf') {
      this.showViewAttachmentsModal = false;
      window.open(fileURL, '_blank');
    } else {
      if (file.type.indexOf('image') > -1) {
        this.selectedFileFormat = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.selectedFileFormat = 'video';
      }
      // reader.onload = (_event) => { 
      //   this.selectedFileURL = reader.result;
      // }
      // this.showViewAttachmentsModal = true;
    }
  }

  removeFile(index: number) {
    console.log(index);
    this.files.splice(index, 1);
    this.addproductImage.removeAt(index);
  }

  //<!----------------------- product add,edit delete--------------------->

  public onAddProduct(submitSrc: string, event: any) {
    console.log(event);
    this.onAddProductSubmitted = true;
    console.log("product");
    console.log(this.addFormGroup);
    if (submitSrc === 'save') {
      if (this.addFormGroup.status === 'VALID') {
        if (this.addFormGroup.value['editIndex'] != null) {
          console.log("product2");
          this.arrayofobject[this.addFormGroup.value['editIndex']] = this.addFormGroup.value;
          this.auctionProducts.at(this.addFormGroup.value['editIndex']).patchValue(this.addFormGroup.value);
          this.modalClose.nativeElement.click();
          this.addFormGroup.reset();
          this.addproductImage.clear();
          console.log(this.arrayofobject);
        } else {
          console.log("product1");
          this.arrayofobject.push(this.addFormGroup.value);
          this.auctionProducts.push(new FormControl(this.addFormGroup.value));
          this.modalClose.nativeElement.click();
          this.addFormGroup.reset();
          this.addproductImage.clear();
          this.files = [];
        }
      } else {
        console.log("invalid add product");
        console.log(this.addFormGroup);
      }
    } else if (submitSrc === 'saveasdraft') {
    }
  }

  // edit Product

  editProduct(index: number) {
    const Arraydata = this.arrayofobject[index];
    const editdata = this.auctionProducts.controls[index].value;
    console.log(index);
    this.files = [];
    Object.keys(editdata).forEach(key => {
      if (key != "productImages" && key != "location") {
        this.addFormGroup.controls[key].setValue(editdata[key]);
        this.addFormGroup.controls[key].updateValueAndValidity();
      }
      else if (key == "productImages") {
        editdata[key].forEach((value: any, index: any, array: any) => {

          this.files.push(value);
          this.addproductImage.push(new FormControl(value));
          this.addproductImage.updateValueAndValidity();
        })
      }
      else if (key == "location") {
        Object.keys(editdata[key]).forEach(key1 => {
          console.log(key1);
          console.log(editdata[key][key1]);
          this.addproductlocationForm[key1].setValue(editdata[key][key1]);
          this.addproductlocationForm[key1].updateValueAndValidity();
        })
      }
    });
    this.addFormGroup.controls["editIndex"].setValue(index);

    console.log(this.addFormGroup);
    this.addFormGroup.updateValueAndValidity();
  }

  removeProduct(index: number) {
    console.log(index);
    this.arrayofobject.splice(index, 1);
    this.auctionProducts.removeAt(index);
    console.log(this.productsFormGroup);
  }
  //<!----------------------- product add,edit delete end--------------------->



  public onSubmit(submitSrc: string) {
    this.submitted = true;
    console.log(this.productsFormGroup);
    if (submitSrc === 'save') {
      if (this.productsFormGroup.status === 'VALID') {
        localStorage.setItem('productDetails', JSON.stringify(this.productsFormGroup.value));
        this.activeStep++;
        this.changeSteps.emit(this.activeStep);
      }
    } else if (submitSrc === 'saveasdraft') {
      // this.activeStep ++;
      // this.changeSteps.emit(this.activeStep);
    }
  }

  public back() {
    this.activeStep--;
    this.changeSteps.emit(this.activeStep);
    this.changeauctiontype.emit("auctionedit");
  }

  // sorting
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }
}
