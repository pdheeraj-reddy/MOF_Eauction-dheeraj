import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-auction-final-award',
  templateUrl: './auction-final-award.component.html',
  styleUrls: ['./auction-final-award.component.scss']
})
export class AuctionFinalAwardComponent implements OnInit {
  @Input() finalaward: any;
  @Input() fbgaDoc: any;
  @Input() auctionId: any;
  @Input() statusData: any;

  closeResult: string;
  modalOptions: NgbModalOptions;

  showAttachLoader: boolean = false;
  showConfirmationAccept: boolean = false;
  showSuccessAccept: boolean = false;
  showConfirmationReject: boolean = false;
  showSuccessReject: boolean = false;
  showLoader: boolean = false;
  btnFloat: string;
  sendInvoice = false;
  rejectionNotes: any = '';
  rejectionReason = false;


  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  @ViewChild("showSuccessfulRejModal") modalContentRej: TemplateRef<any>;
  constructor(private api: AucModeratorService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    let currentLang = localStorage.getItem('lang_pref');
    if (currentLang == 'en') {
      this.btnFloat = 'right';
    }
    else {
      this.btnFloat = 'left';
    }

    let bidStatus = this.statusData.ZzBidderSts;
    if (bidStatus == 'G') {
      this.sendInvoice = true;
    }
    else {
      this.sendInvoice = false;
    }


    console.log("🚀🚀 ~~ this.statusData", this.statusData.ZzBidderSts);
  }
  approve() {
    this.showLoader = true;
    let data = {
      "AucId": this.finalaward.auctionId,
      "BidderId": this.finalaward.bidderNo,
      "ZzUserAction": 'G'
    }
    this.api.postAppporRej(data).subscribe((res => {
      console.log(res)
      if (res['d']['Msgty'] === 'S') {
        this.showLoader = false;
        this.showConfirmationAccept = false;
        this.router.navigateByUrl('auctions/send-invoice/' + btoa(this.auctionId))
        // this.showSuccessAccept = true;
        this.sendInvoice = true;
      }
    }));
  }

  reject() {
    let rejectNote = this.rejectionNotes.trim();
    if (rejectNote) {
      this.showLoader = true;
      let data = {
        "AucId": this.finalaward.auctionId,
        "BidderId": this.finalaward.bidderNo,
        "ZzUserAction": 'J',
        "RejectNotes": rejectNote
      }
      this.api.postAppporRej(data).subscribe((res => {
        console.log(res)
        if (res['d']['Msgty'] === 'S') {
          this.showLoader = false;
          this.rejectionReason = false;
          this.showConfirmationReject = false;
          this.showSuccessReject = true;
        }
      }));
    }
    else {
      this.rejectionNotes = "";
      this.rejectionReason = true;
      setTimeout(() => {
        this.rejectionReason = false;
      }, 5000);
    }
  }

  goToInvoice() {
    this.router.navigateByUrl('auctions/send-invoice/' + btoa(this.auctionId), { state: this.statusData });
  }

  ngDoCheck() {
    let currentLang = localStorage.getItem('lang_pref')
    if (currentLang == 'en') {
      this.btnFloat = 'right';
    }
    else {
      this.btnFloat = 'left';
    }
  }

  gotoList() {
    this.router.navigateByUrl('/auctions');
  }


  openFile(file: any, option: string) {
    // console.log(this.ibgaDoc);
    console.log(file);
    this.showAttachLoader = true;
    this.api.downloadAuctionImages(file[0].FilenetId).subscribe((downloadAuctionImagesResp: any) => {
      const fileResp = downloadAuctionImagesResp.d;
      var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
      console.log('asdasd', byteString.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: file[0].MIMEType });
      let fileURL = window.URL.createObjectURL(blob);
      console.log('fileURL ', fileURL);
      var newWin: any;
      if (option == 'view') {
        newWin = window.open(fileURL, '_blank');
        this.showAttachLoader = false;
      } else {
        newWin = this.downloadFile(file[0].FileName, file[0].MIMEType, fileURL);
        this.showAttachLoader = false;
      }
      if ((!newWin || newWin.closed || typeof newWin.closed == 'undefined') && option == 'view') {
        alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
      }
      // window.open(fileContent, "_blank");
    }, (error) => {
      console.log('downloadAuctionImages RespError : ', error);
    }
    );
  }
  downloadPDF() {
    console.log(this.finalaward.pdfData);
    let fileName = "Bidder Report.pdf";
    let contentType = "application/pdf";
    const linkSource = `data:${contentType};base64,${this.finalaward.pdfData}`;
    const downloadLink = document.createElement("a");
    console.log('linkSource: ', linkSource);
    downloadLink.href = linkSource;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    downloadLink.click();
    // this.downloadFile(fileName, contentType, this.prmyaward.pdfData);
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
  reloadPage() {
    window.location.reload();
  }
}
