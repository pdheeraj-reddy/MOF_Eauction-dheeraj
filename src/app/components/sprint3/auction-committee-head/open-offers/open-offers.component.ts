import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-open-offers',
  templateUrl: './open-offers.component.html',
  styleUrls: ['./open-offers.component.scss']
})
export class OpenOffersComponent implements OnInit {
  openofferListData: any;
  pagelimit: number = 10;

  auctionId: string = '';
  offervalue: string;
  facilityname: string;
  commercialNo: string;
  //filter Form controls
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];

  filterFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public bidderService: BidderService,
  ) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('auctionId') || '';
    this.filterForm();
    this.getOffersData(1);
  }

  getOffersData(pageNumber: number) {
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    const filters = {
      status: this.filterFormGroup.controls['status'].value ? this.filterFormGroup.controls['status'].value : '',
      type: this.filterFormGroup.controls['type'].value ? this.filterFormGroup.controls['type'].value : '',
    };
    this.bidderService.getOfferList(page, filters, this.auctionId).subscribe((res: any) => {
      this.mapping(res.body);
    });

  }

  public mapping(serverObj: any) {
    if (serverObj.d.results?.length) {
      let results = serverObj.d.results[0];
      console.log('results: ', results);
      let resultSet: any = [];
      if (results) {
        results.forEach((result: any) => {
          const items = {
            serialNo: result['Sno'] ? result['Sno'] : '-',
            offerValue: result['OfferValue'] ? result['OfferValue'] : '-',
            primaryWarranty: '',
            submissionDate: result['DtTime'] ? result['DtTime'] : '-',
            submissionTime: result['DtTime'] ? result['DtTime'] : '-',
            facilityName: result['BidderName'] ? result['BidderName'] : '-',
            commercialRegistrationNo: result['CrNo'] ? result['CrNo'] : '-',
            // auctionType: result['BidType'] ? this.getAuctionTypeDesc(result['BidType']) : '',
          };
          resultSet.push(items);
        });
      }
      this.openofferListData = resultSet;
    }
  }

  viewAttachment() {
    // console.log(file);
    // console.log(file.type);
    // const fileType = file.name.split(".").pop()?.toLowerCase();
    // var byteString = atob(file.filesrc['0'].split(',')[1]);
    // var ab = new ArrayBuffer(byteString.length);
    // var ia = new Uint8Array(ab);
    // for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    // }
    // const blob = new Blob([ab], { type: file.type });
    // let fileURL = window.URL.createObjectURL(blob);
    // if((file.type.indexOf('image')> -1) || (file.type.indexOf('video')> -1) || fileType === 'docx' || fileType === 'doc'|| fileType === 'pdf'){
    //   console.log();
    //   this.showViewAttachmentsModal = false;
    //   window.open(fileURL, '_blank');
    // }
  }

  acceptOffer(data: any) {
    this.offervalue = data.offerValue;
    this.facilityname = data.facilityName;
    this.commercialNo = data.commercialRegistrationNo;
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  // -------------------------------------- filter code --------------------------------

  filterForm() {
    this.filterFormGroup = this.formBuilder.group({
      status: new FormControl(''),
      type: new FormControl(''),
    });
  }
  public toggleFilter() {
    this.resetFilter();
    this.showFilterForm = !this.showFilterForm;
  }

  resetFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
  }

  applyFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
    this.getOffersData(1);
  }

  changeSelect(e: any, dd: string) {
    console.log('changeSelect');
    console.log(e.target.value);
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true,
    });
  }

  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.getOffersData(selectedPageNumber);
    window.scrollTo(0, 100);
    this.PaginationServc.resetSorting();
  }

}
