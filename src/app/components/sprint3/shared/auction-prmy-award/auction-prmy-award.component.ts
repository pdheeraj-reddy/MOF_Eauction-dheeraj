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

  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  @ViewChild("showSuccessfulRejModal") modalContentRej: TemplateRef<any>;
  showAttachLoader: boolean = false;
  showConfirmationAccept : boolean = false;
  showSuccessAccept : boolean = false;
  showConfirmationReject : boolean = false;
  showSuccessReject : boolean = false;
  
  constructor(private api : AucModeratorService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  approve(){
    this.showSuccessAccept = true;
    // this.api.postAppporRej(this.prmyaward,'M').subscribe((res=>{
    //   console.log(res)
    //   if(res['d']['Msgty'] === 'S'){
    //     this.modalService.open(this.modalContentApp).result.then((result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    //   }
    // }))
  }

  reject(){
    this.showConfirmationReject = false;
    this.showSuccessReject = true;
    // this.api.postAppporRej(this.prmyaward,'D').subscribe((res=>{
    //   console.log(res)
    //   if(res['d']['Msgty'] === 'S'){
    //   this.modalService.open(this.modalContentRej).result.then((result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });
    // }
   
    // }))
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  openFile(file: any, option: string) {
    if(file == 'ibga') file = this.ibgaDoc;
    console.log("🎯TC🎯 ~ file: send-bidding-offer.component.ts ~ line 151 ~ file", file);
    if (file.FilenetId) {
      this.showAttachLoader = true;
      this.api.downloadAuctionImages(file.FilenetId).subscribe((downloadAuctionImagesResp: any) => {
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
        var newWin: any;
        if (option == 'view') {
          newWin = window.open(fileURL, '_blank');
          this.showAttachLoader = false;
        } else {
          newWin = this.downloadFile(file.FileName, file.MIMEType, fileURL);
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
