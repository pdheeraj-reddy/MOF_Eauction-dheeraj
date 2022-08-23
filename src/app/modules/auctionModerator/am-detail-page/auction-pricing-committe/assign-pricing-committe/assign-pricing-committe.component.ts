import { Component, Input, OnInit, Output, EventEmitter, NgZone, ChangeDetectorRef, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from 'src/app/service/auction.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertModalComponent } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-assign-pricing-committe',
  templateUrl: './assign-pricing-committe.component.html',
  styleUrls: ['./assign-pricing-committe.component.scss'],
})
export class AssignPricingCommitteComponent implements OnInit, OnDestroy {
  @Input() preAuctionData: any;

  @Output() _3MembersErrorMsg = new EventEmitter();
  @Output() stepperEvent1 = new EventEmitter();
  @Output() stepperEvent = new EventEmitter();
  showSuccessPopup = false;
  showCancelPopup = false;
  _3MembersAdded = false;
  showConfirm = false;
  showPageLoader: boolean = false;
  textDir: boolean = false;
  popupTitle: any = '';
  committeeMemberList: any = [];
  existingCommitteSecList: any = [];
  existingCommitteMemberList: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ObjectId: any = '';
  loggedUserRole: any;
  committeeChairSelected: any;
  committeeChairData: any;
  stepIndex: number = 0;
  committeeSecSelected: any;
  committeeSecData: any;
  isPendingReview: boolean = false;
  committeeMem1Data: any;
  committeeMem1Selected: any;

  committeeMem2Data: any;
  committeeMem2Selected: any;

  committeeMem3Data: any;
  committeeMem3Selected: any;

  committeeMem4Data: any;
  committeeMem4Selected: any;
  committeeMemTitle: string = 'Add Committee Member';
  committeeHeadTitle: string = 'Add Committee Head'
  committeeSecTitle: string = 'Add Committee Secretary';
  addcommitteeMemberList: any = [];
  list: any = [];
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  add4Mem: boolean = false;
  constructor(
    private _AuctionService: AuctionModeratorService,
    public auctionServc: AuctionService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    window.addEventListener('beforeunload', (e) => {
    });
  }
  closeConfirm() {
    this.showConfirm = false;
  }
  closeSuccess() {
    this.showSuccessPopup = false;
  }
  async goBack() {
    this.stepperEvent1.emit();
  }
  async goBacktoList() {
    this.router.navigateByUrl('/');
  }
  checkMember() {
    if (
      this.committeeChairData == undefined ||
      this.committeeMem1Data == undefined ||
      this.committeeMem2Data == undefined ||
      this.committeeMem3Data == undefined
    ) {
      this._3MembersErrorMsg.emit(true);
      window.scroll({ top: 0, behavior: "smooth" });
    } else {
      this._3MembersAdded = true;
      this.showConfirm = true;
    }
  }
  checkData() {
    if (
      this.committeeChairData ||
      this.committeeSecData ||
      this.committeeMem1Data ||
      this.committeeMem2Data ||
      this.committeeMem3Data ||
      this.committeeMem4Data
    ) {
      this.showCancelPopup = true;
    }
  }
  cancelMember() {
    this.committeeChairData = undefined
    this.committeeMem1Data = undefined
    this.committeeMem2Data = undefined
    this.committeeMem3Data = undefined
    this.committeeMem4Data = undefined
    this.committeeSecData = undefined;
    this.existingCommitteMemberList = [];
    this.addcommitteeMemberList = [];
    this._3MembersErrorMsg.emit(false);
    this.committeeChairSelected = false;
    this.committeeSecSelected = false;
    this.committeeMem1Selected = false;
    this.committeeMem2Selected = false;
    this.committeeMem3Selected = false;
    this.committeeMem4Selected = false;
    this.add4Mem = false;

    this.auctionServc.unsaved = false;
    this.showCancelPopup = false;
  }

  assignPricingCommittee() {
    this.showPageLoader = true;
    this.showConfirm = false;
    console.log(this.preAuctionData);
    this.preAuctionData;
    if (
      this.committeeChairData == undefined ||
      this.committeeMem1Data == undefined ||
      this.committeeMem2Data == undefined ||
      this.committeeMem3Data == undefined
    ) {
      console.log(this.committeeChairData);
      return;
    } else {
      console.log(this.committeeChairData);
      let temp = [];
      temp.push(this.committeeChairData);
      temp.push(this.committeeMem1Data);
      temp.push(this.committeeMem2Data);
      temp.push(this.committeeMem3Data);
      if (this.committeeMem4Data != undefined) temp.push(this.committeeMem4Data);
      if (this.committeeSecData != undefined) temp.push(this.committeeSecData);
      if (this.addcommitteeMemberList?.length) {
        this.addcommitteeMemberList.forEach((element: any) => {
          temp.push(element);
        });
      }
      this._AuctionService
        .approveOrRejectAuction({
          ActionTaken: 'A',
          ZzPrtReason: '',
          ObjectId: this.preAuctionData.ObjectId,
          Description: this.preAuctionData.Description,
          Status: 'Pending Review', // Rejected
          UserId: '1827879980',
          listtocomiteememnav: temp,
          listtoproductnav: [{}],
        })
        .subscribe(
          (res: any) => {
            this.showSuccessPopup = true;
            this.auctionServc.unsaved = false;
            this.showPageLoader = false;
            this.getPreAuctionData();
          },
          (error) => {
            this.showPageLoader = false;
            console.log('approveOrRejectAuction RespError : ', error);
          }
        );
    }
  }


  filterMember(member: any) {
    if (member.length > 0) {
      this.list = [];
      for (var index1 = 0; index1 < this.committeeMemberList.length; index1++) {
        var flag = false;
        for (var index2 = 0; index2 < member.length; index2++) {

          if (this.committeeMemberList[index1].EmployeeId == member[index2]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.list.push(this.committeeMemberList[index1]);
        }
      }
      this.committeeMemberList = this.list;
    }
  }
  openAddChairDialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            disableClose: true,
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.committeeChairData,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              if (this.committeeChairData) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeChairData.EmployeeId)
              }
              this.committeeChairData = result;
              this.existingCommitteMemberList.push(this.committeeChairData.EmployeeId);
            }
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_HEAD')
              this.committeeChairSelected = true;
            this.hideErrorMsg();
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }

  }

  openAddSecDialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.committeeSecData,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result && this.preAuctionData.listtocomiteememnav.results.length > 0) {
              for (
                let i = 0;
                i < this.preAuctionData.listtocomiteememnav.results;
                i++
              ) {
                if (
                  this.preAuctionData.listtocomiteememnav.results[i]
                    .EmployeeRole == result.EmployeeRole
                ) {
                  this.preAuctionData.listtocomiteememnav.results[i].push({
                    AucId: this.preAuctionData.ObjectId,
                    EmployeeId: result.EmployeeId,
                    EmployeeName: result.EmployeeName,
                    AucDesc: '',
                    EmpMailid: result.EmpMailid,
                    EmployeeRole: result.EmployeeRole,
                    Requestor: '',
                    UserId: '',
                  });
                }
              }
            } else {
              if (result) {
                this.preAuctionData.listtocomiteememnav.results.push({
                  AucId: this.preAuctionData.ObjectId,
                  EmployeeId: result.EmployeeId,
                  EmployeeName: result.EmployeeName,
                  AucDesc: '',
                  EmpMailid: result.EmpMailid,
                  EmployeeRole: result.EmployeeRole,
                  Requestor: '',
                  UserId: '',
                });
              }
            }
            if (result) {
              this.auctionServc.unsaved = true;
              if (this.committeeSecData) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeSecData.EmployeeId)
              }
              this.committeeSecData = result;
              this.existingCommitteMemberList.push(this.committeeSecData.EmployeeId);
            }
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_SECRETARY')
              this.committeeSecSelected = true;
            this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openAddMem1Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.committeeMem1Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              result.SlNo = '01';
              if (this.committeeMem1Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem1Data.EmployeeId)
              }
              this.committeeMem1Data = result;
              this.existingCommitteMemberList.push(this.committeeMem1Data.EmployeeId);
            }

            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
              this.committeeMem1Selected = true;
            }
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openAddMem2Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.committeeMem2Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              result.SlNo = '02';
              if (this.committeeMem2Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem2Data.EmployeeId)
              }
              this.committeeMem2Data = result;
              this.existingCommitteMemberList.push(this.committeeMem2Data.EmployeeId);
            }
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
              this.committeeMem2Selected = true;
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openAddMem3Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.committeeMem3Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              result.SlNo = '03';
              if (this.committeeMem3Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem3Data.EmployeeId)
              }
              this.committeeMem3Data = result;
              this.existingCommitteMemberList.push(this.committeeMem3Data.EmployeeId);
            }
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
              this.committeeMem3Selected = true;
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  hideErrorMsg() {
    if (this.committeeMem1Data != undefined && this.committeeMem2Data != undefined && this.committeeMem3Data != undefined) {
      this._3MembersErrorMsg.emit(false);
    }
  }

  openAddMem4Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              if (this.addcommitteeMemberList != '') {
                var memberno = parseInt(this.addcommitteeMemberList.slice(-1)[0].SlNo) + 1;
                result.SlNo = (memberno < 10) ? "0" + memberno : memberno;
              } else {
                result.SlNo = '04';
              }
              // this.committeeMem4Data = result;

              if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
                // this.committeeMem4Selected = true;
                this.addcommitteeMemberList.push(result);
                this.existingCommitteMemberList.push(result.EmployeeId);
              }
            }
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openEditMem4Dialog(title: any, role: string, index: any) {
    if (this.preAuctionData.Status == 'Pending Review') {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(btoa(role)).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
            disableClose: true,
            height: 'auto',
            width: 'auto',
            minWidth: '50%',
            position: {
              left: '25%',
            },
            data: {
              title: title,
              role: role,
              committeeMemberList: this.committeeMemberList,
              committeeEditData: this.addcommitteeMemberList[index],
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.auctionServc.unsaved = true;
              if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
                result.SlNo = this.addcommitteeMemberList[index].SlNo;
                this.addcommitteeMemberList[index] = result;
              }
            }
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.loggedUserRole = this.auctionServc.getLoggedUserRole();

    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
    }
    this.committeeChairSelected = false;
    this.committeeSecSelected = false;
    this.committeeMem1Selected = false;
    this.committeeMem2Selected = false;
    this.committeeMem3Selected = false;
    this.committeeMem4Selected = false;
    this._3MembersAdded = false;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.getPreAuctionData();
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = false;
    }
    else {
      this.textDir = true;
    }
  }

  getPreAuctionData() {
    this.showPageLoader = true;
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.preAuctionData = res.body.d.results[0];
        let temp = this.preAuctionData;
        this.isPendingReview = this.preAuctionData.Status == 'Pending Review' ? true : false;
        this.addcommitteeMemberList = [];
        if (temp?.listtocomiteememnav?.results?.length > 0) {
          let data = temp.listtocomiteememnav.results;
          for (let i = 0; i < data.length; i++) {
            this.showPageLoader = false;
            if (data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_HEAD') {
              this.committeeChairSelected = true;
              this.committeeChairData = data[i];
            }
            if (data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_SECRETARY') {
              this.committeeSecSelected = true;
              this.committeeSecData = data[i];
            }
            if (data[i].SlNo == '01') {
              this.committeeMem1Selected = true;
              this.committeeMem1Data = data[i];
            }
            if (data[i].SlNo == '02') {
              this.committeeMem2Selected = true;
              this.committeeMem2Data = data[i];
            }
            if (data[i].SlNo == '03') {
              this.committeeMem3Selected = true;
              this.committeeMem3Data = data[i];
            }
            if (data[i].SlNo !== '01' && data[i].SlNo !== '02' && data[i].SlNo !== '03' && data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
              this.committeeMem4Selected = true;
              this.addcommitteeMemberList.push(data[i])
            }
          }
        }
        else {
          this.showPageLoader = false;
        }
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
  }


  goBackAgain() {
    this.stepperEvent.emit();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy() {
    this.auctionServc.unsaved = false;
  }
}
