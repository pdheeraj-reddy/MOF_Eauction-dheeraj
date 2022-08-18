import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AucModeratorService } from '../../services/auc-moderator.service';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { MediaService } from 'src/app/service/media.service';

export interface DialogData {
  data: any;
  viewproduct: any;
}

@Component({
  selector: 'app-product-detail-popup',
  templateUrl: './product-detail-popup.component.html',
  styleUrls: ['./product-detail-popup.component.scss']
})
export class ProductDetailPopupComponent implements OnInit {
  columnLst = ['index', 'name'];
  slidesStore: any = [];
  viewproduct: any;
  fullImage: any;
  textDir = 'ltr';
  showLoader: boolean = false;
  fetchPicture: boolean = false;
  pageRangeForAttach: any;
  activeIndex = -1;
  showVideo: boolean = true;
  longitude: any = '';
  lattitude: any = '';
  @ViewChild('imageSlide', { read: ElementRef }) public imageSlide: ElementRef<any>;
  constructor(
    public dialogRef: MatDialogRef<ProductDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    private auctionModServ: AucModeratorService,
    private sanitizer: DomSanitizer,
    public PaginationServc: PaginationSortingService,
    private mediaService: MediaService,
  ) { }

  customOptions: OwlOptions = {
    // items: 6,
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
  closeDialog() {
    this.dialogRef.close();
  }
  viewItem(a: any, index: number) {
    this.showVideo = false;
    this.fullImage = {
      src: a.src,
      type: a.type,
      index: index + 1
    }
    setTimeout(() => {
      this.showVideo = true;
    });
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByColumnName('inventoryAllocationTable', columnId, sortType, dateFormat);
    this.PaginationServc.sortAllTableData(this.viewproduct.productFiles, this.columnLst[columnId]);
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

  ngOnInit(): void {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
    else {
      // this.textDir= 'ltr'
    }

    // this.slidesStore = this.dialogData.data;
    this.viewproduct = this.dialogData.viewproduct;
    this.longitude = this.viewproduct.location.locLongitude.split(',')[0];
    this.lattitude = this.viewproduct.location.locLatitude.split(',')[1];
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
    this.viewproduct?.productFiles.forEach((element: any, i: number) => {
      element.index = i;
    });
    this.navigateToPage(1, 'auctionAttach');

    // if (this.slidesStore.length > 0) {
    //   this.fullImage = this.slidesStore[0].src;
    // }
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
    this.mediaService.downloadAuctionImages(index.FilenetId).then(async (downloadAuctionImagesResp: any) => {
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
      var base64String = await this.convertBlobToBase64(blob);
      this.slidesStore.push({
        id: index + 1,
        src: this.sanitizer.bypassSecurityTrustResourceUrl(base64String as string),
        alt: 'test',
        title: 'hello world',
        type: index.MIMEType
      });

      if (this.slidesStore.length == 1) {
        this.fullImage = {
          src: this.slidesStore[0].src,
          type: this.slidesStore[0].type,
          index: 1
        }
        this.fetchPicture = true;
      }
      if (this.slidesStore.length == this.viewproduct.productImages.length) {
        this.fetchPicture = false;
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
      this.auctionModServ.downloadAuctionImages(file.FilenetId).subscribe(
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

  scrollImageSlider(side: string) {
    if (side == 'left') {
      this.imageSlide.nativeElement.scrollTo({ left: (this.imageSlide.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    } else if (side == 'right') {
      this.imageSlide.nativeElement.scrollTo({ left: (this.imageSlide.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  }
}
