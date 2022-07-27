import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuctionService } from 'src/app/service/auction.service';

@Component({
  selector: 'app-assign-auction-committe',
  templateUrl: './assign-auction-committe.component.html',
  styleUrls: ['./assign-auction-committe.component.scss'],
})
export class AssignAuctionCommitteComponent implements OnInit {
  @Input() isPublishTab: boolean = false;
  @Input() auctionAnnouncement: boolean;

  @Output() _3MembersErrorMsg = new EventEmitter();
  @Output() callstepper = new EventEmitter();
  @Output() stepperEvent1 = new EventEmitter();
  @Output()
  _3MembersAdded = false;
  showConfirm = false;
  showCancelPopup = false;
  textDir = false;
  showSuccessPopup = false;
  preAuctionData: any;
  popupTitle: any = '';
  committeeMemberList: any = [];

  commiteeMemberData = false;
  cancelPopupVar = false;
  add4Mem: boolean = false;
  list: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  committeeChairSelected: any;
  committeeChairData: any;
  showPageLoader: boolean = false;
  isPendingPublish: boolean = false;
  ObjectId: any = '';
  DraftId: any = '';

  committeeSecSelected: any;
  committeeSecData: any;

  committeeMem1Data: any;
  committeeMem1Selected: any;

  committeeMem2Data: any;
  committeeMem2Selected: any;

  committeeMem3Data: any;
  committeeMem3Selected: any;

  committeeMem4Data: any;
  committeeMem4Selected: any;

  addcommitteeMemberList: any = [];
  @ViewChild('stepper') stepper: MatStepper;
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  existingCommitteMemberList: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _AuctionService: AuctionModeratorService,
    public auctionServc: AuctionService,
    public dialog: MatDialog,
    public router: Router
  ) {
    window.addEventListener('beforeunload', (e) => {
      // if (this.auctionServc.unsaved) {
      // e.preventDefault();
      // e.returnValue = '';
      // }
    });
    // this.auctionServc.unsaved = false;
  }

  memberSelected(data: any) {
    console.log(data);
  }
  filterMember(member: any) {
    if (member.length > 0) {
      this.list = [];
      console.log("Member:" + member);
      for (var index1 = 0; index1 < this.committeeMemberList.length; index1++) {
        var flag = false;
        for (var index2 = 0; index2 < member.length; index2++) {
          console.log(index1);

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
      console.log(this.list);
    }
  }
  closeConfirm() {
    this.showConfirm = false;
  }
  closeSuccess() {
    this.showSuccessPopup = false;
    this.callstepper.emit();
  }

  checkData(){
    if(
      this.committeeChairData || 
      this.committeeSecData ||
      this.committeeMem1Data || 
      this.committeeMem2Data ||
      this.committeeMem3Data ||
      this.committeeMem4Data 
      ){
        this.cancelPopupVar = true;
      }
  }
  cancelMember() {
    this.committeeChairData = undefined;
    this.committeeMem1Data = undefined;
    this.committeeMem2Data = undefined;
    this.committeeMem3Data = undefined;
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
    // this.ngOnInit();
    this.cancelPopupVar = false;
    this.router.navigate(['/auctionlist']);
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
      // if (this.committeeChairData == undefined) {

      //   this._3MembersErrorMsg.emit(true);
      //   console.log(this.committeeChairData);
      //   alert('Enter Required fields');
      // } else {
      //   this._3MembersErrorMsg.emit(true);
      // }
    } else {
      this._3MembersAdded = true;
      this.showConfirm = true;
    }
  }
  assignAuctionCommittee() {
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
      this.showSuccessPopup = false;
      console.log(this.committeeChairData);
      // alert('Enter Required fields');
      return;
    } else {
      console.log(this.committeeChairData);
      // alert('good to go00000000000');
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
      console.log({
        ActionTaken: 'A',
        ZzPrtReason: '', // Reject reason
        ObjectId: this.preAuctionData.ObjectId, // 9700000487     9700000488   9700000489
        Description: this.preAuctionData.Description,
        Status: 'Pending to Publish', // Rejected
        listtocomiteememnav: temp,
        ZzAgencyId: this.preAuctionData.ZzAgencyId,
        listtoproductnav: [{}],
      });
      this._AuctionService
        .approveOrRejectAuction({
          ActionTaken: 'A',
          ZzPrtReason: '', // Reject reason
          ObjectId: this.preAuctionData.ObjectId, // 9700000487     9700000488   9700000489
          Description: this.preAuctionData.Description,
          Status: 'Pending to Publish', // Rejected
          UserId: '1827879980',
          listtocomiteememnav: temp,
          listtoproductnav: [{}],
        })
        .subscribe(
          (res: any) => {
            this.showPageLoader = false;
            this.showSuccessPopup = true;
            this.getPreAuctionData();
            console.log(res);
          },
          (error) => {
            this.showPageLoader = false;
            // alert("Internal server error!");
            console.log('approveOrRejectAuction RespError : ', error);
          }
        );
    }
  }
  openAddChairDialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
          console.log(this.committeeChairData);
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
              committeeEditData: this.committeeChairData,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(this.preAuctionData);
            if (result) {
              this.auctionServc.unsaved = true;
              if (this.committeeChairData) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeChairData.EmployeeId)
              }
              this.committeeChairData = result;
              this.existingCommitteMemberList.push(this.committeeChairData.EmployeeId);
              if (this.existingCommitteMemberList.length == 4) {
                this.add4Mem = true;
              }
            }
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_CHAIRMAN')
              this.committeeChairSelected = true;
            this.hideErrorMsg();
            console.log(result);
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }

  }

  openAddSecDialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
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
            } else if (result) {
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

            if (result) {
              this.auctionServc.unsaved = true;
              if (this.committeeSecData) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeSecData.EmployeeId)
              }
              this.committeeSecData = result;
              this.existingCommitteMemberList.push(this.committeeSecData.EmployeeId);
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_SECRETARY')
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

    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);

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
              result.SlNo = '05';
              if (this.committeeMem1Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem1Data.EmployeeId)
              }
              this.committeeMem1Data = result;
              this.existingCommitteMemberList.push(this.committeeMem1Data.EmployeeId);

            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem1Selected = true;
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg()
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openAddMem2Dialog(title: any, role: string) {

    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
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
              result.SlNo = '06';
              if (this.committeeMem2Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem2Data.EmployeeId)
              }
              this.committeeMem2Data = result;
              this.existingCommitteMemberList.push(this.committeeMem2Data.EmployeeId);
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem2Selected = true;
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg()
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openAddMem3Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
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
              result.SlNo = '07';
              if (this.committeeMem3Data) {
                this.existingCommitteMemberList = this.existingCommitteMemberList.filter((i: string) => i !== this.committeeMem3Data.EmployeeId)
              }
              this.committeeMem3Data = result;
              this.existingCommitteMemberList.push(this.committeeMem3Data.EmployeeId);
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem3Selected = true;
            if (this.committeeMem1Selected == true && this.committeeMem2Selected == true && this.committeeMem3Selected == true) {
              this.add4Mem = true;
            }
            this.hideErrorMsg()
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  // openAddMem4Dialog(title: any, role: string) {
  //   this.showPageLoader = true;
  //   if (this.preAuctionData.Status == 'Pending to Publish')
  //     this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
  //       (res: any) => {
  //         this.showPageLoader = false;
  //         this.committeeMemberList = res.d.results;
  //         this.filterMember(this.existingCommitteMemberList);
  //         console.log(this.committeeMemberList);
  //         const dialogRef = this.dialog.open(AddMemberComponent, {
  //           disableClose : true,
  //           height: 'auto',
  //           width: 'auto',
  //           minWidth: '50%',
  //           position: {
  //             left: '25%',
  //           },
  //           data: {
  //             title: title,
  //             role: role,
  //             committeeMemberList: this.committeeMemberList,
  //             committeeEditData: this.committeeMem4Data,
  //           },
  //           panelClass: 'my-custom-dialog-class',
  //         });
  //         dialogRef.afterClosed().subscribe((result) => {
  //           result.SlNo = '08';
  //           this.committeeMem4Data = result;
  //           this.existingCommitteMemberList.push(this.committeeMem4Data.EmployeeId);
  //           console.log(result?.EmployeeRole);
  //           if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
  //             this.committeeMem4Selected = true;
  //         });
  //       },
  //       (error) => {
  //         console.log('approveOrRejectAuction RespError : ', error);
  //       }
  //     );
  // }

  openAddMem4Dialog(title: any, role: string) {

    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          console.log(this.addcommitteeMemberList);
          console.log(this.existingCommitteMemberList);
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
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
                result.SlNo = '08';
              }
              // this.committeeMem4Data = result;

              if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER') {
                // this.committeeMem4Selected = true;
                this.addcommitteeMemberList.push(result);
                console.log(result);
                this.existingCommitteMemberList.push(result.EmployeeId);
                console.log("this.addcommitteeMemberList");
                console.log(this.addcommitteeMemberList);
              }
            }
            console.log(result?.EmployeeRole);
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
    }
  }

  openEditMem4Dialog(title: any, role: string, index: any) {

    if (this.preAuctionData.Status == 'Pending to Publish' && this.commiteeMemberData != true) {
      this.showPageLoader = true;
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log('getCommitteeMembersBasedOnRole ', res.body);
          this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
          this.committeeMemberList = res.body.d.results;
          console.log(this.addcommitteeMemberList);
          console.log(this.existingCommitteMemberList);
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
              if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER') {
                result.SlNo = this.addcommitteeMemberList[index].SlNo;
                this.addcommitteeMemberList[index] = result;
                console.log("this.addcommitteeMemberList");
                console.log(this.addcommitteeMemberList);
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
  hideErrorMsg() {
    if (this.committeeMem1Data != undefined && this.committeeMem2Data != undefined && this.committeeMem3Data != undefined) {
      this._3MembersErrorMsg.emit(false);
      console.log("notempty");
    }
  }
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
    }
    this.getPreAuctionData();
    this.committeeChairSelected = false;
    this.committeeSecSelected = false;
    this.committeeMem1Selected = false;
    this.committeeMem2Selected = false;
    this.committeeMem3Selected = false;
    this.committeeMem4Selected = false;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngDoCheck() {
    if (localStorage.getItem('lang_pref') == 'ar') {
      this.textDir = false;
    }
    else {
      this.textDir = true;
    }
  }

  async goBack() {
    this.stepperEvent1.emit();
    // this.router.navigateByUrl('/');
  }

  getPreAuctionData() {
    this.showPageLoader = true;
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.preAuctionData = res.body.d.results[0];
        let temp = res.body.d.results[0];
        console.log(temp);
        this.isPendingPublish = this.preAuctionData.CommitteeAssigned == 'X' ? false : true;
        if (temp?.listtocomiteememnav?.results?.length > 0) {
          let data = temp.listtocomiteememnav.results;
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            this.showPageLoader = false;
            console.log(data[i]);
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_CHAIRMAN') {
              this.commiteeMemberData = true;
              this.committeeChairSelected = true;
              this.committeeChairData = data[i];
            }
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_SECRETARY') {
              this.committeeSecSelected = true;
              this.committeeSecData = data[i];
            }
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER') {
              if (this.committeeMem1Data == undefined) {
                this.committeeMem1Selected = true;
                this.committeeMem1Data = data[i];
              }
              else if (this.committeeMem2Data == undefined) {
                this.committeeMem2Selected = true;
                this.committeeMem2Data = data[i];
              }
              else if (this.committeeMem3Data == undefined) {
                this.committeeMem3Selected = true;
                this.committeeMem3Data = data[i];
              }
              else if (this.committeeMem4Data == undefined) {
                this.committeeMem4Selected = true;
                this.addcommitteeMemberList.push(data[i])
              }
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
    // let temp = this._AuctionService.getAuctionDetails(this.ObjectId);
    // this.preAuctionData = temp['d']['results'][0];
    // for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
    //   this.productValue =
    //     this.productValue +
    //     parseFloat(
    //       this.preAuctionData.listtoproductnav.results[i].ProductValue
    //     );
    // }
  }

  goBacktoList() {
    this.router.navigateByUrl('/');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
