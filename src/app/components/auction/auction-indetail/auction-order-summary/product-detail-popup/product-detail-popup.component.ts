import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuctionService } from 'src/app/service/auction.service';
import { NONE_TYPE } from '@angular/compiler';

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
  showLoader: boolean = false;
  fetchPicture: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<ProductDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    public auctionServc: AuctionService,
    private sanitizer: DomSanitizer
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
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };

  sortByTableHeaderId(a: number, b: string) { }
  closeDialog() {
    this.dialogRef.close();
  }

  viewItem(a: any) {
    this.fullImage = {
      src: a.src,
      type: a.type
    }
    console.log(this.fullImage)
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('lang_pref'))
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      // this.textDir= 'ltr'
    }

    // this.slidesStore = this.dialogData.data;

    this.viewproduct = this.dialogData.viewproduct;
    console.log(this.slidesStore, "HAriiahra");
    console.log('viewproduct ', this.viewproduct);
    if (this.viewproduct.productImages && this.viewproduct.productImages.length < 1) {
      this.showLoader = false;
    } else {
      this.showLoader = true;
      this.viewproduct.productImages.forEach(
        (index: any) => {
          this.downloadImages(index);
        }
      )
      if (this.slidesStore.length == this.viewproduct.productImages.length) {
        this.fetchPicture = false;
      }
    }


    // if (this.slidesStore.length > 0) {
    //   this.fullImage = this.slidesStore[0].src;
    // }
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

  convertBlobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  downloadImages(index: any) {
    this.auctionServc
      .downloadAuctionImages(index.FilenetId)
      .subscribe(
        async (downloadAuctionImagesResp: any) => {

          let filenetId = index.FilenetId;
          console.log(index.FilenetId, "FILENETID");
          const fileResp = downloadAuctionImagesResp.d;
          // console.log(fileResp.FileContent);
          var byteString = atob(
            atob(fileResp.FileContent).split(',')[1]
          );
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: index.MIMEType });
          // var a = window.URL.createObjectURL(blob);
          var base64String = await this.convertBlobToBase64(blob);
          console.log("base64String in mapping for edit");
          console.log(base64String)


          this.slidesStore.push({
            id: index + 1,
            src: this.sanitizer.bypassSecurityTrustResourceUrl(base64String as string),
            alt: 'test',
            title: 'hello world',
            type: index.MIMEType
          });

          if (this.slidesStore.length == this.viewproduct.productImages.length) {
            this.fetchPicture = false;
          }

          if (this.slidesStore.length == 1) {
            this.fullImage = {
              src: this.slidesStore[0].src,
              type: this.slidesStore[0].type
            }
          }

          this.showLoader = false;
        },
        (error) => {
          // this.showLoader = false;
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
  }


  activeDownloadFileIndex = -1;
  // This fuction is used to view and download the attachment files
  viewAttachment(file: any, index: number, option: string) {
    if (file.FilenetId) {
      this.activeDownloadFileIndex = index;
      file.downloading = true;
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
          var newWin: any;
          if (option == 'view') {
            newWin = window.open(fileURL, '_blank');
          } else {
            newWin = this.downloadFile(file.name, file.MIMEType, fileURL);
          }
          if ((!newWin || newWin.closed || typeof newWin.closed == 'undefined') && option == 'view') {
            alert("Unable to open the downloaded file. Please allow popups in case it is blocked at browser level.")
          }
          this.activeDownloadFileIndex = -1;
          file.downloading = false;
          // window.open(fileContent, "_blank");
        },
        (error) => {
          this.activeDownloadFileIndex = -1;
          file.downloading = false;
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


