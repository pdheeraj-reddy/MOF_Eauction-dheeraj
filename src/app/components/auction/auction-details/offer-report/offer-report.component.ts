import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { OfferReport } from "src/app/model/auction.model";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-offer-report',
  templateUrl: './offer-report.component.html',
  styleUrls: ['./offer-report.component.scss']
})
export class OfferReportComponent implements OnInit {
  editmode1: boolean = false;
  editmode2: boolean = false;
  editmode3: boolean = true;
  editmode4: boolean = false;

  openofferListData: any;
  selectedPageNumber: number;
  pagelimit: number = 10;

  offervalue: string;
  facilityname: string;
  commercialNo: string
  //filter Form controls
  showFilterForm: boolean = false;
  dropValStatus: any = [];
  dropValType: any = [];

  offerReport: OfferReport = new OfferReport();
  // form group

  filterFormGroup: FormGroup;
  constructor(
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public PaginationServc: PaginationSortingService,
    public translate: TranslateService,
  ) { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.offerReport = {
      auctionSetting: {
        bitsNo: serverObj.d.results[0].bitsNo,
        participants: serverObj.d.results[0].participants,
      },
      auctionReport: serverObj.d.results[0].auctionReport,
      offerList: []
    };
    if (serverObj.d.results[0].offer_report) {
      serverObj.d.results[0].offer_report.forEach((result: any) => {
        let date = result['submission_date'].replace(/(\d{2}).(\d{2}).(\d{4})/, "$2-$1-$3");
        const items = {
          referenceNo: result['ObjectId'] ? result['ObjectId'] : '',
          offervalue: result['offervalue'] ? result['offervalue'] : '',
          filename: result['filename'] ? result['filename'] : '',
          fileurl: result['fileurl'] ? result['fileurl'] : '',
          submission_date: this.datepipe.transform(date, 'yyyy-MM-dd'),
          submission_time: this.timeTransform(result['submission_date']),
          facility_name: result['facility_name'] ? result['facility_name'] : '',
          commercialRegNo: result['commercialRegNo'] ? result['commercialRegNo'] : '',
        }
        this.offerReport.offerList?.push(items);
      });
    }
    console.log(this.offerReport);
  }

  timeTransform(time: any) {
    var d = new Date(time.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
    let hour: any = d.getHours();
    let min: any = d.getMinutes()
    let part = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var strTime = hour + ':' + min + ' ' + part;
    return strTime;
  }
  ngOnInit(): void {
    this.filterForm();
    this.getOfferList(1);
  }

  getOfferList(pageNumber?: number) {
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
              auctionReport: "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc",
              "offer_report": [
                {
                  ObjectId: 1,
                  offervalue: "4,400,000 SAR",
                  filename: "The file name is long... ",
                  fileurl: "https://www.google.com/",
                  submission_date: "25.04.2022 13:31:00",
                  facility_name: "Hammat Trading Est",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 2,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 12:31:00",
                  facility_name: "Andalusia companies",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 3,
                  offervalue: "3,900,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Al-Sulaiman Company",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 4,
                  offervalue: "3,500,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Alshaya & Brothers Foundation",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 5,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Hammat Trading Est",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 6,
                  offervalue: "4,400,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Andalusia companies",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 7,
                  offervalue: "3,900,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Al-Sulaiman Company",
                  commercialRegNo: "7003884440975",
                },
                {
                  ObjectId: 8,
                  offervalue: "3,500,000 SAR",
                  filename: "attached file ",
                  fileurl: "https://www.google.com/",
                  submission_date: "2022.01.01 02:31:00",
                  facility_name: "Alshaya & Brothers Foundation",
                  commercialRegNo: "7003884440975",
                },
              ]
            }
          ]
        }
      }
    }
    // let res = {"d":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PagingSet('')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.Paging"},"Message":"","Description":"","UserId":"","Msgty":"","CategoryId":"","PageLimit":"","ProcessType":"","QuotDead":"","PageNo":"","First":"X","Last":"","ObjectId":"","TotPgs":"18","TotEle":"180","Size":"","Number":"1","AgencyName":"","Status":"","BidType":"","CreateDate":"","NoEle":"10","pagetolistnav":{"results":[{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000427","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000427',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR Testing","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"10.03.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000426","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"12.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000426',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000425","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000425',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000424","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"10.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000424',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000419","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000419',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000417","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000417',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"TestRFx14 17.01.2022","ZzPrevAucId1":"","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"03.03.2022","ZzPrevAucId3":"","ZzAucDesc":"TestRFx13 17.01.2022. إنه وصف. فقط للتحقق مما إذا كان حقل الوصف يعمل أم لا","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000413","ZzOtherNote":"","UserId":"","ZzCloseInd":"","PsEmdReq":"","ZzCommisionTyp":"","PsEmdAmnt":"0.00 ","ZzCommPercent":"0.0000 ","Status":"","ZzAgencyName":"","CreateDate":"09.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000413',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000406","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000406',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000405","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"08.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000405',UserId='')/listtocomiteememnav"}}},{"__metadata":{"id":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')","type":"ZSRM_PREAUCTION_ADMIN_BID_SRV.PreAuctionList"},"Message":"","Msgty":"","DraftId":"","SameAddress":"","SaveAsDraft":"","ZzStartMethod":"","Description":"SRMLAUSR 20.01.2022 10:27","ZzPrevAucId1":"9700000300","ZzAgencyId":"","ZzPrevAucId2":"","QuotDead":"27.01.2022","ZzPrevAucId3":"","ZzAucDesc":"This is the long description for the Auction.","ZzPrevAucId4":"","ProcessType":"ZFWD","ZzPrevAucId5":"","ZzAucSrtDt":"0 ","ZzIbgaPercent":"0.0000 ","BidType":"O","ZzFbgaDeadline":"0 ","ZzAucEndDt":"0 ","Currency":"SAR","ZzPrtReason":"","ObjectId":"9700000404","ZzOtherNote":"","UserId":"","ZzCloseInd":"X","PsEmdReq":"","ZzCommisionTyp":"Directly","PsEmdAmnt":"0.00 ","ZzCommPercent":"80.0000 ","Status":"","ZzAgencyName":"","CreateDate":"07.02.2022","ZzPbEstPrice":"0.00 ","AgencyName":"","ZzEmrktPubsPrd":"00000000","listtoattachnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoattachnav"}},"listtobiddernav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtobiddernav"}},"listtoproductnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtoproductnav"}},"listtocomiteememnav":{"__deferred":{"uri":"http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_ADMIN_BID_SRV/PreAuctionListSet(ObjectId='9700000404',UserId='')/listtocomiteememnav"}}}]}}]}};

    // Service call
    // this.auctionServc.getOfferList(page, filters).subscribe((res: any) => {
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
    //   console.log('getOfferList RespError : ', error);
    // });
    this.mapping(res.body);
  }
  auctionSettings(type: string) {
    if (type == "auctionDetail") {
      this.editmode1 = true;
      this.editmode2 = false;
      this.editmode3 = false;
      this.editmode4 = false;
    } else if (type == 'auctionInstruction') {
      this.editmode1 = false;
      this.editmode2 = true;
      this.editmode3 = false;
      this.editmode4 = false;
    } else if (type == 'auctionCommittee') {
      this.editmode1 = false;
      this.editmode2 = false;
      this.editmode3 = false;
      this.editmode4 = true;
    } else {
      this.editmode1 = false;
      this.editmode2 = false;
      this.editmode3 = true;
      this.editmode4 = false;
    }
  }


  // download report
  downloadReport(data: any) {
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  /** Populating the table */
  public getServerData(selectedPageNumber: number) {

    if (selectedPageNumber <= 2) {
      selectedPageNumber = 1;
    } else {
      selectedPageNumber = selectedPageNumber - 1;
    }
    this.selectedPageNumber = selectedPageNumber;

    this.getOfferList(selectedPageNumber);
    this.PaginationServc.resetSorting();
  }

  // -------------------------------------- filter code -------------------------------- 

  filterForm() {
    this.filterFormGroup = this.formBuilder.group({
      auctionStatus: new FormControl(''),
      auctionType: new FormControl(''),
      myAuction: new FormControl(''),
    });
  }
  public toggleFilter() {
    console.log("toggleFilter");
    this.showFilterForm = !this.showFilterForm;
  }

  applyFilter() {
    this.filterFormGroup.controls['status'].setValue('');
    this.filterFormGroup.controls['type'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
    this.getOfferList(1);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.filterFormGroup.controls;
  }


  resetFilter() {
    this.filterFormGroup.controls['auctionStatus'].setValue('');
    this.filterFormGroup.controls['auctionType'].setValue('');
    this.filterFormGroup.controls['myAuction'].setValue('');
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
