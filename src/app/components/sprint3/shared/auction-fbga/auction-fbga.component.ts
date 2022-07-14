import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-auction-fbga',
  templateUrl: './auction-fbga.component.html',
  styleUrls: ['./auction-fbga.component.scss']
})
export class AuctionFbgaComponent implements OnInit {
  @Input() upcomingAuction:any;
  @Input() fbgaDoc: any;
  @Output() showError = new EventEmitter<boolean>();
  invalidFileType: boolean;
  invalidFileSize: boolean;
  auctionId:any;
  showConfirmationModal = false;
  showSuccessfulModal = false;
  showLoader = false;

  acceptedExtensions = ['png', 'jpg', 'docx', 'doc', 'pdf'];

  acceptedFiles = [
    'image/png',
    'application/pdf'
  ];
  files: any[] =[];
  invalidFileCount: boolean = false;
  selectedFileFormat: string;
  selectedFileURL: any;
  showAttachLoader: boolean = false;

  constructor(private bidderService : BidderService, private router: Router) { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
    console.log("🎯TC🎯 ~ file: auction-fbga.component.ts ~ line 27 ~ this.upcomingAuction", this.upcomingAuction.auction_detail.auctionId);
  }
  selectFiles(e: any, dd: string): void {
    this.invalidFileType = true;
    setTimeout(() => {
      this.invalidFileType = false;
    }, 3000);
    let filecount = e.target.files.length;
    if (filecount > 1) {
      this.invalidFileType = false;
      this.invalidFileCount = true;
      
      setTimeout(() => {
        this.invalidFileCount = false;
      }, 3000);
    } else {
      this.customLoop(0, filecount, e.target.files);
    }

  }
  customLoop(index: number, limit: number, file: any) {
    let filesize = file[index]['size'];
    const fileType = file[index]['name'].split(".").pop()?.toLowerCase();
    var ext = file[index]['name'].match(/\.(.+)$/)[1];
    if (ext.indexOf('.') === -1) {
      // this.invalidFileType = false;
      if (!!this.acceptedExtensions.find(x => x === fileType)) {
        this.invalidFileType = false;
        if (!!this.acceptedFiles.find(x => x === file[index]['type'])) {
          this.invalidFileType = false;
          if (filesize <= 2097152) {
            this.FilePushTOArray(file[index], (filesrc: any) => {
              var fileupload = {
                "name": file[index]['name'],
                "size": file[index]['size'],
                "type": file[index]['type'],
                "filesrc": [filesrc]
              };
              if (index < limit - 1) {
                this.customLoop(++index, limit, file);
              }
              this.files.push(fileupload);
              console.log("🚀🚀 ~~ this.files", this.files);
              if (this.checkFile()) {

              }
              // this.auctionAttachement.push(new FormControl(fileupload));
            });
          } else {
            this.invalidFileSize = true;
            setTimeout(() => {
              this.invalidFileSize = false;
            }, 3000);
          }
        }
      }
    }
  }
  checkFile() {
    if (this.files.length) {
      return true;
    } else {
      return false;
    }
  }
  FilePushTOArray(file: any, callback: (filesrc: any) => any) {
    const reader = new FileReader();
    reader.onload = (function (f) {
      return function () {
        callback(reader.result);
      }
    })(file);
    reader.readAsDataURL(file);
  }
  sendFbga(){
    this.showLoader = true;
    console.log("🎯TC🎯 ~ file: auction-fbga.component.ts ~ line 84 ~ this.files", this.files);
      this.bidderService.submitFbga(this.auctionId).subscribe((res)=>{
      console.log("🎯TC🎯 ~ file: auction-fbga.component.ts ~ line 92 ~ res", res.d.Msgty);
      if(res.d.Msgty == 'S'){
        this.showConfirmationModal = false;
        this.showSuccessfulModal = true;
      }
        
      });
  }
  openFile(file: any, option: string) {
    console.log("🎯TC🎯 ~ file: send-bidding-offer.component.ts ~ line 151 ~ file", file);
    if (file.FilenetId) {
      this.showAttachLoader = true;
      this.bidderService.downloadAuctionImages(file.FilenetId).subscribe((downloadAuctionImagesResp: any) => {
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
    } else {
      const fileType = file.name.split(".").pop()?.toLowerCase();
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
      if ((file.type.indexOf('image') > -1) || (file.type.indexOf('video') > -1) || fileType === 'docx' || fileType === 'doc' || fileType === 'pdf') {
        window.open(fileURL, '_blank');
      } else {
        if (file.type.indexOf('image') > -1) {
          this.selectedFileFormat = 'image';
        }
        this.selectedFileURL = file.filesrc['0'].split(',')[1];;
      }
    }
  }
  closeModal(model:string){
  if(model == 'Confirmation'){
    this.showConfirmationModal = false;
  }
  if(model == 'Success'){
    this.showSuccessfulModal = false;
  }
  if(model == "AuctionList"){
    this.showSuccessfulModal = false;
    this.router.navigate(['/bidder']);
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
  removeFile() {
    this.files.pop();
  }
}
