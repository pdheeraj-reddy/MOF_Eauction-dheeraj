import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { BidderService } from '../../services/bidder.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-send-bidding-offer',
  templateUrl: './send-bidding-offer.component.html',
  styleUrls: ['./send-bidding-offer.component.scss']
})
export class SendBiddingOfferComponent implements OnInit {


  @Output() showError = new EventEmitter<boolean>();
  @Input() totalBookValue: number;
  @Input() auctionId: any;

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
  constructor(private bidderService: BidderService) { }

  ngOnInit(): void {
    // this.amount = 30005;
    this.minAmount = this.totalBookValue;
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
  }

  incAmt() {
    this.totalBookValue++;
    this.calc();
  }

  calc() {
    this.persuitRate = Math.round(2.5 * this.totalBookValue) / 100;
    this.addedTaxValue = Math.round(8 * this.totalBookValue) / 100;
    this.totalOfferPrice += this.persuitRate + this.addedTaxValue;
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
      this.invalidFileType = false;
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

  previewFile(file: any) {
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
  sendBidOffer() {

    let totalValue = parseFloat(this.totalBookValue.toString());
    let bidValue = parseFloat(this.minAmount.toString());

    console.log("🚀🚀 ~~ this.totalBookValue < this.minAmount", this.totalBookValue, this.minAmount, this.totalBookValue < this.minAmount);
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
        this.showError.emit(!this.showFileError);
        // this.bidderService.submitBid(this.auctionId, this.totalBookValue.toString()).subscribe((res: any) => {

        // });
      } else {
        this.showFileError = false;
        this.showConfirmation = false;
        this.showError.emit(!this.showFileError);
      }
    }
    console.log(this.showFileError);
  }
}
