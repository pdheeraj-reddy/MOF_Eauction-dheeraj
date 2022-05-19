import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuctionService } from 'src/app/service/auction.service';

export interface DialogData {
  data: any;
  viewproduct: any;
}

@Component({
  selector: 'app-product-detail-popup',
  templateUrl: './product-detail-popup.component.html',
  styleUrls: ['./product-detail-popup.component.scss'],
})
export class ProductDetailPopupComponent implements OnInit {
  slidesStore: any = [];
  viewproduct: any;
  fullImage: any;
  textDir = 'ltr';

  constructor(
    public dialogRef: MatDialogRef<ProductDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    public auctionServc: AuctionService,
  ) { }

  customOptions: OwlOptions = {
    items: 4,
    autoHeight: true,
    autoWidth: true,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    nav: false,
  };

  sortByTableHeaderId(a: number, b: string) { }
  closeDialog() {
    this.dialogRef.close();
  }

  viewItem(a: any) {
    this.fullImage = a.src;
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('lang_pref'))
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      // this.textDir= 'ltr'
    }

    this.slidesStore = this.dialogData.data;
    if (this.slidesStore.length > 0) {
      this.fullImage = this.slidesStore[0].src;
    }
    this.viewproduct = this.dialogData.viewproduct;
    console.log(this.slidesStore, "HAriiahra");
    console.log('viewproduct ', this.viewproduct);
  }
  activeDownloadFileIndex = -1;
  // This fuction is used to view and download the attachment files
  viewAttachment(file: any, index:number) {
    if (file.FilenetId) {
      this.activeDownloadFileIndex = index;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
        (downloadAuctionImagesResp: any) => {
          console.log(downloadAuctionImagesResp);
          const fileResp = downloadAuctionImagesResp.d;
          var byteString = atob(atob(fileResp.FileContent).split(',')[1]);
          console.log('asdasd', byteString.split(',')[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: file.MIMEType });
          console.log(blob);
          let fileURL = window.URL.createObjectURL(blob);
          console.log('fileURL', fileURL);
          var newWin = window.open(fileURL, '_blank');
          if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
          {
              alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
          }
          this.activeDownloadFileIndex = -1;
          // window.open(fileContent, "_blank");
        },
        (error) => {
          this.activeDownloadFileIndex = -1;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
    } else {
      const fileType = file.name.split('.').pop()?.toLowerCase();
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
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        console.log('fileURL', fileURL);
        window.open(fileURL, '_blank');
      }
    }
  }
}
