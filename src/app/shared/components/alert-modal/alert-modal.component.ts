import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvService } from '../../../env.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  dialogObj:any;
  
  constructor(
    private dialog: MatDialog,
    private envService: EnvService,
    private cookieService: CookieService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      console.log(data);
      this.dialogObj = {...data};
    }

  ngOnInit(): void {
    console.log('dialogObj ',  this.dialogObj);
  }

  closeAlertModal() {
    if(this.dialogObj.mnBtnAction == 'logout'){
      this.redirect2IdmHome();
    }
    this.dialog.closeAll();
  }

  redirect2IdmHome(){
    this.cookieService.deleteAll();
    const redirectUrl = this.envService.environment.idmLoginURL;
    console.log('redirectUrl ? ', redirectUrl);
    // window.location.href = redirectUrl;
    // window.location.href = "https://loginpp.etimad.sa/";
    // window.location.href = "https://login.etimad.sa/";
    window.location.href = "https://10.14.8.61:8055";
  }

}
