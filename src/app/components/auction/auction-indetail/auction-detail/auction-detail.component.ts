import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";
import { AuctionBasicMaster } from "src/app/model/auction.model";
import { formatDate, DatePipe } from '@angular/common';
import { fileExtensionValidator } from '../auction-detail/file-extension-validator.directive';
import { fileSizeValidator } from '../auction-detail/file-size-validator.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CustomService } from "src/app/service/custom.service";
import { AuctionService } from "src/app/service/auction.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { subscribeOn } from 'rxjs/operators';
import { Moment } from 'moment-mini';
import * as moment from 'moment-mini';
declare var $: any;

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})

export class AuctionDetailComponent implements OnInit {
  @Input() activeStep: number;
  @Input() ObjectId: string;
  @Input() DraftId: string;
  @Input() ViewMode: string;
  @Output() changeSteps = new EventEmitter<number>();
  // AUCTION edit start
  @Input() auctionStatus: String;
  @Output() auctionCreateResp = new EventEmitter<any>();
  @Output() changeauctiontype = new EventEmitter<string>();
  // AUCTION edit end
  @ViewChild('viewAttachmentModal') mymodal: ElementRef | undefined;
  //variables
  title = 'Auction Details';
  sCount = 1;
  maxChars = 250;
  submitted = false;
  isSameaddress = true;
  showSuccessfulModal: boolean = false;
  showConfirmCancelModal: boolean = false;
  showCancelSuccessfulModal: boolean = false;
  showDeleteSuccessfulModal: boolean = false;
  showAlertModal: boolean = false;
  activeFileDownloadIndex = -1;
  // Dropdown Values
  // dropValBeneCategories: any = ['category 1', 'category 2', 'category 3', 'category 4'];
  dropValProducts: any = [
    'product 1',
    'product 2',
    'product 3',
    'product 4'];
  dropValReasons: any = [
    'Two Announcements',
    'Less than 200 K SAR',
    'Perishable Products',
    'Others'];
  dropValFinalGntee: any = [
    '15'];
  dropValCommTypes: any = [
    'Next Financial'];

  // file validation
  maxFileCount: Number = 30;
  acceptedExtensions = "mp4,mov,png,jpg,JPG,docx,doc,pdf";

  lang: string;
  userId: string;
  auctionDetails: any;
  msg: String = '';
  files: any[] = [];
  selectedFileFormat: any;
  selectedFileURL: any;
  showViewAttachmentsModal: boolean = false;
  showLoader: boolean = false;
  showSaveBtnLoader: boolean = false;
  showSaveasdraftBtnLoader: boolean = false;
  atLeastOneRequired: boolean = false;
  minDate: any = '';
  invalidFileSize: boolean = false;
  isValidAuctionDate: boolean = false;
  isValidAnncSDate: boolean = false;
  isValidAnncEDate: boolean = false;

  // Form controls
  basicFormGroup: FormGroup;
  testFormGroup: FormGroup;
  // Objects
  auctionItem: AuctionBasicMaster = new AuctionBasicMaster();
  auctionDetailsSubscription$: Subscription;

  auctionStartDate: any;
  pageRangeForAttach: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public auctionServc: AuctionService,
    public customService: CustomService,
    public translate: TranslateService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.refreshCalendarCntrl();
    });
    this.userId = this.getUserInfo().userid;

    if (this.ViewMode == 'edit' || this.ViewMode == 'view') {
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    } else {
      if (this.ObjectId || this.DraftId) {
        this.getAuctionDetails(this.ObjectId, this.DraftId);
      }
      this.createForm();
    }

    this.refreshCalendarCntrl();

    this.basicFormGroup?.valueChanges.subscribe(x => {
      this.isSaveasdraftValid();
    });
  }

  public getUserInfo() {
    return localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : '';
  }

  populateSome() {
    const date = this.addDaysWRONG(new Date(), 0),
      endDate = this.addDaysWRONG(new Date(), 20),
      startADate = this.addDaysWRONG(new Date(), 5),
      endADate = this.addDaysWRONG(new Date(), 15);
    this.basicFormGroup.get('auctionType')?.setValue('Public');
    this.basicFormGroup.get('auctionSubType')?.setValue('C');
    this.basicFormGroup.get('prevRefNo')?.setValue('');
    this.basicFormGroup.get('auctionName')?.setValue('UAT Trucks Auction 00' + this.sCount);
    this.basicFormGroup.get('auctionProduct')?.setValue('UAT Service & Utility Trucks 00' + this.sCount);
    this.basicFormGroup.get('auctionManager')?.setValue('1827879980');
    this.basicFormGroup.get('auctionDesc')?.setValue('We are a leading provider of Mining Control Vehicles, Mining Suppression Trucks and Mining Control Trucks, which are widely used in the areas like chemical, coal, mining, steel cement, docks, construction and aggregate industries');
    this.basicFormGroup.get('reasonPrivateAuction')?.setValue('');
    this.basicFormGroup.get('reason')?.setValue('');
    this.basicFormGroup.get('auctionStartDate')?.setValue(moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    this.basicFormGroup.get('auctionEndDate')?.setValue(moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    this.basicFormGroup.get('auctionStartTime')?.setValue('02:00 PM');
    this.basicFormGroup.get('auctionEndTime')?.setValue('02:00 AM');
    this.basicFormGroup.get('startAuction')?.setValue('T');
    this.basicFormGroup.get('auctionAnncStartDate')?.setValue(moment(startADate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    this.basicFormGroup.get('auctionAnncEndDate')?.setValue(moment(endADate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
    this.basicFormGroup.get('startPrice')?.setValue('5600000');
    this.basicFormGroup.get('lowBidValue')?.setValue('60000');
    this.basicFormGroup.get('gnteePercentage')?.setValue('2');
    this.basicFormGroup.get('finalGntee')?.setValue('15');
    this.basicFormGroup.get('commissionType')?.setValue('Next Financial');
    this.basicFormGroup.get('pursuitPerCommission')?.setValue('15');
  }

  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    let selectedDate = '';
    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip(({ delay: { hide: 800 } }));
      $("#auctionStartDate").unbind().removeData();
      $("#auctionEndDate").unbind().removeData();
      $("#auctionStartTime").unbind().removeData();
      $("#auctionEndTime").unbind().removeData();
      $("#auctionAnncStartDate").unbind().removeData();
      $("#auctionAnncEndDate").unbind().removeData();
      $("#finalGntee").unbind().removeData();
      $("#auctionStartDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#auctionEndDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        minDate: this.form['auctionStartDate'].value !== '' ? moment(this.form['auctionStartDate'].value, 'YYYY-MM-DD').format('YYYY-MM-DD') : false,
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      var auctionStartTime = $("#auctionStartTime").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "hh:mm A",
        showSwitcher: false,
        showTodayButton: false,
        icons: {
          up: 'icon-arrow-up text-primary',
          down: 'icon-arrow-down text-primary',
        },
      });
      var auctionEndTime = $("#auctionEndTime").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "hh:mm A",
        showSwitcher: false,
        showTodayButton: false,
        icons: {
          up: 'icon-arrow-up text-primary',
          down: 'icon-arrow-down text-primary',
        },
      });
      if (this.auctionItem.auctionStartTime) {
        auctionStartTime.val(this.auctionItem.auctionStartTime);
      }
      if (this.auctionItem.auctionEndTime) {
        auctionEndTime.val(this.auctionItem.auctionEndTime);
      }

      $("#auctionAnncStartDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#auctionAnncEndDate").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#finalGntee").hijriDatePicker({
        hijri: false,
        locale: lang == 'en' ? 'en-us' : 'ar-SA', //ar-SA
        format: "YYYY-MM-DD",
        showSwitcher: false,
        icons: {
          previous: '<span class="icon-keyboard_arrow_left"></span>',
          next: '<span class="icon-keyboard_arrow_right"></span>',
        },
      });
      $("#auctionStartDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionStartDate");
        e?.dispatchEvent(v);
      });
      $("#auctionEndDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionEndDate");
        e?.dispatchEvent(v);
      });
      $("#auctionStartTime").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionStartTime");
        e?.dispatchEvent(v);
      });
      $("#auctionEndTime").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionEndTime");
        e?.dispatchEvent(v);
      });
      $("#auctionAnncStartDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionAnncStartDate");
        e?.dispatchEvent(v);
      });
      $("#auctionAnncEndDate").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#auctionAnncEndDate");
        e?.dispatchEvent(v);
      });
      $("#finalGntee").on('dp.change', function (arg: any) {
        const v = new Event('change');
        const e = document.querySelector("#finalGntee");
        e?.dispatchEvent(v);
      });
    }, 100);
  }

  addDaysWRONG(date: any, days: number) {
    var result = new Date();
    result.setDate(date.getDate() + days);
    return result;
  }

  onChangeDateTime($event: any, formControlName: string) {
    if (formControlName === 'auctionStartDate') {
      $("#auctionStartDate").hijriDatePicker({ minDate: $event.target.value });
    }
    this.basicFormGroup.controls[formControlName].setValue($event.target.value);
    if (formControlName == 'auctionStartDate' || formControlName == 'auctionEndDate') {
      let startDate = this.basicFormGroup.controls['auctionStartDate'].value;
      let endDate = this.basicFormGroup.controls['auctionEndDate'].value;
      if (startDate && endDate) {
        if ((moment(startDate).isAfter(endDate, 'day'))) {
          this.isValidAuctionDate = true;
        } else {
          this.isValidAuctionDate = false;
        }
      }
    }
    if (formControlName == 'auctionStartDate' || formControlName == 'auctionAnncStartDate') {
      let anncStartDate1 = this.basicFormGroup.controls['auctionStartDate'].value;
      let anncEndDate1 = this.basicFormGroup.controls['auctionAnncStartDate'].value;
      if (anncStartDate1 && anncEndDate1) {
        if ((moment(anncStartDate1).isAfter(anncEndDate1, 'day'))) {
          this.isValidAnncSDate = true;
        } else {
          this.isValidAnncSDate = false;
        }
      }
    }
    if (formControlName == 'auctionEndDate' || formControlName == 'auctionAnncEndDate') {
      let anncStartDate2 = this.basicFormGroup.controls['auctionEndDate'].value;
      let anncEndDate2 = this.basicFormGroup.controls['auctionAnncEndDate'].value;
      if (anncStartDate2 && anncEndDate2) {
        if ((moment(anncEndDate2).isAfter(anncStartDate2, 'day'))) {
          this.isValidAnncEDate = true;
        } else {
          this.isValidAnncEDate = false;
        }
      }
    }
  }

  onChangeEndDate($event: any) {
    this.basicFormGroup.controls['auctionEndDate'].setValue($event.target.value);
  }
  
  async getAuctionDetails(ObjectId: string, DraftId: string) {
    this.showLoader = true;
    this.auctionDetailsSubscription$ = await this.auctionServc.getAuctionDetails(ObjectId, DraftId).subscribe((auctionDetailsResp: any) => {
      this.auctionDetails = auctionDetailsResp.d.results[0];
      if (this.ViewMode == 'edit' || this.ViewMode == 'view' || (this.ObjectId || this.DraftId)) {
        this.refreshCalendarCntrl();
        this.mappingObjForEdit();
        this.createForm();
      }
      this.showLoader = false;
      // this.createForm();
      // this.editForm();
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionDetails RespError : ', error);
    });
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

  public getAuctionType(code: string) {
    if (code === 'Public') {
      return 'O';
    } else if (code === 'Private') {
      return 'C';
    } else {
      return '';
    }
  }

  public mappingObjForEdit() {
    this.auctionItem.auctionType = this.getAuctionTypeDesc(this.auctionDetails.BidType);
    this.auctionItem.auctionSubType = this.auctionDetails.ZzCloseInd;
    this.auctionItem.prevRefNo = this.auctionDetails.ZzPrevAucId1;
    this.auctionItem.auctionName = this.auctionDetails.Description;
    this.auctionItem.auctionProduct = this.auctionDetails.ZzAucProduct;
    this.auctionItem.auctionManager = this.auctionDetails.AucModerator;
    this.auctionItem.auctionDesc = this.auctionDetails.ZzAucDesc;
    // this.auctionItem.reasonPrivateAuction = this.auctionDetails.Description;
    // this.auctionItem.reason = this.auctionDetails.Description;
    this.auctionItem.auctionStartDate = this.auctionDetails.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    this.auctionItem.auctionEndDate = this.auctionDetails.ZzAucEndDt ? this.auctionDetails.ZzAucEndDt !== 0 ? moment(this.auctionDetails.ZzAucEndDt.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    this.auctionItem.auctionStartTime = this.auctionDetails.ZzAucSrtDt ? this.auctionDetails.ZzAucSrtDt !== 0 ? moment(this.auctionDetails.ZzAucSrtDt.split(" ")[1], 'HH:mm:ss').format('hh:mm A') : '' : '';
    this.auctionItem.auctionEndTime = this.auctionDetails.ZzAucEndDt ? this.auctionDetails.ZzAucEndDt !== 0 ? moment(this.auctionDetails.ZzAucEndDt.split(" ")[1], 'HH:mm:ss').format('hh:mm A') : '' : '';
    this.auctionItem.startAuction = this.auctionDetails.ZzStartMethod;
    this.auctionItem.auctionAnncStartDate = this.auctionDetails.ZzAnncSrtD ? this.auctionDetails.ZzAnncSrtD !== 0 ? moment(this.auctionDetails.ZzAnncSrtD.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    this.auctionItem.auctionAnncEndDate = this.auctionDetails.ZzAnncEndD ? this.auctionDetails.ZzAnncEndD !== 0 ? moment(this.auctionDetails.ZzAnncEndD.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD') : '' : '';
    this.auctionItem.startPrice = this.auctionDetails.ZzBidSrtPrice;
    this.auctionItem.lowBidValue = this.auctionDetails.ZzLowBidVl;
    this.auctionItem.gnteePercentage = this.auctionDetails.ZzIbgaPercent;
    this.auctionItem.finalGntee = this.auctionDetails.ZzFbgaDeadline;
    // this.auctionItem.finalGnteeUnit = this.auctionDetails.Description;
    this.auctionItem.commissionType = this.auctionDetails.ZzCommisionTyp;
    this.auctionItem.pursuitPerCommission = this.auctionDetails.ZzCommPercent;
    // this.auctionItem.auctionAttachement = this.auctionDetails.listtoattachnav['results'];


    return this.auctionItem;
  }

  createForm() {
    this.basicFormGroup = this.formBuilder.group({
      auctionType: new FormControl(this.auctionItem.auctionType ? this.auctionItem.auctionType : 'Public'),
      auctionSubType: new FormControl(this.auctionItem.auctionSubType ? this.auctionItem.auctionSubType : 'C'),
      prevRefNo: new FormControl(this.auctionItem.prevRefNo ? this.auctionItem.prevRefNo : ''),  // for Private
      auctionName: new FormControl(this.auctionItem.auctionName ? this.auctionItem.auctionName : ''),
      auctionProduct: new FormControl(this.auctionItem.auctionProduct ? this.auctionItem.auctionProduct : ''),
      auctionManager: new FormControl(this.auctionItem.auctionManager ? this.auctionItem.auctionManager : ''),
      auctionDesc: new FormControl(this.auctionItem.auctionDesc ? this.auctionItem.auctionDesc : ''),
      reasonPrivateAuction: new FormControl(this.auctionItem.reasonPrivateAuction ? this.auctionItem.reasonPrivateAuction : ''), // for Private
      reason: new FormControl(this.auctionItem.reason ? this.auctionItem.reason : ''), // for Private
      auctionStartDate: new FormControl(this.auctionItem.auctionStartDate ? this.auctionItem.auctionStartDate : ''),
      auctionEndDate: new FormControl(this.auctionItem.auctionEndDate ? this.auctionItem.auctionEndDate : ''),
      auctionStartTime: new FormControl(this.auctionItem.auctionStartTime ? this.auctionItem.auctionStartTime : ''),
      auctionEndTime: new FormControl(this.auctionItem.auctionEndTime ? this.auctionItem.auctionEndTime : ''),
      startAuction: new FormControl(this.auctionItem.startAuction ? this.auctionItem.startAuction : 'T'),
      auctionAnncStartDate: new FormControl(this.auctionItem.auctionAnncStartDate ? this.auctionItem.auctionAnncStartDate : ''),
      auctionAnncEndDate: new FormControl(this.auctionItem.auctionAnncEndDate ? this.auctionItem.auctionAnncEndDate : ''),
      startPrice: new FormControl(this.auctionItem.startPrice ? this.auctionItem.startPrice : ''),
      lowBidValue: new FormControl(this.auctionItem.lowBidValue ? this.auctionItem.lowBidValue : ''),
      gnteePercentage: new FormControl(this.auctionItem.gnteePercentage ? this.auctionItem.gnteePercentage : '2'),
      finalGntee: new FormControl(this.auctionItem.finalGntee ? this.auctionItem.finalGntee : '15'),
      commissionType: new FormControl(this.auctionItem.commissionType ? this.auctionItem.commissionType : ''),
      pursuitPerCommission: new FormControl(this.auctionItem.pursuitPerCommission ? this.auctionItem.pursuitPerCommission : ''),
      auctionAttachement: new FormArray((this.auctionItem.auctionAttachement ? this.auctionItem.auctionAttachement : [])),
    });
    if (this.ViewMode == 'view') {
      this.basicFormGroup.disable();
      this.basicFormGroup.get('auctionType')?.disable();
      this.basicFormGroup.get('auctionSubType')?.disable();
      this.basicFormGroup.get('prevRefNo')?.disable();
      this.basicFormGroup.get('auctionName')?.disable();
      this.basicFormGroup.get('auctionProduct')?.disable();
      this.basicFormGroup.get('auctionManager')?.disable();
      this.basicFormGroup.get('auctionDesc')?.disable();
      this.basicFormGroup.get('reasonPrivateAuction')?.disable();
      this.basicFormGroup.get('reason')?.disable();
      this.basicFormGroup.get('auctionStartDate')?.disable();
      this.basicFormGroup.get('auctionEndDate')?.disable();
      this.basicFormGroup.get('auctionStartTime')?.disable();
      this.basicFormGroup.get('auctionEndTime')?.disable();
      this.basicFormGroup.get('startAuction')?.disable();
      this.basicFormGroup.get('auctionAnncStartDate')?.disable();
      this.basicFormGroup.get('auctionAnncEndDate')?.disable();
      this.basicFormGroup.get('startPrice')?.disable();
      this.basicFormGroup.get('lowBidValue')?.disable();
      this.basicFormGroup.get('gnteePercentage')?.disable();
      this.basicFormGroup.get('finalGntee')?.disable();
      this.basicFormGroup.get('commissionType')?.disable();
      this.basicFormGroup.get('pursuitPerCommission')?.disable();
    }
    this.basicFormGroup.get('gnteePercentage')?.disable();
    if (this.auctionDetails?.listtoattachnav['results']) {
      while (this.auctionAttachement.length !== 0) {
        this.auctionAttachement.removeAt(0)
      }
      this.auctionDetails.listtoattachnav['results'].forEach((value: any, index: any, array: any) => {
        if (value.ObjectType == "/AuctionDocuments") {
          value.name = value.FileName + value.FileExt;
          var fileupload = {
            "name": value.FileName + '.' + value.FileExt,
            "size": '',
            "type": '',
            "filesrc": '',
            "FilenetId": value.FilenetId,
            "MIMEType": value.MIMEType
          };
          this.files.push(fileupload);
          this.auctionAttachement.push(new FormControl(fileupload));
          this.navigateToPage(1, 'auctionAttach');
        }
      })
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.basicFormGroup.controls;
  }

  makeConsole(val: string) {
  }

  model: any;
  changeSelect(e: any, dd: string) {
    if (e.target.value != '') {
      this.basicFormGroup.controls[dd].setValue(e.target.value, {
        onlySelf: true
      })
    }
  }


  get auctionAttachement(): FormArray {
    return this.basicFormGroup.get('auctionAttachement') as FormArray;
  }

  selectFiles(e: any, dd: string): void {
    this.invalidFileSize = false;
    let filecount = e.target.files.length;
    // if (e.target.files && filecount <= this.maxFileCount) {
      this.customLoop(0, filecount, e.target.files);
    // } else {
    // }
  }
  customLoop(index: number, limit: number, file: any) {
    let filesize = file[index]['size'];

    if (filesize <= 2097152) {
      // if (this.auctionAttachement['controls'].length < this.maxFileCount) {
        // var fileupload: {[k: string]: any} = {};
        this.FilePushTOArray(file[index], (filesrc: any) => {
          var fileupload = {
            "name": file[index]['name'],
            "size": file[index]['size'],
            "type": file[index]['type'],
            "filesrc": [filesrc]
          };
          if (index < limit - 1) {
            this.customLoop(++index, limit, file);
          }
          this.files.push(fileupload);
          this.auctionAttachement.push(new FormControl(fileupload));
          this.navigateToPage(1, 'auctionAttach');
        });
      }
      console.log('auctionAttachement ', this.auctionAttachement);
    // } else {
    //   this.invalidFileSize = true;
    // }
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

  public addFiles(files: any) {
    return Promise.all([].map.call(files, function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve({ result: reader.result, file: file });
        };
        reader.readAsArrayBuffer(file);
      });
    })).then(function (results) {
      return results;
    });
  }

  navigateToPage(pageNoVal: number, section: string) {
    this.PaginationServc.setPagerValues(
      this.auctionAttachement.length,
      10,
      pageNoVal
    );
    if (section == 'auctionAttach') {
      this.pageRangeForAttach = {
        rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * 10),
        rangeEnd: pageNoVal == 1 ? 9 : ((pageNoVal - 1) * 10) + 9,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
      }
    }
  }

  removeFile(file: any, index: number, currentPage: number) {
    this.invalidFileSize = false;
    if (file.FilenetId) {
      // this.showAlertModal = true;
      this.showLoader = true;
      this.auctionServc.deleteAuctionImages(file.FilenetId).subscribe((deleteAuctionImagesResp: any) => {
        console.log(deleteAuctionImagesResp);
        this.showLoader = false;
        this.files.splice(index, 1);
        this.auctionAttachement.removeAt(index);
        this.navigateToPage(currentPage, 'auctionAttach');
      }, (error) => {
        this.showLoader = false;
        console.log('deleteAuctionImagesResp RespError : ', error);
      });
    } else {
      this.files.splice(index, 1);
      this.auctionAttachement.removeAt(index);
      this.navigateToPage(currentPage, 'auctionAttach');
    }
  }

  public setValidation(e: any) {
    const val = e.target.value;
    if (val === 'Public') {
      this.basicFormGroup.controls['reasonPrivateAuction'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionStartDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionStartTime'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndTime'].setValidators([Validators.required]);
    } else if (val === 'Private') {
      this.basicFormGroup.controls['reasonPrivateAuction'].clearValidators();
      this.basicFormGroup.controls['auctionStartDate'].clearValidators();
      this.basicFormGroup.controls['auctionEndDate'].clearValidators();
      this.basicFormGroup.controls['auctionStartTime'].clearValidators();
      this.basicFormGroup.controls['auctionEndTime'].clearValidators();
    }
    this.basicFormGroup.updateValueAndValidity();
  }

  viewAttachment(file: any, index:any) {
    if (file.FilenetId) {
      this.activeFileDownloadIndex = index;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe((downloadAuctionImagesResp: any) => {
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
        window.open(fileURL, '_blank');
        this.activeFileDownloadIndex = -1;
        // window.open(fileContent, "_blank");
      }, (error) => {
        this.showLoader = false;
        this.activeFileDownloadIndex = -1;
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

      console.log('fileURL', blob);
      let fileURL = window.URL.createObjectURL(blob);
      if ((file.type.indexOf('image') > -1) || (file.type.indexOf('video') > -1) || fileType === 'docx' || fileType === 'doc' || fileType === 'pdf') {
        this.showViewAttachmentsModal = false;
        console.log('fileURL', fileURL);
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

  /**
   * getFileURL
   */
  public getFileURL(file: any) {
    var byteString = btoa(file.filesrc);
    return byteString;
  }

  public onSubmit(submitSrc: string) {
    // this.showLoader = true;

    let startDate = this.basicFormGroup.controls['auctionStartDate'].value;
    let endDate = this.basicFormGroup.controls['auctionEndDate'].value;
    let anncStartDate = this.basicFormGroup.controls['auctionAnncStartDate'].value;
    let anncEndDate = this.basicFormGroup.controls['auctionAnncEndDate'].value;
    if (startDate && endDate) {
      if ((moment(startDate).isAfter(endDate, 'day'))) {
        this.isValidAuctionDate = true;
        return;
      }
    }
    if (startDate && anncStartDate) {
      if ((moment(startDate).isAfter(anncStartDate, 'day'))) {
        this.isValidAnncSDate = true;
        return;
      }
    }
    if (endDate && anncEndDate) {
      if ((moment(anncEndDate).isAfter(endDate, 'day'))) {
        this.isValidAnncEDate = true;
        return;
      }
    }

    this.submitted = true;

    if (submitSrc === 'save') {
      this.validateFormControls(submitSrc);
      this.atLeastOneRequired = false;
      if (this.basicFormGroup.status === 'VALID') {
        this.showSaveBtnLoader = true;
        const auctiondetail = this.generateAuctionDetailFormat(this.basicFormGroup.value);

        this.auctionServc.createAuction(auctiondetail).subscribe((auctionDetailsResp: any) => {
          // alert('Auction is Saved Successfully. Please Continue...');
          this.DraftId = auctionDetailsResp.d.DraftId;
          this.ObjectId = auctionDetailsResp.d.DraftId;
          let auctionCreateResp = {
            DraftId: this.DraftId,
            ObjectId: this.ObjectId,
          }
          this.auctionCreateResp.emit(auctionCreateResp);
          // fileNet Services
          if (this.auctionAttachement['controls'].length > 0) {
            this.auctionAttachmentsUploads(submitSrc, auctionCreateResp);
            // this.auctionAttachmentsUploadsTest();
          } else {
            this.showSaveBtnLoader = false;
            this.activeStep++;
            this.changeSteps.emit(this.activeStep);
          }
        }, (error) => {
          this.showSaveBtnLoader = false;
          console.log('createAuction RespError : ', error);
        });
      }
    } else if (submitSrc === 'saveasdraft') {
      this.validateFormControls(submitSrc);
      if (this.isSaveasdraftValid()) {
        if (this.basicFormGroup.status === 'VALID') {
          this.showSaveasdraftBtnLoader = true;
          const auctiondetail = this.generateAuctionDetailFormat(this.basicFormGroup.value);
          console.log("auctiondetail final format ", auctiondetail);
          this.auctionServc.createAuction(auctiondetail).subscribe((auctionDetailsResp: any) => {
            console.log('createAuction Resp ', auctionDetailsResp);
            // alert('Auction is Saved as Draft Successfully');
            this.DraftId = auctionDetailsResp.d.DraftId;
            this.ObjectId = auctionDetailsResp.d.DraftId;
            let auctionCreateResp = {
              DraftId: auctionDetailsResp.d.DraftId,
              ObjectId: auctionDetailsResp.d.ObjectId,
            }
            this.auctionCreateResp.emit(auctionCreateResp);
            if (this.auctionAttachement['controls'].length > 0) {
              this.auctionAttachmentsUploads(submitSrc, auctionCreateResp);
            } else {
              console.log('auctionCreateResp', auctionCreateResp);
              this.auctionCreateResp.emit(auctionCreateResp);
              this.showSaveasdraftBtnLoader = false;
              this.showSuccessfulModal = true;
            }
          }, (error) => {
            this.showSaveasdraftBtnLoader = false;
            console.log('createAuction RespError : ', error);
          });
        }
        // this.activeStep ++;
        // this.changeSteps.emit(this.activeStep);
      }
    }
    this.basicFormGroup.controls['startAuction'].clearValidators();
    this.basicFormGroup.controls['auctionAnncStartDate'].clearValidators();
    this.basicFormGroup.controls['auctionAnncEndDate'].clearValidators();
    this.basicFormGroup.controls['startPrice'].clearValidators();
    this.basicFormGroup.controls['lowBidValue'].clearValidators();
    this.basicFormGroup.controls['gnteePercentage'].clearValidators();
    this.basicFormGroup.controls['finalGntee'].clearValidators();
    this.basicFormGroup.controls['pursuitPerCommission'].clearValidators();
    this.basicFormGroup.controls['auctionName'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionProduct'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionManager'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionDesc'].updateValueAndValidity();
    this.basicFormGroup.controls['reasonPrivateAuction'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionStartDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionEndDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionStartTime'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionEndTime'].updateValueAndValidity();
    this.basicFormGroup.controls['prevRefNo'].updateValueAndValidity();
    this.basicFormGroup.controls['startAuction'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionAnncStartDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionAnncEndDate'].updateValueAndValidity();
    this.basicFormGroup.controls['startPrice'].updateValueAndValidity();
    this.basicFormGroup.controls['lowBidValue'].updateValueAndValidity();
    this.basicFormGroup.controls['gnteePercentage'].updateValueAndValidity();
    this.basicFormGroup.controls['finalGntee'].updateValueAndValidity();
    this.basicFormGroup.controls['commissionType'].updateValueAndValidity();
    this.basicFormGroup.controls['pursuitPerCommission'].updateValueAndValidity();
    this.basicFormGroup.updateValueAndValidity();
  }

  auctionAttachmentsUploads(submitSrc: any, auctionCreateResp: any) {
    let fileNetAuctionDetail: any;
    let filestoUpload = this.auctionAttachement.value.filter(function (file: any) { return (file.filesrc['0'] && !file.FilenetId) })
    console.log('filestoUpload ', filestoUpload);

    let observables = new Array();

    if (filestoUpload.length > 0) {
      for (let i = 0; i < filestoUpload.length; i++) {
        let file = filestoUpload[i];
        fileNetAuctionDetail = {
          "FileName": file.name.split('.')[0],
          // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
          "FileContent": btoa(file.filesrc),
          "MIMEType": file.type,
          "FileLength": '' + file.size,
          "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
          "Version": "1.0",
          "ObjectType": "/AuctionDocuments",
          "ObjectId": this.ObjectId,
        };
        console.log("File detail");
        console.log(fileNetAuctionDetail);
        observables.push(this.auctionServc.uploadAuctionImages(fileNetAuctionDetail));
      }

      forkJoin(observables).subscribe((res: any) => {
        console.log('forkJoin Res ', res);
        if (submitSrc == "saveasdraft") {
          this.showSaveasdraftBtnLoader = false;
          this.showSuccessfulModal = true;

          this.getAuctionDetails(this.ObjectId, this.DraftId);
        } else {
          this.showSaveBtnLoader = false;
          this.activeStep++;
          this.changeSteps.emit(this.activeStep);
        }
      }, (error: any) => {
        console.log('forkJoin Error ', error);
        this.showSaveBtnLoader = false;
        this.getAuctionDetails(this.ObjectId, this.DraftId);
      });  
    } else {
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    }
  }

  // async auctionAttachmentsUploads(submitSrc: any, auctionCreateResp: any) {
  //   let fileNetAuctionDetail: any;
  //   let filestoUpload = this.auctionAttachement.value.filter(function (file: any) { return (file.filesrc['0'] && !file.FilenetId) })
  //   console.log('filestoUpload ', filestoUpload);

  //   const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
  //   if (filestoUpload.length > 0) {
  //     for (let i = 0; i < filestoUpload.length; i++) {
  //       let file = filestoUpload[i];
  //       fileNetAuctionDetail = {
  //         "FileName": file.name.split('.')[0],
  //         // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
  //         "FileContent": btoa(file.filesrc),
  //         "MIMEType": file.type,
  //         "FileLength": '' + file.size,
  //         "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
  //         "Version": "1.0",
  //         "ObjectType": "/AuctionDocuments",
  //         "ObjectId": this.ObjectId,
  //       };
  //       await timer(3000);
  //       console.log("File detail");
  //       console.log(fileNetAuctionDetail);
  //       this.auctionServc.uploadAuctionImages(fileNetAuctionDetail).subscribe(
  //         (data) => {
  //           console.log(i + "-success");
  //           if (i + 1 == filestoUpload.length) {
  //             if (submitSrc == "saveasdraft") {
  //               console.log('auctionCreateResp', auctionCreateResp);
  //               this.auctionCreateResp.emit(auctionCreateResp);
  //               this.showSaveasdraftBtnLoader = false;
  //               this.showSuccessfulModal = true;
  //             } else {
  //               console.log("upload done");
  //               this.showSaveBtnLoader = false;
  //               this.activeStep++;
  //               this.changeSteps.emit(this.activeStep);
  //             }
  //           }
  //         }, (error) => {
  //           console.log(i + "-fail");
  //           this.showSaveBtnLoader = false;
  //           this.activeStep++;
  //           this.changeSteps.emit(this.activeStep);
  //         }
  //       )
  //     }
  //   } else {
  //     if (submitSrc == "saveasdraft") {
  //       console.log('auctionCreateResp', auctionCreateResp);
  //       this.auctionCreateResp.emit(auctionCreateResp);
  //       this.showSaveasdraftBtnLoader = false;
  //       this.showSuccessfulModal = true;
  //     } else {
  //       console.log("upload done");
  //       this.showSaveBtnLoader = false;
  //       this.activeStep++;
  //       this.changeSteps.emit(this.activeStep);
  //     }
  //   }
  // }

  // async auctionAttachmentsUploadsTest() {
  //   let fileNetAuctionDetail: any;
  //   let filestoUpload = this.auctionAttachement.value.filter(function (file: any) { return (file.filesrc['0'] && !file.FilenetId) })
  //   console.log('filestoUpload ', filestoUpload);
  //   const promises: any = [];
  //   filestoUpload.forEach((file: any) => {
  //     fileNetAuctionDetail = {
  //       "FileName": file.name.split('.')[0],
  //       "FileContent": btoa(file.filesrc),
  //       "MIMEType": file.type,
  //       "FileLength": '' + file.size,
  //       "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
  //       "Version": "1.0",
  //       "ObjectType": "/AuctionDocuments",
  //       "ObjectId": this.ObjectId,
  //     };
  //     promises.push(
  //       this.makeAPICall(fileNetAuctionDetail)
  //     );
  //   });
  //   await (Promise as any).allSettled(promises).then(
  //     (results: any) => results.forEach(
  //       (result :any) => {
  //         console.log('Status', result.status);
  //         this.showSaveBtnLoader = false;
  //         this.activeStep++;
  //         this.changeSteps.emit(this.activeStep);
  //       })
  //     );
    
  //   // return forkJoin(
  //   //   filestoUpload.map(async (file: any, index: number) => {
  //   //     var prefix = (file.name.split('.')[0]).replace(/[^\w\s]/g, '').replace(' ', '') + "-" + this.DraftId;
  //   //     fileNetAuctionDetail = {
  //   //       "FileName": file.name.split('.')[0],
  //   //       // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
  //   //       "FileContent": btoa(file.filesrc),
  //   //       "MIMEType": file.type,
  //   //       "FileLength": '' + file.size,
  //   //       "FileExt": file.name.substring(file.name.lastIndexOf('.')).replace('.', ''),
  //   //       "Version": "1.0",
  //   //       "ObjectType": "/AuctionDocuments",
  //   //       "ObjectId": this.ObjectId,
  //   //     };
  //   //     const uploadDocWithDocIdRes = await this.makeAPICall(fileNetAuctionDetail);
  //   //     return uploadDocWithDocIdRes;
  //   //   })
  //   // );
  //   // seqJoin.subscribe((fileNetResp: any) => {
  //   //   console.log('fileNetResp', fileNetResp);
  //   //   debugger;
  //   //   this.showSaveBtnLoader = false;
  //   //   this.activeStep++;
  //   //   this.changeSteps.emit(this.activeStep);
  //   // }, (error: any) => {
  //   //   this.showSaveBtnLoader = false;
  //   //   console.log('createAuction RespError : ', error);
  //   // });
  //   // this.showSaveBtnLoader = false;
  //   // this.activeStep ++;
  //   // this.changeSteps.emit(this.activeStep);
  // }

  makeAPICall(fileNetAuctionDetail: any) {
    console.log('makeAPICall');
    return this.auctionServc.uploadAuctionImages(fileNetAuctionDetail).subscribe(
      (data) => {
        console.log('auctionCreateResp', data);
      }, (error) => {
        this.showSaveBtnLoader = false;
        this.activeStep++;
        this.changeSteps.emit(this.activeStep);
      }
    )
  }

  generateFileName(prefix: string) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var month = month + 1;
    return prefix + "-" + date.getTime() + "-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  /**
   * isSaveasdraftValid
   */
  public isSaveasdraftValid(): boolean {
    if (
      this.form['auctionName'].value !== '' ||
      this.form['auctionProduct'].value !== '' ||
      this.form['auctionManager'].value !== '' ||
      this.form['auctionDesc'].value !== '' ||
      this.form['auctionStartDate'].value !== '' ||
      this.form['auctionEndDate'].value !== '' ||
      this.form['auctionStartTime'].value !== '' ||
      this.form['auctionEndTime'].value !== ''
    ) {
      this.atLeastOneRequired = false;
      return true;
    } else {
      this.atLeastOneRequired = true;
      return false;
    }
  }

  public validateFormControls(submitType: string) {
    if (submitType === 'save') {
      this.basicFormGroup.controls['auctionName'].setValidators([Validators.required, Validators.minLength(4)]);
      this.basicFormGroup.controls['auctionProduct'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionManager'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionDesc'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionStartDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionStartTime'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndTime'].setValidators([Validators.required]);
      this.basicFormGroup.controls['commissionType'].setValidators([Validators.required]);
      if (this.basicFormGroup.controls['auctionType'].value === 'Private') {
        this.basicFormGroup.controls['prevRefNo'].setValidators([Validators.required]);
        this.basicFormGroup.controls['reasonPrivateAuction'].setValidators([Validators.required]);
      } else {
        this.basicFormGroup.controls['prevRefNo'].clearValidators();
        this.basicFormGroup.controls['reasonPrivateAuction'].clearValidators();
      }
    } else if (submitType === 'saveasdraft') {
      this.basicFormGroup.controls['auctionName'].setValidators([Validators.required, Validators.minLength(4)]);
      this.basicFormGroup.controls['auctionProduct'].clearValidators();
      this.basicFormGroup.controls['auctionManager'].clearValidators();
      this.basicFormGroup.controls['auctionDesc'].clearValidators();
      this.basicFormGroup.controls['reasonPrivateAuction'].clearValidators();
      this.basicFormGroup.controls['auctionStartDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndDate'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionStartTime'].setValidators([Validators.required]);
      this.basicFormGroup.controls['auctionEndTime'].setValidators([Validators.required]);
      this.basicFormGroup.controls['commissionType'].setValidators([Validators.required]);
      this.basicFormGroup.controls['prevRefNo'].clearValidators();
    }
    this.basicFormGroup.controls['startAuction'].clearValidators();
    this.basicFormGroup.controls['auctionAnncStartDate'].clearValidators();
    this.basicFormGroup.controls['auctionAnncEndDate'].clearValidators();
    this.basicFormGroup.controls['startPrice'].clearValidators();
    this.basicFormGroup.controls['lowBidValue'].clearValidators();
    this.basicFormGroup.controls['gnteePercentage'].clearValidators();
    this.basicFormGroup.controls['finalGntee'].clearValidators();
    this.basicFormGroup.controls['pursuitPerCommission'].clearValidators();
    this.basicFormGroup.controls['auctionName'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionProduct'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionManager'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionDesc'].updateValueAndValidity();
    this.basicFormGroup.controls['reasonPrivateAuction'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionStartDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionEndDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionStartTime'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionEndTime'].updateValueAndValidity();
    this.basicFormGroup.controls['prevRefNo'].updateValueAndValidity();
    this.basicFormGroup.controls['startAuction'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionAnncStartDate'].updateValueAndValidity();
    this.basicFormGroup.controls['auctionAnncEndDate'].updateValueAndValidity();
    this.basicFormGroup.controls['startPrice'].updateValueAndValidity();
    this.basicFormGroup.controls['lowBidValue'].updateValueAndValidity();
    this.basicFormGroup.controls['gnteePercentage'].updateValueAndValidity();
    this.basicFormGroup.controls['finalGntee'].updateValueAndValidity();
    this.basicFormGroup.controls['commissionType'].updateValueAndValidity();
    this.basicFormGroup.controls['pursuitPerCommission'].updateValueAndValidity();
    this.basicFormGroup.updateValueAndValidity();
  }

  public generateAuctionDetailFormat(obj: any) {
    console.log('generateAuctionDetailFormat ', obj);
    let auctionList = {
      SaveAsDraft: "X",
      DraftId: this.DraftId ? this.DraftId : '',
      ObjectId: this.ObjectId ? this.ObjectId : '',
      BidType: this.getAuctionType(obj.auctionType),
      ZzCloseInd: obj.auctionSubType,
      ZzPrevAucId1: obj.prevRefNo, // for Private
      Description: obj.auctionName,
      ZzAucProduct: obj.auctionProduct,
      AucModerator: obj.auctionManager,
      ZzAucDesc: obj.auctionDesc,
      ZzPrtReason: obj.reasonPrivateAuction,
      ZzOtherNote: obj.reason,
      ZzAucSrtDt: (obj.auctionStartDate ? moment(obj.auctionStartDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '') + (obj.auctionStartTime ? " " + moment(obj.auctionStartTime, 'h:m:s A').format('HH:mm:ss') : ''),
      ZzAucEndDt: (obj.auctionEndDate ? moment(obj.auctionEndDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '') + (obj.auctionEndTime ? " " + moment(obj.auctionEndTime, 'h:m:s A').format('HH:mm:ss') : ''),
      ZzStartMethod: obj.startAuction,
      ZzAnncSrtD: obj.auctionAnncStartDate ? moment(obj.auctionAnncStartDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      ZzAnncEndD: obj.auctionAnncEndDate ? moment(obj.auctionAnncEndDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : '',
      ZzBidSrtPrice: obj.startPrice,
      ZzLowBidVl: obj.lowBidValue,
      ZzIbgaPercent: '2', // HardCoded to 2, need to changed in future
      ZzFbgaDeadline: obj.finalGntee,
      ZzCommisionTyp: obj.commissionType,
      ZzCommPercent: obj.pursuitPerCommission,
      listtoproductnav: [{}],
      // listtoattachnav : {}
    }
    return auctionList;
  }

  public back() {
    this.activeStep--;
    this.changeSteps.emit(this.activeStep);
    this.changeauctiontype.emit(this.auctionStatus = "auctionlist");
  }

  public edit($tring: any) {
    // this.color = getRandomColor();
  };

  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showSuccessfulModal = false;
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

  public closeDeleteSuccessfulModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showDeleteSuccessfulModal = true;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showDeleteSuccessfulModal = false;
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
}
