import { Component, Input, OnInit } from '@angular/core';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-auction-committe',
  templateUrl: './assign-auction-committe.component.html',
  styleUrls: ['./assign-auction-committe.component.scss'],
})
export class AssignAuctionCommitteComponent implements OnInit {
  @Input()
  isPublishTab: boolean = false;

  preAuctionData: any;
  popupTitle: any = '';
  committeeMemberList: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  committeeChairSelected: any;
  committeeChairData: any;

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

  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _AuctionService: AuctionModeratorService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  memberSelected(data: any) {
    console.log(data);
  }

  assignPricingCommittee() {
    console.log(this.preAuctionData);
    this.preAuctionData;
    if (
      this.committeeChairData == undefined ||
      this.committeeMem1Data == undefined ||
      this.committeeMem2Data == undefined ||
      this.committeeMem3Data == undefined
    ) {
      console.log(this.committeeChairData);
      alert('Enter Required fieldssssssss');
      return;
    } else {
      console.log(this.committeeChairData);
      alert('good to go00000000000');
      let temp = [];
      temp.push(this.committeeChairData);
      temp.push(this.committeeMem1Data);
      temp.push(this.committeeMem2Data);
      temp.push(this.committeeMem3Data);
      temp.push(this.committeeMem4Data);
      if (this.committeeSecData != undefined) temp.push(this.committeeSecData);
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
            this.getPreAuctionData();
            console.log(res);
          },
          (error) => {
            console.log('approveOrRejectAuction RespError : ', error);
          }
        );
    }
  }

  openAddChairDialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          console.log(res);
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            console.log(this.preAuctionData);
            this.committeeChairData = result;
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_CHAIRMAN')
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
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            this.committeeSecData = result;
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_SECRETARY')
              this.committeeSecSelected = true;
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem1Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            result.SlNo = '05';
            this.committeeMem1Data = result;
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem1Selected = true;
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem2Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            result.SlNo = '06';
            this.committeeMem2Data = result;
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem2Selected = true;
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem3Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            result.SlNo = '07';
            this.committeeMem3Data = result;
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem3Selected = true;
          });
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  openAddMem4Dialog(title: any, role: string) {
    if (this.preAuctionData.Status == 'Pending to Publish')
      this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
        (res: any) => {
          this.committeeMemberList = res.d.results;
          console.log(this.committeeMemberList);
          const dialogRef = this.dialog.open(AddMemberComponent, {
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
            result.SlNo = '08';
            this.committeeMem4Data = result;
            console.log(result?.EmployeeRole);
            if (result?.EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER')
              this.committeeMem4Selected = true;
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
  goBack() {
    this.router.navigateByUrl('/');
  }

  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
        let temp = res['d']['results'][0];
        console.log(temp);
        if (temp?.listtocomiteememnav?.results?.length > 0) {
          let data = temp.listtocomiteememnav.results;
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_CHAIRMAN') {
              this.committeeChairSelected = true;
              this.committeeChairData = data[i];
            }
            if (data[i].SlNo == '05') {
              this.committeeMem1Selected = true;
              this.committeeMem1Data = data[i];
            }
            if (data[i].SlNo == '06') {
              this.committeeMem2Selected = true;
              this.committeeMem2Data = data[i];
            }
            if (data[i].SlNo == '07') {
              this.committeeMem3Selected = true;
              this.committeeMem3Data = data[i];
            }
            if (data[i].SlNo == '08') {
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
