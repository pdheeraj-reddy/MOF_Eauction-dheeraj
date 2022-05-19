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
import { CountdownConfig } from 'ngx-countdown';
import * as moment from 'moment';

const CountdownTimeUnits: Array<[string, number]> = [
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // secondillion seconds
];
@Component({
  selector: 'app-auction-commitee-landing-page',
  templateUrl: './auction-commitee-landing-page.component.html',
  styleUrls: ['./auction-commitee-landing-page.component.scss'],
})
export class AuctionCommiteeLandingPageComponent implements OnInit {
  // config: CountdownConfig = {
  //   format: 'D : H : m : s',
  //   leftTime: 5 * 60 * 60 * 24,
  //   formatDate: ({ date, formatStr }) => {
  //     let duration = Number(date || 0);

  //     return CountdownTimeUnits.reduce((current, [name, unit]) => {
  //       if (current.indexOf(name) !== -1) {
  //         const v = Math.floor(duration / unit);
  //         duration -= v * unit;
  //         return current.replace(
  //           new RegExp(`${name}+`, 'g'),
  //           (match: string) => {
  //             return v.toString().padStart(match.length, '0');
  //           }
  //         );
  //       }
  //       return current;
  //     }, formatStr);
  //   },
  // };
  auctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  totcntforendedauction: number;
  totcntforundergear: number;
  totcntforupcommingauction: number;
  totcntforongoingauction: number;
  totcntforall: number;

  selectedTab: string = 'All';
  //filter Form controls
  filterFormGroup: FormGroup;
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService
  ) {
  }

  public mapping(serverObj: any) {
    console.log('serverObj', serverObj);
    let resultSet: any = [];
    this.totcntforendedauction = serverObj.d.results[0].TotPublished;
    this.totcntforundergear = serverObj.d.results[0].TotRejected;
    this.totcntforupcommingauction = serverObj.d.results[0].TotPublished;
    this.totcntforongoingauction = serverObj.d.results[0].TotPublished;
    this.totcntforall = serverObj.d.results[0].TotAll;
    serverObj.d.results[0].page1tolistnav.results.forEach((result: any) => {
      const items = {
        imgsrc: '',
        statuscode:
          result['Status'] == 'Published'
            ? 'Upcoming Auction'
            : result['Status'],
        statuscount: '',
        title: result['Description'] ? result['Description'] : '',
        description: result['ZzAucDesc'] ? result['ZzAucDesc'] : '',
        product: result['ZzTotPdt'] ? parseInt(result['ZzTotPdt']) : '',
        objectId: result['ObjectId'],
        auctiondate:
          result['Status'] == 'Published'
            ? result['ZzAucSrtDt'].split(' ')[0]
            : result['ZzAucEndDt'].split(' ')[0],
        auctiontime:
          result['Status'] == 'Published'
            ? result['ZzAucSrtDt'].split(' ')[1]
            : result['ZzAucEndDt'].split(' ')[1],
        day: '',
        hour: '',
        Accurate: '',
        Second: '',
        auction_detail: '',
        config: this.getConfig(
          result['Status'],
          result['ZzAucSrtDt'],
          result['ZzAucEndDt']
        ),
      };
      resultSet.push(items);
    });
    console.log('resultSet', resultSet);
    return resultSet;
  }
  getConfig(status: any, startDate: any, endDate: any): CountdownConfig {
    let day = '';
    let hours = '';
    let mts = '';
    let seconds = '';
    if (status == 'Published') {
      day = '5';
      hours = '60';
      mts = '60';
      seconds = '60';
    } else {
      day = '0';
      hours = '0';
      mts = '0';
      seconds = '0';
    }
    // if (status == 'Published') {
    //   let a = startDate.replaceAll('.', '-').toString();
    //   console.log(a);
    //   let date1 = moment(a).format('DD-MM-YYYY hh:mm:ss');
    //   console.log(date1);
    //   let temp1 = moment(date1);
    //   let date2 = moment().format('DD-MM-YYYY hh:mm:ss');
    //   let temp2 = moment(date2);
    //   var diff = temp1.diff(temp2);
    //   let seconds = diff / 1000;
    //   let minutes = seconds / 60;
    //   let hours = minutes / 60;
    //   let days = hours / 24;
    //   let time =
    //     days + ':' + (hours % 24) + ':' + (minutes % 60) + ':' + (seconds % 60);
    //   console.log(time);
    //   // console.log(date1, date2);
    //   // console.log(Math.abs(date2 - date1));
    //   // let zstartDate = startDate.split(' ')[0];
    //   // let zstartTime = startDate.split(' ')[1];
    //   // let currentDate = startDate.replaceAll('.', '-');
    //   // // moment().format('DD-MM-YYYY') -
    //   // // moment(zstartDate.replaceAll('.', '-'), 'DD-MM-YYYY');
    //   // let currentTime = '';
    //   // console.log(moment(currentDate).diff(moment('09-04-2022 01:00:04')));
    // }
    return {
      format: '\xa0' + 'D' + '\xa0\xa0\xa0\xa0\xa0' + 'H' + '\xa0\xa0\xa0\xa0\xa0\xa0' + 'm' + '\xa0\xa0\xa0\xa0\xa0\xa0' + 's',
      // format: `D    :    H :    m :    s`,

      leftTime:
        parseInt(day) * parseInt(hours) * parseInt(mts) * parseInt(seconds),
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(
              new RegExp(`${name}+`, 'g'),
              (match: string) => {
                return v.toString().padStart(match.length, '0');
              }
            );
          }
          return current;
        }, formatStr);
      },
    };
  }
  ngOnInit(): void {

    this.filterForm();
    this.getAuctionList(1);
  }

  onTabSelection(value: string) {
    this.selectedTab = value;
    this.getAuctionList(1);
  }

  getAuctionList(pageNumber?: number) {
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit,
    };
    const filters = {
      Status: this.selectedTab,
      auctionStatus: this.filterFormGroup.controls['auctionStatus'].value,
      auctionType: this.filterFormGroup.controls['auctionType'].value,
      myAuction: this.filterFormGroup.controls['myAuction'].value,
    };

    let res = {
      d: {
        results: [
          {
            __metadata: {
              id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PagingSet('')",
              uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PagingSet('')",
              type: 'ZSRM_PREAUCTION_APPROVAL_SRV.Paging',
            },
            ScreenNav: '',
            Description: '',
            Message: '',
            Msgty: '',
            UserId: '',
            PageLimit: '',
            Report: '',
            PageNo: '',
            First: 'X',
            Last: '',
            ObjectId: '',
            TotPgs: '1',
            TotEle: '7',
            Size: '',
            Number: '1',
            Status: '',
            BidType: '',
            ZzAucSrtDt: '',
            NoEle: '7',
            TotAll: '7 ',
            TotReviewPend: '5 ',
            ZzAucEndDt: '',
            TotPricingPend: '0 ',
            TotPublishPend: '0 ',
            TotRejected: '1 ',
            TotPrcApprPend: '0 ',
            TotPrcRejected: '0 ',
            TotPublished: '1 ',
            page1tolistnav: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000499',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000499',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00002',
                  ZzAnncSrtD: '01.04.2022',
                  ZzAnncEndD: '01.04.2022',
                  ZzAucProduct: 'UAT Auction Products 001',
                  Role: '',
                  ZzBidSrtPrice: '5600000.00 ',
                  ActionTaken: 'A',
                  ZzLowBidVl: '60000.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: 'T',
                  Description: 'UAT Auction Name 111',
                  ZzPrevAucId1: '',
                  ZzAgencyId: '022001000000',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc:
                    'UAT Auction Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '25.03.2022 14:00:00',
                  ZzIbgaPercent: '20.0000 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '30',
                  ZzAucEndDt: '25.04.2022 02:00:00',
                  Currency: '',
                  ZzPrtReason: '',
                  ObjectId: '9700000499',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: 'C',
                  ZzCommisionTyp: 'UAT Commission type 001',
                  ZzCommPercent: '10.0000 ',
                  Status: 'Pending Review',
                  ZzAgencyName: 'وزارة الصحة - الديوان العام',
                  CreateDate: '22.03.2022',
                  ZzPbEstPrice: '0.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000499',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000499',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000499',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'A',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: 'SRMLAUSR Testing Another Test',
                  ZzPrevAucId1: '9700000300',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: 'This is the long description for the Auction.',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '28.02.2022 21:00:04',
                  ZzIbgaPercent: '2.7500 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '15.04.2022',
                  ZzAucEndDt: '18.03.2022 01:00:04',
                  Currency: 'SAR',
                  ZzPrtReason: '',
                  ObjectId: '9700000491',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: 'X',
                  ZzCommisionTyp: 'Directly',
                  ZzCommPercent: '3409.0000 ',
                  Status: 'Published',
                  ZzAgencyName: '',
                  CreateDate: '19.03.2022',
                  ZzPbEstPrice: '70.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000458',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000458',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'P',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: '',
                  ZzPrevAucId1: '',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: '',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '  .  . :: 0',
                  ZzIbgaPercent: '0.0000 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '00000000',
                  ZzAucEndDt: '  .  . :: 0',
                  Currency: '',
                  ZzPrtReason: '',
                  ObjectId: '9700000458',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: '',
                  ZzCommisionTyp: '',
                  ZzCommPercent: '0.0000 ',
                  Status: 'Pending Review',
                  ZzAgencyName: '',
                  CreateDate: '09.03.2022',
                  ZzPbEstPrice: '0.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000458',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000458',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000458',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000457',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000457',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'P',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: '',
                  ZzPrevAucId1: '',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: '',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '  .  . :: 0',
                  ZzIbgaPercent: '0.0000 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '00000000',
                  ZzAucEndDt: '  .  . :: 0',
                  Currency: '',
                  ZzPrtReason: '',
                  ObjectId: '9700000457',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: '',
                  ZzCommisionTyp: '',
                  ZzCommPercent: '0.0000 ',
                  Status: 'Pending Review',
                  ZzAgencyName: '',
                  CreateDate: '09.03.2022',
                  ZzPbEstPrice: '0.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000457',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000457',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000457',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000455',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000455',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'P',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: 'SRMLAUSR Testing Another Test',
                  ZzPrevAucId1: '9700000300',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: 'This is the long description for the Auction.',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '28.02.2022 21:00:04',
                  ZzIbgaPercent: '0.0000 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '00000000',
                  ZzAucEndDt: '18.03.2022 01:00:04',
                  Currency: 'SAR',
                  ZzPrtReason: '',
                  ObjectId: '9700000455',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: 'X',
                  ZzCommisionTyp: 'Directly',
                  ZzCommPercent: '80.0000 ',
                  Status: 'Pending Review',
                  ZzAgencyName: '',
                  CreateDate: '08.03.2022',
                  ZzPbEstPrice: '0.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000455',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000455',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000455',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000454',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000454',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'P',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: 'SRMLAUSR Testing Another Test',
                  ZzPrevAucId1: '9700000300',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: 'This is the long description for the Auction.',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '28.02.2022 21:00:04',
                  ZzIbgaPercent: '0.0000 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '00000000',
                  ZzAucEndDt: '18.03.2022 01:00:04',
                  Currency: 'SAR',
                  ZzPrtReason: '',
                  ObjectId: '9700000454',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: 'X',
                  ZzCommisionTyp: 'Directly',
                  ZzCommPercent: '80.0000 ',
                  Status: 'Pending Review',
                  ZzAgencyName: '',
                  CreateDate: '08.03.2022',
                  ZzPbEstPrice: '0.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000454',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000454',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000454',UserId='')/listtoproductnav",
                    },
                  },
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000374',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000374',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
                  },
                  IsIbgaPaid: '',
                  CommitteeAssigned: '',
                  ZzEstOpt: '',
                  ZzTotPdt: '00000',
                  ZzAnncSrtD: '',
                  ZzAnncEndD: '',
                  ZzAucProduct: '',
                  Role: '',
                  ZzBidSrtPrice: '0.00 ',
                  ActionTaken: 'R',
                  ZzLowBidVl: '0.00 ',
                  RejectNotes: '',
                  Message: '',
                  Msgty: '',
                  SameAddress: '',
                  ZzStartMethod: '',
                  Description: 'SRMLAUSR Testing Another Test',
                  ZzPrevAucId1: '9700000300',
                  ZzAgencyId: '',
                  ZzPrevAucId2: '',
                  ZzPrevAucId3: '',
                  ZzAucDesc: 'THIS IS THE LONG DESCRIPTION FOR THE AUCTION.',
                  ZzPrevAucId4: '',
                  ProcessType: 'ZFWD',
                  ZzPrevAucId5: '',
                  ZzAucSrtDt: '28.02.2022 21:00:04',
                  ZzIbgaPercent: '2.7500 ',
                  BidType: 'O',
                  ZzFbgaDeadline: '15.04.2022',
                  ZzAucEndDt: '18.03.2022 01:00:04',
                  Currency: 'SAR',
                  ZzPrtReason: '',
                  ObjectId: '9700000374',
                  ZzOtherNote: '',
                  UserId: '',
                  ZzCloseInd: 'X',
                  ZzCommisionTyp: 'DIRECTLY',
                  ZzCommPercent: '3409.0000 ',
                  Status: 'Rejected',
                  ZzAgencyName: '',
                  CreateDate: '26.01.2022',
                  ZzPbEstPrice: '70.00 ',
                  ZzPbEstPricePc: '0.00 ',
                  ZzEmrktPubsPrd: '00000000',
                  listtoattachnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000374',UserId='')/listtoattachnav",
                    },
                  },
                  listtocomiteememnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000374',UserId='')/listtocomiteememnav",
                    },
                  },
                  listtoproductnav: {
                    __deferred: {
                      uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000374',UserId='')/listtoproductnav",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };
    this.auctionListData = this.mapping(res);
  }

  /** Populating the table */
  public getServerData(selectedPageNumber: number) {
    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getAuctionList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

  // -----------------------------------filter section ------------------------------

  filterForm() {
    this.filterFormGroup = this.formBuilder.group({
      auctionStatus: new FormControl(''),
      auctionType: new FormControl(''),
      myAuction: new FormControl(''),
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }

  public toggleFilter() {
    this.showFilterForm = !this.showFilterForm;
  }

  resetFilter() {
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
    this.getAuctionList(1);
  }

  changeCheckbox(e: any, dd: string) {
    if (e.target.checked) {
      this.filterFormGroup.controls[dd].setValue(e.target.value, {
        onlySelf: true,
      });
    } else {
      this.filterFormGroup.controls[dd].setValue('', {
        onlySelf: true,
      });
    }
  }
  changeSelect(e: any, dd: string) {
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
