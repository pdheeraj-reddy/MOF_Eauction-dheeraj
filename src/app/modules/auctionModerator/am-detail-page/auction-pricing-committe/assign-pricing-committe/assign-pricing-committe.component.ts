import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-pricing-committe',
  templateUrl: './assign-pricing-committe.component.html',
  styleUrls: ['./assign-pricing-committe.component.scss'],
})
export class AssignPricingCommitteComponent implements OnInit {
  @Input() preAuctionData: any;

  @Output() _3MembersErrorMsg = new EventEmitter();

  showSuccessPopup = false;
  _3MembersAdded = false;
  showConfirm = false;
  showPageLoader: boolean = false;
  popupTitle: any = '';
  committeeMemberList: any = [];
  existingCommitteMemberList: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ObjectId: any = '';
  committeeChairSelected: any;
  committeeChairData: any;

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
  list: any = [];
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  add4Mem: boolean = false;
  constructor(
    private _AuctionService: AuctionModeratorService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }
  closeConfirm() {
    this.showConfirm = false;
  }
  closeSuccess() {
    this.showSuccessPopup = false;
  }
  goBack() {
    this.router.navigateByUrl('/');
  }
  checkMember() {
    if (
      this.committeeChairData == undefined ||
      this.committeeMem1Data == undefined ||
      this.committeeMem2Data == undefined ||
      this.committeeMem3Data == undefined
    ){
      if( this.committeeChairData == undefined){
        console.log(this.committeeChairData);
        alert('Enter Required fields');
      }else{
        this._3MembersErrorMsg.emit(true);
      }
    }else{
      this._3MembersAdded = true;
      this.showConfirm = true;
    }
  }
  assignPricingCommittee() {
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
      alert('Enter Required fields');
      return;
    } else {
      console.log(this.committeeChairData);
      let temp = [];
      temp.push(this.committeeChairData);
      temp.push(this.committeeMem1Data);
      temp.push(this.committeeMem2Data);
      temp.push(this.committeeMem3Data);
      temp.push(this.committeeMem4Data);
      if (this.committeeSecData != undefined) temp.push(this.committeeSecData);

      this._AuctionService
        .approveOrRejectAuction({
          ActionTaken: 'A',
          ZzPrtReason: '', // Reject reason
          ObjectId: this.preAuctionData.ObjectId, // 9700000487     9700000488   9700000489
          Description: this.preAuctionData.Description,
          Status: 'Pending Review', // Rejected
          UserId: '1827879980',
          listtocomiteememnav: temp,
          listtoproductnav: [{}],
        })
        .subscribe(
          (res: any) => {
            // alert('Updated Successfully');
            this.showSuccessPopup = true;
            console.log(res);
            this.getPreAuctionData();
          },
          (error) => {
            alert('Error Updating');
            console.log('approveOrRejectAuction RespError : ', error);
          }
        );
    }
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

          if(this.committeeMemberList[index1].EmployeeId == member[index2]){
            flag = true;
            break;
          }
        }
        if(!flag){
          this.list.push(this.committeeMemberList[index1]);
        }
      }
      this.committeeMemberList = this.list;
      console.log(this.list);
    }
  }
  openAddChairDialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          console.log(res);
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          console.log(this.existingCommitteMemberList);
          this.filterMember(this.existingCommitteMemberList);
          console.log(this.committeeMemberList);
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
            console.log(this.preAuctionData);
            console.log("this.test");
            console.log(result);
            if (result) {
              this.committeeChairData = result;
              console.log(this.committeeMemberList);
              this.existingCommitteMemberList.push(this.committeeChairData.EmployeeId);
              if(this.existingCommitteMemberList.length == 4){
                this.add4Mem = true;
              }
              // console.log(this.committeeMemberList);
            }
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_HEAD')
              this.committeeChairSelected = true;
            console.log(result);
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddSecDialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
            if (this.preAuctionData.listtocomiteememnav.results.length > 0) {
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
              this.committeeSecData = result;
              this.existingCommitteMemberList.push(this.committeeSecData.EmployeeId);
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_SECRETARY')
              this.committeeSecSelected = true;
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem1Dialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
              committeeEditData: this.committeeMem1Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              result.SlNo = '01';
              this.committeeMem1Data = result;
              this.existingCommitteMemberList.push(this.committeeMem1Data.EmployeeId);
              console.log(this.existingCommitteMemberList.length);
              if(this.existingCommitteMemberList.length == 4){
                this.add4Mem = true;
              }
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
              this.committeeMem1Selected = true;
              this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem2Dialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
              committeeEditData: this.committeeMem2Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              result.SlNo = '02';
              this.committeeMem2Data = result;
              this.existingCommitteMemberList.push(this.committeeMem2Data.EmployeeId);
              if(this.existingCommitteMemberList.length == 4){
                this.add4Mem = true;
              }
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
              this.committeeMem2Selected = true;
              this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem3Dialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
              committeeEditData: this.committeeMem3Data,
            },
            panelClass: 'my-custom-dialog-class',
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              result.SlNo = '03';
              this.committeeMem3Data = result;
              this.existingCommitteMemberList.push(this.committeeMem3Data.EmployeeId);
              console.log(this.existingCommitteMemberList.length);
              if(this.existingCommitteMemberList.length == 4){
                this.add4Mem = true;
              }
            }
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
              this.committeeMem3Selected = true;
              this.hideErrorMsg();
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  hideErrorMsg(){
    if(this.committeeMem1Data!=undefined && this.committeeMem2Data!=undefined && this.committeeMem3Data!=undefined){
      this._3MembersErrorMsg.emit(false);
      console.log("notempty");
    }else{
      this._3MembersErrorMsg.emit(true);
    }
  }
  // openAddMem4Dialog(title: any, role: string) {
  //   if (this.preAuctionData.Status == 'Pending Review')
  //     this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
  //       (res: any) => {
  //         this.committeeMemberList = res.d.results;
  //         console.log(this.committeeMemberList);
  //         const dialogRef = this.dialog.open(AddMemberComponent, {
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
  //             committeeEditData : this.committeeMem4Data,
  //           },
  //           panelClass: 'my-custom-dialog-class',
  //         });
  //         dialogRef.afterClosed().subscribe((result) => {
  //           if(result){
  //             result.SlNo = '04';
  //             this.committeeMem4Data = result;
  //           }
  //           console.log(result?.EmployeeRole);
  //           if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER')
  //             this.committeeMem4Selected = true;
  //         });
  //       },
  //       (error) => {
  //         console.log('approveOrRejectAuction RespError : ', error);
  //       }
  //     );
  // }
  openAddMem4Dialog(title: any, role: string) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
                console.log("this.addcommitteeMemberList");
                console.log(result);
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

  openEditMem4Dialog(title: any, role: string, index: any) {
    this.showPageLoader = true;
    if (this.preAuctionData.Status == 'Pending Review')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.showPageLoader = false;
          this.committeeMemberList = res.d.results;
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
              if (result?.EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
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
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
    }
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
    console.log(this.preAuctionData);
    this.getPreAuctionData();
  }
  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        let temp = res['d']['results'][0];
        this.preAuctionData = temp;
        console.log(temp);
        if (temp?.listtocomiteememnav?.results?.length > 0) {
          let data = temp.listtocomiteememnav.results;
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_HEAD') {
              this.committeeChairSelected = true;
              this.committeeChairData = data[i];
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
            if (data[i].SlNo == '04') {
              this.committeeMem4Selected = true;
              this.committeeMem4Data = data[i];
            }
          }
        }
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
