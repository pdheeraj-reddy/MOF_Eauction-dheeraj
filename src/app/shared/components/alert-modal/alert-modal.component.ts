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
  textDir: string = 'ltr';

  constructor(
    public dialogRef: MatDialogRef<AlertModalComponent>,
    private dialog: MatDialog,
    private envService: EnvService,
    private cookieService: CookieService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogObj = { ...data };
  }

  ngOnInit(): void {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = 'rtl'
    }
  }

  closeAlertModal() {
    if (this.dialogObj.mnBtnAction == 'logout') {
      this.redirect2IdmHome();
    }
    this.dialog.closeAll();
  }

  confirmAlert() {
    this.dialogRef.close(true);
  }

  redirect2IdmHome() {
    this.cookieService.deleteAll();
    const redirectUrl = this.envService.environment.idmHomeUrl;
    window.location.href = redirectUrl;
  }

}
