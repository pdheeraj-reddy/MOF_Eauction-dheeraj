import { Component, OnInit } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

const CountdownTimeUnits: Array<[string, number]> = [
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // secondillion seconds
];

@Component({
  selector: 'app-auction-commitee-detail-page',
  templateUrl: './auction-commitee-detail-page.component.html',
  styleUrls: ['./auction-commitee-detail-page.component.scss'],
})
export class AuctionCommiteeDetailPageComponent implements OnInit {
  detailPageResponse: any;
  preAUctionData: any;
  participantsData: any;

  constructor(public router: Router) { }

  openOffers() {
    this.router.navigateByUrl(
      '/auctionCommitee/openOffer/' + "9700000499"
    );
  }

  ngOnInit(): void {
    let res = {
      d: {
        results: [
          {
            __metadata: {
              id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='ABAABAPER')",
              uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/PreAuctionListSet(ObjectId='9700000491',UserId='ABAABAPER')",
              type: 'ZSRM_PREAUCTION_APPROVAL_SRV.PreAuctionList',
            },
            IsIbgaPaid: '',
            CommitteeAssigned: '',
            ZzEstOpt: '',
            ZzTotPdt: '00000',
            ZzAnncSrtD: '00000000',
            ZzAnncEndD: '00000000',
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
            UserId: 'ABAABAPER',
            ZzCloseInd: 'X',
            ZzCommisionTyp: 'Directly',
            ZzCommPercent: '3409.0000 ',
            Status: 'Published',
            ZzAgencyName: '',
            CreateDate: '',
            ZzPbEstPrice: '70.00 ',
            ZzPbEstPricePc: '0.00 ',
            ZzEmrktPubsPrd: '00000000',
            listtoattachnav: {
              results: [],
            },
            temp2: {
              NoParticipant: '',
              NoBids: '0 ',
              AucIdStatus: '',
            },
            temp: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/BidderParticipationSet(AucId='',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/BidderParticipationSet(AucId='',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.BidderParticipation',
                  },
                  SlNo: '',
                  BidSubmitAt: '',
                  BidSubmitOn: '',
                  AucId: '',
                  AucDesc: '',
                  BidderValue: '',
                  UserId: '',
                  Message: '',
                  BidderId: '',
                  Msgty: '',
                  BidderName: 'Bidder 1',
                  ZzUserAction: '',
                },
              ],
            },
            listtocomiteememnav: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembersCreate',
                  },
                  SlNo: '00',
                  AucId: '9700000491',
                  EmployeeId: '14732049',
                  EmployeeName: 'Sathyamoorthy J',
                  AucDesc: 'SRMLAUSR Testing Another Test',
                  EmpMailid: 'dummyuser@dummytest.com',
                  EmployeeRole: 'ZEAUCTION_PRICECOMM_HEAD',
                  Requestor: '1827879980',
                  UserId: '',
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembersCreate',
                  },
                  SlNo: '01',
                  AucId: '9700000491',
                  EmployeeId: '13273161',
                  EmployeeName: 'Mousa',
                  AucDesc: 'SRMLAUSR Testing Another Test',
                  EmpMailid: 'dummyuser@dummytest.com',
                  EmployeeRole: 'ZEAUCTION_PRICECOMM_MEMBER',
                  Requestor: '1827879980',
                  UserId: '',
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembersCreate',
                  },
                  SlNo: '03',
                  AucId: '9700000491',
                  EmployeeId: '17496786',
                  EmployeeName: 'Mohamed',
                  AucDesc: 'SRMLAUSR Testing Another Test',
                  EmpMailid: 'dummyuser@dummytest.com',
                  EmployeeRole: 'ZEAUCTION_PRICECOMM_MEMBER',
                  Requestor: '1827879980',
                  UserId: '',
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembersCreate',
                  },
                  SlNo: '02',
                  AucId: '9700000491',
                  EmployeeId: '1622234795',
                  EmployeeName: 'Nithyashri S',
                  AucDesc: 'SRMLAUSR TESTING ANOTHER TEST',
                  EmpMailid: 'dummyuser@dummytest.com',
                  EmployeeRole: 'ZEAUCTION_PRICECOMM_MEMBER',
                  Requestor: '1827879980',
                  UserId: '',
                },
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommitteeMembersCreateSet(AucId='9700000491',UserId='')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembersCreate',
                  },
                  SlNo: '04',
                  AucId: '9700000491',
                  EmployeeId: '1622234795',
                  EmployeeName: 'Nithyashri S',
                  AucDesc: 'SRMLAUSR TESTING ANOTHER TEST',
                  EmpMailid: 'dummyuser@dummytest.com',
                  EmployeeRole: 'ZEAUCTION_PRICECOMM_MEMBER',
                  Requestor: '1827879980',
                  UserId: '',
                },
              ],
            },
            listtoproductnav: {
              results: [
                {
                  __metadata: {
                    id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/ProductItemSet(ObjectId='9700000491',UserId='ABAABAPER')",
                    uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/ProductItemSet(ObjectId='9700000491',UserId='ABAABAPER')",
                    type: 'ZSRM_PREAUCTION_APPROVAL_SRV.ProductItem',
                  },
                  DelInd: '',
                  ZzProdDesc: '',
                  ZzProductNo: '1 ',
                  ZzSerialNo: '',
                  DelivTime: '000000',
                  ProductValue: '0.00 ',
                  ZzPdtEstPricePc: '0.00 ',
                  ZzProductCond: '',
                  Currency: 'SAR',
                  Description: '',
                  ZzProductSku: '',
                  ZzLocationCord: '',
                  ZzRegion: '',
                  CategoryId: '',
                  ZzCity: '',
                  Quantity: '0.000 ',
                  ZzNeighbourhood: '',
                  ObjectId: '9700000491',
                  Unit: '',
                  ZzStreet: '',
                  Price: '0.00 ',
                  UserId: 'ABAABAPER',
                  ZzPdOthrNts: '',
                  DelivDate: '00.00.0000',
                },
              ],
            },
          },
        ],
      },
    };
    this.preAUctionData = res.d.results[0];
    let result = res.d.results[0];
    this.detailPageResponse = {
      objectId: result['ObjectId'],
      status: result['Status'],
      startDate: result['ZzAucSrtDt'].split(' ')[0],
      startTime: result['ZzAucSrtDt'].split(' ')[1],
      endDate: result['ZzAucEndDt'].split(' ')[0],
      endTime: result['ZzAucEndDt'].split(' ')[1],
      config: this.getConfig(
        result['Status'],
        result['ZzAucSrtDt'],
        result['ZzAucEndDt']
      ),
      describtion: result['Description'],
      detailedDescription: result['ZzAucDesc'],
      productTotal: result['ZzTotPdt'] ? parseInt(result['ZzTotPdt']) : '',
      ZzCloseInd: result['ZzCloseInd'] == 'X' ? 'Closed' : '',
      auctionPrice: '',
      initialGauPercentage: result['ZzIbgaPercent'],
      commissionRate: result['ZzCommPercent'],
      biddingStart: result['ZzAucSrtDt'],
      biddingEnd: result['ZzAucEndDt'],
      latestOffers: this.getLatestOffers(result['temp']['results']),
    };
    //Ongoing
    if (this.detailPageResponse.status == 'Published') {
      setInterval(() => {
        console.log('Timmer');
        this.participantsData = {
          bids: result.temp2.NoBids,
          participants: result.temp2.NoParticipant,
        };
      }, 1000);
    } else {
      this.participantsData = {
        bids: this.detailPageResponse.temp2.NoBids,
        participants: this.detailPageResponse.temp2.NoParticipant,
      };
    }
    console.log(this.detailPageResponse);
  }
  getLatestOffers(res: any) {
    console.log(res);
    var temp: any = [];
    res.forEach((item: any) => {
      temp.push({
        bidderName: item.BidderName,
        siNo: item.SlNo,
        time: item.BidSubmitAt,
      });
    });
    return temp;
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
}
