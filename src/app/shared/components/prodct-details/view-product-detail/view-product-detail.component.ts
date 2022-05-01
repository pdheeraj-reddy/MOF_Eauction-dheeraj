import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface DialogData {
  productDetails: any;
  index: any;
  isBidUpdate: any;
}

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss'],
})
export class ViewProductDetailComponent implements OnInit {
  product: any;
  index: any;
  price: any = 0;
  isBidUpdate: boolean = false;
  slidesStore: any = [
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },    {
      id: '1',
      src: 'https://picsum.photos/200',
      alt: 'test',
      title: 'hello world',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ViewProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog
  ) {}

  customOptions: OwlOptions = {
    items: 5,
    autoHeight: false,
    autoWidth: false,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    nav: false,
  };

  sortByTableHeaderId(a: number, b: string) {}
  closeDialog() {
    this.dialogRef.close({
      index: this.index,
      price: this.price,
    });
  }

  ngOnInit(): void {
    this.product = this.dialogData.productDetails;
    this.index = this.dialogData.index;
    this.isBidUpdate = this.dialogData.isBidUpdate;
    this.price = this.product?.['ZzPdtEstPricePc'];
    console.log('haro', this.product);
  }
}
