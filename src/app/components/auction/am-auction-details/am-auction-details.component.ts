import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AmAuctionDetails } from "src/app/model/auction.model";

@Component({
  selector: 'app-am-auction-details',
  templateUrl: './am-auction-details.component.html',
  styleUrls: ['./am-auction-details.component.scss']
})
export class AmAuctionDetailsComponent implements OnInit {
  amAuctionListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  amAuctionDetails: AmAuctionDetails = new AmAuctionDetails();
  constructor(
    public translate: TranslateService,
  ) { }


  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.amAuctionDetails = {
      auctionSetting: {
        bitsNo: serverObj.d.results[0].bitsNo,
        participants: serverObj.d.results[0].participants,
      }
    }
    serverObj.d.results[0].invoice_detail.forEach((result: any) => {

      const items = {
        referenceno: result['ObjectId'] ? result['ObjectId'] : '',
        productname: result['productname'] ? result['productname'] : '',
        SKUNumber: result['sku_number'] ? result['sku_number'] : '',
      }
      resultSet.push(items);
    });
    return resultSet;
  }

  ngOnInit(): void {
    this.getAuctionList(1);
  }

  getAuctionList(pageNumber?: number) {
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber: pageNumber,
      pageLimit: this.pagelimit
    };
    let res = {
      "body": {
        d: {
          results: [
            {
              "bitsNo": "18",
              "participants": "30",
              "questRate": "89,198.45 SAR",
              "valueAddTax": "53,5190.7 SAR",
              "totalInvPrice": "4,103,128.7 SAR",
              "invoice_detail": [
                {
                  ObjectId: 1,
                  productname: "Isuzu Truck No.1",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 2,
                  productname: "Isuzu Truck No.2",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 3,
                  productname: "Isuzu Truck No.3",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 4,
                  productname: "Isuzu Truck No.4",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 5,
                  productname: "Isuzu Truck No.5",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 6,
                  productname: "Isuzu Truck No.6",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 7,
                  productname: "Isuzu Truck No.7",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 8,
                  productname: "Isuzu Truck No.8",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 9,
                  productname: "Isuzu Truck No.9",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 10,
                  productname: "Isuzu Truck No.10",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 11,
                  productname: "Isuzu Truck No.11",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 12,
                  productname: "Isuzu Truck No.12",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 13,
                  productname: "Isuzu Truck No.13",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 14,
                  productname: "Isuzu Truck No.14",
                  sku_number: "UGG-BB-PUR-06"
                },
                {
                  ObjectId: 15,
                  productname: "Isuzu Truck No.15",
                  sku_number: "UGG-BB-PUR-06"
                },
              ]
            }
          ]
        }
      }
    }
    // let res = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.Paging"},"Message":"","Description":"","UserId":"","Msgty":"","CategoryId":"","PageLimit":"","ProcessType":"","QuotDead":"","PageNo":"","First":"X","Last":"","ObjectId":"","TotPgs":"18","TotEle":"180","Size":"","Number":"1","AgencyName":"","Status":"","BidType":"","CreateDate":"","NoEle":"10","pagetolistnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000427","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000426","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000425","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000424","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000419","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000417","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000413","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000406","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000405","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000404","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"07.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtocomiteememnav"}}}]}}]}};

    // Service call
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
    this.amAuctionListData = this.mapping(res.body);
  }

}
