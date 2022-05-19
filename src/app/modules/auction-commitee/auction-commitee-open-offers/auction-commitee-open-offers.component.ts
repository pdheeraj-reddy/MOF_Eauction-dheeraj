import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-auction-commitee-open-offers',
  templateUrl: './auction-commitee-open-offers.component.html',
  styleUrls: ['./auction-commitee-open-offers.component.scss'],
})
export class AuctionCommiteeOpenOffersComponent implements OnInit {
  openofferListData: any;
  pagelimit: number = 10;

  offervalue: string;
  facilityname: string;
  commercialNo: string;
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

  ngOnInit(): void {
    this.filterForm();
    this.getOffersData();
    // this.getAuctionList(1);
  }

  getOffersData() {
    let res = {
      d: {
        results: [
          {
            __metadata: {
              id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/BidderreportSet(Sno='',UserId='',ObjectId='')",
              uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/BidderreportSet(Sno='',UserId='',ObjectId='')",
              type: 'ZSRM_PREAUCTION_APPROVAL_SRV.Bidderreport',
            },
            Sno: '',
            OfferValue: '',
            DtTime: '',
            BidderName: 'Saqib',
            BidderId: '',
            PdfContent: '',
            UserId: '',
            CrNo: '',
            Status: '',
            ObjectId: '',
          },
        ],
      },
    };
    let results = res.d.results;
    let resultSet: any = [];
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
    this.openofferListData = resultSet;
  }

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
    this.PaginationServc.sortByTableHeaderId(
      'inventoryAllocationTable',
      columnId,
      sortType,
      dateFormat
    );
  }

  // -------------------------------------- filter code --------------------------------

  filterForm() {
    this.filterFormGroup = this.formBuilder.group({
      status: new FormControl(''),
      type: new FormControl(''),
    });
    console.log('filterFormGroup');
  }
  public toggleFilter() {
    console.log('toggleFilter');
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
    console.log('changeSelect');
    console.log(e.target.value);
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
