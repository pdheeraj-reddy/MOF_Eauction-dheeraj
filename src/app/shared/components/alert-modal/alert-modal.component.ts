import { Component, OnInit, Inject, Optional, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from '../../../env.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  dialogObj: any;

  constructor(
    public dialogRef: MatDialogRef<AlertModalComponent>,
    private dialog: MatDialog,
    private envService: EnvService,
    private cookieService: CookieService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.dialogObj = { ...data };
  }

  ngOnInit(): void {
    console.log('dialogObj ', this.dialogObj);
  }

  closeAlertModal() {
    if (this.dialogObj.mnBtnAction == 'logout') {
      this.redirect2IdmHome();
    }
    this.dialog.closeAll();
  }

  confirmAlert() {
    this.dialogRef.close(true);
    // this.router.navigate(['/auctionlist'])
  }

  redirect2IdmHome() {
    this.cookieService.deleteAll();
    const redirectUrl = this.envService.environment.idmLoginURL;
    console.log('redirectUrl ? ', redirectUrl);
    // window.location.href = redirectUrl;
    // window.location.href = "https://loginpp.etimad.sa/";
    // window.location.href = "https://login.etimad.sa/";
    window.location.href = "https://10.14.8.61:8055";
  }

}
