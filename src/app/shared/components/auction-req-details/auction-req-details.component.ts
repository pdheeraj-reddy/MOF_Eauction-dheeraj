import { Component, Input, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { AuctionService } from 'src/app/service/auction.service';
import { InterconversionService } from 'src/app/service/interconversion.service';
import { AuctionBasicMaster } from 'src/app/model/auction.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auction-req-details',
  templateUrl: './auction-req-details.component.html',
  styleUrls: ['./auction-req-details.component.scss']
})
export class AuctionReqDetailsComponent implements OnInit {
  @Input() preAuctionData: any;
  @Input() ObjectId: string;
  @Input() DraftId: string;
  @Input() ViewMode: string;

  showLoader: boolean = false;

  productValue: any;
  rejectionNotes: any;
  // Objects
  auctionDetails: any;
  auctionDetailsResp: any;
  auctionItem: AuctionBasicMaster = new AuctionBasicMaster();
  auctionDetailsSubscription$: Subscription;
  pageRangeForAttach: any;
  activeIndex = -1;
  columnLst = ['index', 'name'];
  showViewAttachmentsModal: boolean = false;
  selectedFileFormat: any;
  selectedFileURL: any;

  constructor(
    public PaginationServc: PaginationSortingService,
    public auctionServc: AuctionService,
    public auctionApprovalServc: AuctionApprovalService,
    private interconversionService: InterconversionService,
  ) { }

  ngOnInit(): void {
    console.log('AuctionReqDetailsComponent getPreAuctionData ', this.preAuctionData);
    if (this.ObjectId || this.DraftId) {
      console.log('edit');
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    } else {
      console.log('new');
    }
  }

  downloadFile(fileName: string, contentType: string, base64Data: string) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    console.log('linkSource: ', linkSource);
    downloadLink.href = base64Data;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    downloadLink.click();
  }



  getAuctionDetails(ObjectId: string, DraftId: string) {
    this.showLoader = true;
    this.auctionServc
      .getAuctionDetails(ObjectId, DraftId)
      .subscribe(
        (auctionDetailsResp: any) => {
          console.log('getAuctionDetails Resp ', auctionDetailsResp.body);
          this.auctionServc.XCSRFToken = auctionDetailsResp.headers.get('x-csrf-token');
          this.auctionDetailsResp = auctionDetailsResp.body.d.results[0];
          this.auctionItem = this.interconversionService.mappingObjForView(this.auctionDetailsResp);
          this.navigateToPage(1, 'auctionAttach');
          this.auctionDetails = auctionDetailsResp.body.d.results[0];
          console.log('YY', this.auctionItem);
          // Load until data loads then slowly load images
          this.showLoader = false;
        },
        (error) => {
          this.showLoader = false;
          console.log('getAuctionDetails RespError : ', error);
        }
      );
  }

  attachmentDownload(attchment: any) {
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }

  approveOrRejectAuction(action: any) {
    this.preAuctionData.ActionTaken = action;
    if (action == 'R') this.preAuctionData.RejectNotes = this.rejectionNotes;
    console.log(this.preAuctionData);
    this.auctionApprovalServc.approveOrRejectAuction(this.preAuctionData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
      }
    );
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    // this.PaginationServc.sortByTableHeaderId('auctionAttachment', columnId, sortType, dateFormat);
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.auctionItem.auctionAttachement, this.columnLst[columnId]);
    console.log("🚀 ~ sortByTableHeaderId ~ this.auctionItem.auctionAttachement", this.auctionItem.auctionAttachement)
  }

  getPreAuctionData() {
    // this._AuctionService.getPreAuctionApproval('9700000300').subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log('getAuctionList RespError : ', error);
    //   }
    // );
    // sathya - comment getPreAuctionApproval
    // let temp = this.auctionApprovalServc.getPreAuctionApproval('9700000300');
    // this.preAuctionData = temp['d']['results'][0];
    // console.log(this.preAuctionData);
    // for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
    //   this.productValue =
    //     this.productValue +
    //     parseFloat(
    //       this.preAuctionData.listtoproductnav.results[i].ProductValue
    //     );
    // }
  }

  // viewAttachment(file: any, index:number) {
  //   this.activeIndex = index;
  //   if (file.FilenetId) {
  //     this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
  //       (downloadAuctionImagesResp: any) => {
  //         console.log(downloadAuctionImagesResp);
  //         const fileResp = downloadAuctionImagesResp.d;
  //         var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
  //         console.log('asdasd', byteString.split(',')[1]);
  //         var ab = new ArrayBuffer(byteString.length);
  //         var ia = new Uint8Array(ab);
  //         for (var i = 0; i < byteString.length; i++) {
  //           ia[i] = byteString.charCodeAt(i);
  //         }
  //         const blob = new Blob([ab], { type: file.MIMEType });
  //         console.log(blob);
  //         this.activeIndex = -1;
  //         let fileURL = window.URL.createObjectURL(blob);
  //         console.log('fileURL', fileURL);
  //         window.open(fileURL, '_blank');
  //         // window.open(fileContent, "_blank");
  //       },
  //       (error) => {
  //         this.showLoader = false;
  //         this.activeIndex = -1;
  //         console.log('downloadAuctionImages RespError : ', error);
  //       }
  //     );
  //   }
  // }

  activeDownloadFileIndex = -1

  viewAttachment(file: any, index: number, option: string) {
    if (file.FilenetId) {
      file.downloading = true;
      this.activeDownloadFileIndex = index;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
        (downloadAuctionImagesResp: any) => {
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
          let fileURL = window.URL.createObjectURL(blob);
          console.log('fileURL ', fileURL);
          this.showViewAttachmentsModal = false;
          var newWin: any;
          if (option == 'view') {
            newWin = window.open(fileURL, '_blank');
          } else {
            newWin = this.downloadFile(file.name, file.MIMEType, fileURL);
          }
          if ((!newWin || newWin.closed || typeof newWin.closed == 'undefined') && option == 'view') {
            alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
          }
          file.downloading = false;
          this.activeDownloadFileIndex = -1;
          // window.open(fileContent, "_blank");
        },
        (error) => {
          file.downloading = false;
          this.showLoader = false;
          this.activeDownloadFileIndex = -1;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
    } else {
      const fileType = file.name.split('.').pop()?.toLowerCase();
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
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        this.showViewAttachmentsModal = false;
        console.log('fileURL', fileURL);
        window.open(fileURL, '_blank');
      } else {
        if (file.type.indexOf('image') > -1) {
          this.selectedFileFormat = 'image';
        } else if (file.type.indexOf('video') > -1) {
          this.selectedFileFormat = 'video';
        }
        this.selectedFileURL = file.filesrc['0'].split(',')[1];
        // reader.onload = (_event) => {
        //   this.selectedFileURL = reader.result;
        // }
        this.showViewAttachmentsModal = true;
      }
    }
  }

  isSorting(columnId: number) {
    return this.PaginationServc.columnId !== columnId;
  }
  isSortAsc(columnId: number) {
    return this.PaginationServc.isSortAsc(columnId);
  }
  isSorDesc(columnId: number) {
    return this.PaginationServc.isSortDesc(columnId);
  }

  sortByAuctionAttachTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('auctionAttachment', columnId, sortType, dateFormat);
  }

  navigateToPage(pageNoVal: number, section: string) {
    this.PaginationServc.setPagerValues(
      this.auctionItem.auctionAttachement.length,
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
}
