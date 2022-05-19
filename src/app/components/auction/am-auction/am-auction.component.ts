import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from "src/app/service/pagination.service";

@Component({
  selector: 'app-am-auction',
  templateUrl: './am-auction.component.html',
  styleUrls: ['./am-auction.component.scss']
})
export class AmAuctionComponent implements OnInit {

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
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.totcntforendedauction = serverObj.d.results[0].TotDraft;
    this.totcntforundergear = serverObj.d.results[0].TotRejected;
    this.totcntforupcommingauction = serverObj.d.results[0].TotPublish;
    this.totcntforongoingauction = serverObj.d.results[0].TotPendingRw;
    this.totcntforall = serverObj.d.results[0].TotAll;
    console.log(serverObj.d.results[0].auciton_list);
    serverObj.d.results[0].auciton_list.forEach((result: any) => {
      const items = {
        imgsrc: result['imgsrc'] ? result['imgsrc'] : '',
        statuscode: result['statuscode'] ? result['statuscode'] : '',
        statuscount: result['statuscount'] ? result['statuscount'] : '',
        title: result['title'] ? result['title'] : '',
        description: result['description'] ? result['description'] : '',
        product: result['product'] ? result['product'] : '',
        auctiondate: result['auctiondate'] ? result['auctiondate'] : '',
        auctiontime: result['auctiontime'] ? result['auctiontime'] : '',
        day: result['day'] ? result['day'] : '',
        hour: result['hour'] ? result['hour'] : '',
        Accurate: result['Accurate'] ? result['Accurate'] : '',
        Second: result['Second'] ? result['Second'] : '',
        auction_detail: result['auction_detail'] ? result['auction_detail'] : '',
      }
      resultSet.push(items);
    });
    return resultSet;
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
      pageLimit: this.pagelimit
    };
    const filters = {
      Status: this.selectedTab,
      auctionStatus: this.filterFormGroup.controls['auctionStatus'].value,
      auctionType: this.filterFormGroup.controls['auctionType'].value,
      myAuction: this.filterFormGroup.controls['myAuction'].value,
    };

    let res = {
      "body": {
        d: {
          results: [
            {
              "auciton_list": [
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Under Gear",
                  statuscount: '',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "0",
                  Accurate: "0",
                  Second: "0",
                },
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Running Now",
                  statuscount: '120',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "20",
                  Accurate: "45",
                  Second: "08",
                  auction_detail: ""
                },
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Upcoming auction",
                  statuscount: '',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "20",
                  Accurate: "45",
                  Second: "08",
                  auction_detail: ""
                },
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Awarded",
                  statuscount: '',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "0",
                  Accurate: "0",
                  Second: "0",
                  auction_detail: ""
                },
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Canceled",
                  statuscount: '',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "0",
                  Accurate: "0",
                  Second: "0",
                  auction_detail: ""
                },
                {
                  imgsrc: "https://picsum.photos/200/150",
                  statuscode: "Under Gear",
                  statuscount: '',
                  title: "Sale of trucks and transport vehicles belonging to the Ministry of Health, Riyadh branch",
                  description: "Several ISUZCO trucks and cars of the model 2012, 2016, 2015 and other types will be sold…",
                  product: "120 product",
                  auctiondate: "12-11-2020",
                  auctiontime: "12:30 Evening",
                  day: "0",
                  hour: "0",
                  Accurate: "0",
                  Second: "0",
                  auction_detail: ""
                },
              ]
            }
          ]
        }
      }
    }
    // let res = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.Paging"},"Message":"","Description":"","UserId":"","Msgty":"","CategoryId":"","PageLimit":"","ProcessType":"","QuotDead":"","PageNo":"","First":"X","Last":"","ObjectId":"","TotPgs":"18","TotEle":"180","Size":"","Number":"1","AgencyName":"","Status":"","BidType":"","CreateDate":"","NoEle":"10","pagetolistnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000427","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000426","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000425","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000424","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000419","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000417","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000413","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000406","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000405","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000404","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"07.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtocomiteememnav"}}}]}}]}};

    // this.auctionServc.getAuctionList(page, filters).subscribe((res: any) => {
    //   this.showLoader = false;

    //   this.PaginationServc.setPagerValues(
    //     +res.body.d.results[0].TotEle,
    //     10,
    //     +pageNoVal
    //   );

    //   const csrfToken = localStorage.getItem("x-csrf-token");    
    //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
    //   this.auctionListData = this.mapping(res.body);

    // }, (error) => {
    //   this.showLoader = false;
    //   console.log('getAuctionList RespError : ', error);
    // });
    this.auctionListData = this.mapping(res.body);
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
        onlySelf: true
      })
    } else {
      this.filterFormGroup.controls[dd].setValue('', {
        onlySelf: true
      })
    }
  }
  changeSelect(e: any, dd: string) {
    this.filterFormGroup.controls[dd].setValue(e.target.value, {
      onlySelf: true
    })
  }
}
