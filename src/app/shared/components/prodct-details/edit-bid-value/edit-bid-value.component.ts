import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  price: string;
  index: any;
}

@Component({
  selector: 'app-edit-bid-value',
  templateUrl: './edit-bid-value.component.html',
  styleUrls: ['./edit-bid-value.component.scss'],
})
export class EditBidValueComponent implements OnInit {
  name: any;
  price: any;
  index: any;

  constructor(
    public dialogRef: MatDialogRef<EditBidValueComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog
  ) {}

  closeDialog() {
    this.dialogRef.close({
      "index" : this.index,
      "price" : this.price,
    });
  }

  ngOnInit(): void {
    this.name = this.dialogData.name;
    this.price = this.dialogData.price;
    this.index = this.dialogData.index;
  }
}
