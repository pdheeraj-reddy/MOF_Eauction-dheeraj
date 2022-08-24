import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EnvService } from 'src/app/env.service';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionList } from '../../interface/bidder.interface';
declare var $: any;

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  auctionListData: AuctionList[] = [];
  showFilterForm : boolean;
  filterFormGroup: FormGroup;
  selectedPageNumber: number;
  showPagination: boolean;
  showLoader: boolean;
  constructor(
    public envService: EnvService,
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }
  toggleFilter(){
    if (this.showFilterForm) {
      this.resetFilter();
    }
    this.showFilterForm = !this.showFilterForm;
    this.refreshCalendarCntrl();
  }
  ngOnInit(): void {
    this.auctionListData = this.mappingObject();
    console.log("🎯TC🎯 ~ file: auction.component.ts ~ line 33 ~ this.auctionListData", this.auctionListData);
    this.defineForm();
  }
  
  mappingObject(){
    let resultSet: AuctionList[] = [];
    for(let i = 0;i<9;i++){
      const items: AuctionList = {
        ObjectId: '50039555',
        title: 'This is the title',
        description: 'This is the description',
        imgsrc: '',
        statuscode: 'Published',
        product: '5',
        auctiondate: '2022-08-22',
        auctiontime: '16:00',
        auctionenddate: '2022-08-23',
        auctionendtime: '17:00',
        auctiontimeSufix: 'evening',
      }
      resultSet.push(items);
    }
    this.PaginationServc.setPagerValues(
      +9,
      9,
      +0
    );
    return resultSet;
  }
  defineForm() {
    this.filterFormGroup = this.formBuilder.group({
      // biddingMethod: new FormControl(''),
      // auctionStatus: new FormControl(''),
      prevRefNo: new FormControl(''),
      // auctionName: new FormControl(''),
      auctionStartDate: new FormControl(''),
      auctionEndDate: new FormControl(''),
    });
  }
  resetFilter(){

  }
  getAuctionList(page:any){

  }
  onChangeStartDate($event: any){
    this.filterFormGroup.controls['auctionStartDate'].setValue($event.target.value);
  }
  onChangeEndDate($event: any){
    this.filterFormGroup.controls['auctionEndDate'].setValue($event.target.value);
  }
  refreshCalendarCntrl() {
    let lang = this.translate.currentLang;
    setTimeout(() => {
      $("#auctionStartDate").unbind().removeData();
      $("#auctionEndDate").unbind().removeData();
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
    }, 100);
  }
  /** Populating the table pagination */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getAuctionList(selectedPageNumber);
    window.scrollTo(0, 100);
    this.PaginationServc.resetSorting();
  }
}
