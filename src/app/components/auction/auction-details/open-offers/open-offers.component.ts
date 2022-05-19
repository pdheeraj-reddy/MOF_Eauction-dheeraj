import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-open-offers',
  templateUrl: './open-offers.component.html',
  styleUrls: ['./open-offers.component.scss']
})
export class OpenOffersComponent implements OnInit {

  openofferListData: any;
  pagelimit: number = 10;

  offervalue: string;
  facilityname: string;
  commercialNo: string
  //filter Form controls
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];

  // form group

  filterFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService
  ) { }

  public arrayofobject = [
    {
      serialNo: '1',
      offerValue: '4,400,000 SAR',
      primaryWarranty: 'The file name is long... ',
      submissionDate: '2022-01-01',
      submissionTime: '02:31 PM',
      facilityName: 'Hammat Trading Est',
      commercialRegistrationNo: '7003884440975',
      offerStatus: 'awaiting approval',
    },
    {
      serialNo: '2',
      offerValue: '4,000,000 SAR',
      primaryWarranty: 'attached file',
      submissionDate: '2022-01-01',
      submissionTime: '02:31 PM',
      facilityName: 'Andalusia companies',
      commercialRegistrationNo: '7003884440975',
      offerStatus: 'published',
    },
    {
      serialNo: '3',
      offerValue: '3,900,000 SAR',
      primaryWarranty: 'attached file',
      submissionDate: '2022-01-01',
      submissionTime: '02:31 PM',
      facilityName: 'Al-Sulaiman Company',
      commercialRegistrationNo: '7003884440975',
      offerStatus: 'paused',
    },
    {
      serialNo: '4',
      offerValue: '3,500,000 SAR',
      primaryWarranty: 'attached file',
      submissionDate: '2022-01-01',
      submissionTime: '02:31 PM',
      facilityName: 'Alshaya & Brothers Foundation',
      commercialRegistrationNo: '7003884440975',
      offerStatus: 'paused',
    }
  ];

  ngOnInit(): void {
    this.filterForm();
    this.openofferListData = this.mapping(this.arrayofobject);
    // this.getAuctionList(1);
  }

  public mapping(results: any) {
    let resultSet: any = [];
    // this.totcntforall = serverObj.d.results[0].TotAll;
    // this.totcntfordraft = serverObj.d.results[0].TotDraft;
    // this.totcntforreadjust = serverObj.d.results[0].TotRejected;
    // this.totcntforupcomming = serverObj.d.results[0].TotPublish;
    // this.totcntforawaiting = serverObj.d.results[0].TotPendingRw;
    results.forEach((result: any) => {
      const items = {
        serialNo: result['serialNo'] ? result['serialNo'] : '',
        offerValue: result['offerValue'] ? result['offerValue'] : '',
        primaryWarranty: result['primaryWarranty'] ? result['primaryWarranty'] : '',
        submissionDate: result['submissionDate'] ? result['submissionDate'] === 0 ? result['submissionDate'] : '' : '',
        submissionTime: result['submissionTime'] ? result['submissionTime'] : '',
        facilityName: result['facilityName'] ? result['facilityName'] : '',
        commercialRegistrationNo: result['commercialRegistrationNo'] ? result['commercialRegistrationNo'] : '',
        // auctionType: result['BidType'] ? this.getAuctionTypeDesc(result['BidType']) : '',
      }
      resultSet.push(items);
    });
    return resultSet;
  }


  // getAuctionList(pageNumber?: number){
  //   const pageNoVal = '' + pageNumber;
  //   const page = {
  //     pageNumber : pageNumber,
  //     pageLimit : this.pagelimit
  //   };
  //   const filters = {
  //     status  : this.filterFormGroup.controls['status'].value,
  //     type    : this.filterFormGroup.controls['type'].value,
  //   };

  // }

  // view attachement
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
    console.log("filterFormGroup");
  }
  public toggleFilter() {
    console.log("toggleFilter");
    this.showFilterForm = !this.showFilterForm;
  }

  resetFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
    // this.getAuctionList(1);
  }

  applyFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
    // this.getAuctionList(1);
  }
  changeSelect(e: any, dd: string) {
    console.log("changeSelect");
    console.log(e.target.value)
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true
    })
  }
}
