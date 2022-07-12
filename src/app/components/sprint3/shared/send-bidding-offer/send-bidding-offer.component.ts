import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BidderService } from '../../services/bidder.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-send-bidding-offer',
  templateUrl: './send-bidding-offer.component.html',
  styleUrls: ['./send-bidding-offer.component.scss']
})
export class SendBiddingOfferComponent implements OnInit {

  @Output() showError = new EventEmitter<boolean>();
  @Input() totalBookValue : number;
  @Input() auctionId : any;

  acceptedExtensions = ['png', 'jpg', 'docx', 'doc', 'pdf'];

  acceptedFiles = [
    'image/png',
    'application/pdf',];

  files: any[] =[];
  // amount: number = 0;
  minAmount: number;
  persuitRate: number = 0;
  addedTaxValue: number = 0;
  totalOfferPrice: number = 0;
  invalidFileType: boolean;
  invalidFileSize: boolean;
  showFileError: boolean = false;
  showConfirmation: boolean = false;
  constructor(private bidderService : BidderService) { }

  ngOnInit(): void {
    // this.amount = 30005;
    this.minAmount = this.totalBookValue;
    // this.minAmount = 10;
    // this.totalBookValue = 10;
    this.calc();
  }

  decAmt() {
    if(this.totalBookValue > this.minAmount) {
      this.totalBookValue--;
      this.calc();
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
    this.invalidFileSize = false;
    let filecount = e.target.files.length;
    this.customLoop(0, filecount, e.target.files);
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
              if(this.checkFile()){

              }
             // this.auctionAttachement.push(new FormControl(fileupload));
            });
          } else {
            this.invalidFileSize = true;
          }
        }
      }
    }
  }
  checkFile(){
    if(this.files.length){
      return true;
    }else{
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
  sendBidOffer(){
    console.log("🎯TC🎯 ~ file: send-bidding-offer.component.ts ~ line 115 ~ this.files", this.files);
    
    if(this.checkFile()){
      this.showFileError =true;
      this.showConfirmation = true;
      this.showError.emit(!this.showFileError);
      this.bidderService.submitBid(this.auctionId, this.totalBookValue.toString()).subscribe((res:any)=>{

      });
    }else{
      this.showFileError = false;
      this.showConfirmation = false;
      this.showError.emit(!this.showFileError);
    }
    console.log(this.showFileError);
  }
}
