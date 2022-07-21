import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuctionService } from 'src/app/service/auction.service';
import { PaginationSortingService } from 'src/app/service/pagination.service';

export interface DialogData {
  viewproduct: any;
  data: any;
  productDetails: any;
  index: any;
  isBidUpdate: any;
  status: any
}

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss'],
})
export class ViewProductDetailComponent implements OnInit {
  slidesStore: any = [];
  viewproduct: any;
  fullImage: any;
  textDir = 'ltr';
  product: any;
  index: any;
  price: any = 0;
  isBidUpdate: boolean = false;
  invalid: boolean = false;
  activeIndex = -1;
  loggedUserRole: any;
  showLoader: boolean = false;
  fetchPicture: boolean = true;
  showVideo: boolean = true;
  pageRangeForAttach: any;
  columnLst = ['index', 'name'];

  constructor(
    public PaginationServc: PaginationSortingService,
    public dialogRef: MatDialogRef<ViewProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    public auctionServc: AuctionService,
    private sanitizer: DomSanitizer
  ) { }

  customOptions: OwlOptions = {
    items: 3,
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

  // sortByTableHeaderId(a: number, b: string) { }
  closeDialog() {
    if (this.price < 1) {
      this.invalid = true;
    }
    else {
      this.invalid = false;
      this.dialogRef.close({
        index: this.index,
        price: this.price,
      });
    }

  }

  closeDialogbutton() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      // this.textDir= 'ltr'
    }

    // this.slidesStore = this.dialogData.data;
    // if (this.slidesStore.length > 0) {
    //   this.fullImage = this.slidesStore[0].src;
    // }
    this.viewproduct = this.dialogData.viewproduct;
    console.log("🚀🚀 ~~ this.viewproduct", this.viewproduct);
    this.navigateToPage(1, 'auctionAttach');
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

    if (this.viewproduct?.productFiles.length) {
      this.viewproduct?.productFiles.forEach((element: any, index: number) => {
        element.index = index;
      });
    }

    this.product = this.dialogData.productDetails;
    this.index = this.dialogData.index;
    this.isBidUpdate = this.dialogData.isBidUpdate;
    this.price = this.product?.['ZzPdtEstPricePc'];
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    // this.PaginationServc.sortByTableHeaderId('auctionAttachment', columnId, sortType, dateFormat);
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.viewproduct.productFiles, (this.columnLst[columnId]));
  }

  isSorting(columnId: number) {
    return this.PaginationServc.columnId !== columnId;
  }
  isSortAsc(columnId: number) {
    return this.PaginationServc.isSortAsc(columnId);
  }
  isSorDesc(columnId: number) {
    return this.PaginationServc.isSortDesc(columnId);
  }

  sortByAuctionAttachTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('auctionAttachment', columnId, sortType, dateFormat);
  }

  navigateToPage(pageNoVal: number, section: string) {
    this.PaginationServc.setPagerValues(
      this.viewproduct.productFiles.length,
      4,
      pageNoVal
    );
    if (section == 'auctionAttach') {
      this.pageRangeForAttach = {
        rangeStart: pageNoVal == 1 ? 0 : ((pageNoVal - 1) * 4),
        rangeEnd: pageNoVal == 1 ? 3 : ((pageNoVal - 1) * 4) + 3,
        pages: this.PaginationServc.pages,
        currentPage: this.PaginationServc.currentPage,
        totalPages: this.PaginationServc.totalPages,
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
          const fileResp = downloadAuctionImagesResp.d;
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
          console.log('downloadAuctionImages RespError : ', error);
        }
      );
  }

  viewItem(a: any) {
    this.showVideo = false;
    this.fullImage = {
      src: a.src,
      type: a.type
    }
    setTimeout(() => {
      this.showVideo = true;
    });
  }



  activeDownloadFileIndex = -1;
  // This fuction is used to view and download the attachment files
  viewAttachment(file: any, index: number, option: string) {
    if (file.FilenetId) {
      this.activeDownloadFileIndex = index;
      file.downloading = true;
      this.auctionServc.downloadAuctionImages(file.FilenetId).subscribe(
        (downloadAuctionImagesResp: any) => {
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

      let fileURL = window.URL.createObjectURL(blob);
      if (
        file.type.indexOf('image') > -1 ||
        file.type.indexOf('video') > -1 ||
        fileType === 'docx' ||
        fileType === 'doc' ||
        fileType === 'pdf'
      ) {
        window.open(fileURL, '_blank');
      }
    }
  }
}
