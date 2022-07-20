import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-auction-prmy-award',
  templateUrl: './auction-prmy-award.component.html',
  styleUrls: ['./auction-prmy-award.component.scss']
})
export class AuctionPrmyAwardComponent implements OnInit {
  closeResult: string;
  modalOptions:NgbModalOptions;
  
  @Input() prmyaward: any;
  @Input() ibgaDoc : any;

  showAttachLoader: boolean = false;
  showConfirmationAccept : boolean = false;
  showSuccessAccept : boolean = false;
  showConfirmationReject : boolean = false;
  showSuccessReject : boolean = false;
  showLoader : boolean = false;
  
  constructor(private api : AucModeratorService,private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("🎯TC🎯 ~ file: auction-prmy-award.component.ts ~ line 29 ~ this.prmyaward", this.prmyaward);
    // this.prmyaward.pdfData = ;
  }
  approve(){
    this.showLoader = true;
    let data = {
      "AucId": this.prmyaward.auctionId,
      "BidderId": this.prmyaward.bidderNo,
      "ZzUserAction": 'M'
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
      "AucId": this.prmyaward.auctionId,
      "BidderId": this.prmyaward.bidderNo,
      "ZzUserAction": 'D'
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
    console.log(this.prmyaward.pdfData);
    let fileName = "Bidder Report.pdf";
    let contentType = "application/pdf";
    this.downloadFile(fileName, contentType, this.prmyaward.pdfData);
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
