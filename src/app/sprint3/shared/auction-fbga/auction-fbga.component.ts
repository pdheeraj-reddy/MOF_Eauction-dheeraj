import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/service/media.service';
import { BidderService } from '../../services/bidder.service';

@Component({
  selector: 'app-auction-fbga',
  templateUrl: './auction-fbga.component.html',
  styleUrls: ['./auction-fbga.component.scss']
})
export class AuctionFbgaComponent implements OnInit {
  @Input() upcomingAuction: any;
  @Input() fbgaDoc: any;
  @Input() bidderStatus: any;
  @Output() showError = new EventEmitter<boolean>();
  @Output() noFile = new EventEmitter<boolean>();
  invalidFileType: boolean;
  invalidFileSize: boolean;
  auctionId: any;
  showConfirmationModal = false;
  showSuccessfulModal = false;
  showLoader = false;
  disableBtn = false;
  disableInput = false;
  disable = false;
  showRejectionReason = false;
  acceptedExtensions = ['png', 'jpg', 'docx', 'doc', 'pdf'];

  acceptedFiles = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  files: any[] = [];
  invalidFileCount: boolean = false;
  selectedFileFormat: string;
  selectedFileURL: any;
  showAttachLoader: boolean = false;
  fileToUpload: {
    FileName: any;
    // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
    FileContent: string; MIMEType: any; FileLength: string; FileExt: any; ObjectType: string; ObjectId: any; InvoiceForm: string;
  };

  constructor(private bidderService: BidderService, private router: Router, private mediaService: MediaService,) { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
    console.log("🚀🚀 ~~ this.upcomingAuction", this.upcomingAuction);
    if (this.bidderStatus == "M") {
      this.disable = false;
      this.disableBtn = false;
      this.disableInput = false;
    } else if (this.bidderStatus == "J") {
      this.disable = false;
      this.disableBtn = false;
      this.disableInput = false;
    }
    else {
      this.disable = true;
      this.disableBtn = true;
      this.disableInput = true;
    }

    if (this.upcomingAuction?.rejectNotes) {
      this.showRejectionReason = true;
    }
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
      // this.showError.emit(true);
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
        this.showError.emit(false);
        this.invalidFileType = false;
        if (!!this.acceptedFiles.find(x => x === file[index]['type'])) {
          // this.showError.emit(false);
          this.invalidFileType = false;
          if (filesize <= 2097152) {
            // this.showError.emit(false);
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
            });
          } else {
            // this.showError.emit(true);
            this.invalidFileSize = true;
            setTimeout(() => {
              this.invalidFileSize = false;
            }, 3000);
          }

        }
      } else {
        this.showError.emit(true);
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

  sendFbga() {
    if (this.checkFile()) {
      // this.showError.emit(false);
      this.noFile.emit(false);
      this.showConfirmationModal = true;
    } else {
      // this.showError.emit(true);
      this.noFile.emit(true);
    }

  }
  makeAPIcall() {
    this.fileToUpload = {
      "FileName": this.files[0].name.split('.')[0],
      // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
      "FileContent": btoa(this.files[0].filesrc),
      "MIMEType": this.files[0].type,
      "FileLength": '' + this.files[0].size,
      "FileExt": this.files[0].name.substring(this.files[0].name.lastIndexOf('.')).replace('.', ''),
      "ObjectType": "/AuctionPaymentDocuments",
      "ObjectId": this.auctionId,
      "InvoiceForm": "F",
    };
    this.showLoader = true;
    this.bidderService.submitFbga(this.auctionId).subscribe((resData) => {
      this.bidderService.uploadFile(this.fileToUpload).subscribe((resFile) => {
        if (resData.d.Msgty == 'S' && resFile.d.Msgty == 'S') {
          this.disableBtn = true;
          this.disableInput = true;
          this.showConfirmationModal = false;
          this.showSuccessfulModal = true;
        }
      });

    });
  }
  openFile(file: any, option: string) {
    if (file.FilenetId) {
      this.showAttachLoader = true;
      this.mediaService.downloadAuctionImages(file.FilenetId).then((downloadAuctionImagesResp: any) => {
        const fileResp = downloadAuctionImagesResp.d;
        var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: file.MIMEType });
        let fileURL = window.URL.createObjectURL(blob);
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
  closeModal(model: string) {
    if (model == 'Confirmation') {
      this.showConfirmationModal = false;
    }
    if (model == 'Success') {
      this.showSuccessfulModal = false;
    }
    if (model == "AuctionList") {
      this.showSuccessfulModal = false;
      this.router.navigate(['/bidder']);
    }
  }
  downloadFile(fileName: string, contentType: string, base64Data: string) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = base64Data;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    downloadLink.click();
  }
  removeFile() {
    this.files.pop();
  }
  reloadPage() {
    window.location.reload();
  }
}
