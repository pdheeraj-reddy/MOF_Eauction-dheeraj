import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-auction-final-award',
  templateUrl: './auction-final-award.component.html',
  styleUrls: ['./auction-final-award.component.scss']
})
export class AuctionFinalAwardComponent implements OnInit {
  @Input() finalaward: any;  
  @Input() fbgaDoc : any;

  closeResult: string;
  modalOptions:NgbModalOptions;

  showAttachLoader: boolean = false;
  showConfirmationAccept : boolean = false;
  showSuccessAccept : boolean = false;
  showConfirmationReject : boolean = false;
  showSuccessReject : boolean = false;
  showLoader : boolean = false;


  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  @ViewChild("showSuccessfulRejModal") modalContentRej: TemplateRef<any>;
  constructor(private api : AucModeratorService,private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.finalaward
    console.log("🎯TC🎯 ~ file: auction-final-award.component.ts ~ line 32 ~ this.finalaward", this.finalaward);
  }
  approve(){
    this.showLoader = true;
    let data = {
      "AucId": this.finalaward.auctionId,
      "BidderId": this.finalaward.bidderNo,
      "ZzUserAction": 'G'
    }
    this.api.postAppporRej(data).subscribe((res=>{
      console.log(res)
      if(res['d']['Msgty'] === 'S'){
        this.showLoader = false;
        this.showConfirmationAccept = false;
        this.showSuccessAccept = true;
      }
    }));
  }

  reject(){
    this.showLoader = true;
    let data = {
      "AucId": this.finalaward.auctionId,
      "BidderId": this.finalaward.bidderNo,
      "ZzUserAction": 'J'
    }
    this.api.postAppporRej(data).subscribe((res=>{
      console.log(res)
      if(res['d']['Msgty'] === 'S'){
        this.showLoader = false;
        this.showConfirmationReject = false;
        this.showSuccessReject = true;
      }
    }));
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
  downloadPDF(){
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
}
