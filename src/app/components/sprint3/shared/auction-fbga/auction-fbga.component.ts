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

  constructor(private bidderService : BidderService, private router: Router) { }

  ngOnInit(): void {
    this.auctionId = this.upcomingAuction.auction_detail.auctionId;
    console.log("🎯TC🎯 ~ file: auction-fbga.component.ts ~ line 27 ~ this.upcomingAuction", this.upcomingAuction.auction_detail.auctionId);
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
      this.showConfirmationModal = true;
      console.log("🎯TC🎯 ~ file: auction-fbga.component.ts ~ line 73 ~ this.showConfirmationModal", this.showConfirmationModal);
      this.showError.emit(false);
    }else{
      this.showError.emit(true);
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
}
