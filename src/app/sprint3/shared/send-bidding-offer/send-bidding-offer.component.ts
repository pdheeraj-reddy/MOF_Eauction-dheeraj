import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { MediaService } from 'src/app/service/media.service';
import { BidderService } from '../../services/bidder.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-send-bidding-offer',
  templateUrl: './send-bidding-offer.component.html',
  styleUrls: ['./send-bidding-offer.component.scss']
})
export class SendBiddingOfferComponent implements OnInit {


  @Output() showError = new EventEmitter<boolean>();
  @Output() diableNow = new EventEmitter<boolean>();
  @Output() noFile = new EventEmitter<boolean>();
  @Input() totalBookValue: number;
  @Input() auctionId: any;
  @Input() disable: any;
  @Input() ibgaDoc: any;
  @Input() notParticipated: any;
  @Input() bidValue: any;
  @Input() commission: any;

  acceptedExtensions = ['png', 'jpg', 'docx', 'doc', 'pdf'];

  acceptedFiles = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  files: any[] = [];
  // amount: number = 0;
  minAmount: number;
  persuitRate: number = 0;
  addedTaxValue: number = 0;
  totalOfferPrice: number = 0;
  invalidFileType: boolean;
  invalidFileCount: boolean;
  invalidFileSize: boolean = false;
  showFileError: boolean = false;
  showConfirmation: boolean = false;
  selectedFileFormat: any;
  selectedFileURL: any;
  amountValidation: boolean = false;
  fileToUpload: any;
  showSuccessfulModal: boolean = false;
  showLoader: boolean = false;
  showAttachLoader: boolean = false;

  constructor(private bidderService: BidderService, private mediaService: MediaService,) { }

  ngOnInit(): void {
    // this.amount = 30005;
    this.minAmount = this.totalBookValue;
    if (this.notParticipated) {
      this.totalBookValue = 0;
    }
    if (this.disable && !this.notParticipated) {
      this.totalBookValue = this.bidValue;
    }

    // this.minAmount = 10;
    // this.totalBookValue = 10;
    this.calc();
  }

  decAmt() {
    if (this.totalBookValue > this.minAmount) {
      this.totalBookValue--;
      this.calc();
    }
  }

  resetAmount() {
    let totalValue = parseFloat(this.totalBookValue.toString());
    let bidValue = parseFloat(this.minAmount.toString());
    if (totalValue < bidValue) {
      this.totalBookValue = this.minAmount
      this.amountValidation = true;
      setTimeout(() => {
        this.amountValidation = false;
      }, 3000);
    }
    this.calc();
  }

  incAmt() {
    this.totalBookValue++;
    this.calc();
  }

  calc() {
    this.persuitRate = Math.round(Number(this.commission) * this.totalBookValue) / 100;
    this.addedTaxValue = Math.round(15 * this.totalBookValue) / 100;
    this.totalOfferPrice = this.persuitRate + this.addedTaxValue + Number(this.totalBookValue);
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
        this.showError.emit(false);
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

  FilePushTOArray(file: any, callback: (filesrc: any) => any) {
    const reader = new FileReader();
    reader.onload = (function (f) {
      return function () {
        callback(reader.result);
      }
    })(file);
    reader.readAsDataURL(file);
  }
  checkOffer() {

    let totalValue = parseFloat(this.totalBookValue.toString());
    let bidValue = parseFloat(this.minAmount.toString());

    if (totalValue < bidValue) {
      this.amountValidation = true;
      this.totalBookValue = this.minAmount;
      setTimeout(() => {
        this.amountValidation = false;
      }, 3000);
    }
    else {
      this.amountValidation = false;
      if (this.checkFile()) {
        this.showFileError = true;
        this.showConfirmation = true;
        // this.showError.emit(!this.showFileError);
        this.noFile.emit(!this.showFileError);

        this.fileToUpload = {
          "FileName": this.files[0].name.split('.')[0],
          // "FileName": this.generateFileName(prefix) + "." + file.name.split('.')[1],
          "FileContent": btoa(this.files[0].filesrc),
          "MIMEType": this.files[0].type,
          "FileLength": '' + this.files[0].size,
          "FileExt": this.files[0].name.substring(this.files[0].name.lastIndexOf('.')).replace('.', ''),
          "ObjectType": "/AuctionPaymentDocuments",
          "ObjectId": this.auctionId,
          "InvoiceForm": "I",
        };
        this.showConfirmation = true;

      } else {
        this.showFileError = false;
        this.showConfirmation = false;
        // this.showError.emit(!this.showFileError);
        this.noFile.emit(!this.showFileError);
      }
    }
  }
  sendBidOffer() {
    this.showLoader = true;
    let dataUpdate = false;
    let fileupload = false;

    this.bidderService.submitBid(this.auctionId, this.totalBookValue.toString()).subscribe((resData: any) => {
      if (resData.d.Msgty == 'S') dataUpdate = true;
      this.bidderService.uploadFile(this.fileToUpload).subscribe((resFile: any) => {
        if (resFile.d.Msgty == 'S') fileupload = true;
        if (dataUpdate && fileupload) {
          this.showConfirmation = false;
          this.showSuccessfulModal = true;
          this.diableNow.emit(true);
        }
      });
    });
  }
  reloadPage() {
    window.location.reload();
  }
}
