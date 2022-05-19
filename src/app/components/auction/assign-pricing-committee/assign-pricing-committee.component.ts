import { Component, OnInit } from '@angular/core';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from '../../shared/add-member/add-member.component';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-assign-pricing-committee',
  templateUrl: './assign-pricing-committee.component.html',
  styleUrls: ['./assign-pricing-committee.component.scss'],
})
export class AssignPricingCommitteeComponent implements OnInit {
  popupTitle: any = '';
  committeeMemberList: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  committeeChairSelected: any;
  committeeSecSelected: any;
  committeeMemberData: any;
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(
    private _AuctionService: AuctionApprovalService,
    public dialog: MatDialog
  ) { }

  memberSelected(data: any) {
    console.log(data);
  }

  openAddMemberDialog(title: any, role: string) {
    switch (role) {
      case "ZEAUCTION_SALCOMM_CHAIRMAN":
        if (this.committeeChairSelected) return;
        break;
      case "ZEAUCTION_SALCOMM_SECRETARY":
        if (this.committeeChairSelected) return;
        break;
    }
    this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
      (res: any) => {
        this.committeeMemberList = res.d.results;
        console.log(res);
      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
        let res = {
          d: {
            results: [
              {
                __metadata: {
                  id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet('13545097')",
                  uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet('13545097')",
                  type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembers',
                },
                EmployeeId: '13545097',
                Message: 'Success',
                EmployeeName: 'Saurabh',
                Msgty: 'S',
                EmpMailid: 'dummyuser@dummytest.com',
                AgencyId: '022001000000',
                EmployeeRole: 'ZEAUCTION_SALCOMM_CHAIRMAN',
              },
            ],
          },
        };
        this.committeeMemberList = res.d.results;
        console.log(this.committeeMemberList);
        const dialogRef = this.dialog.open(AddMemberComponent, {
          height: '50%',
          width: '40%',
          position: {
            left: '30%'
          },
          data: {
            title: title,
            role: role,
            committeeMemberList: this.committeeMemberList,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.committeeMemberData = result;
          switch (result?.EmployeeRole) {
            case "ZEAUCTION_SALCOMM_CHAIRMAN":
              this.committeeChairSelected = true;
              break;
            case "ZEAUCTION_SALCOMM_SECRETARY":
              this.committeeSecSelected = true;
          }
          console.log(result);
        });
      }
    );
  }

  editMember(role: any) {
    switch (role) {
      case "ZEAUCTION_SALCOMM_CHAIRMAN":
        this.committeeChairSelected = false;
        break;
    }
    //  this.openAddMemberDialog(title, role);
  }

  setPopUpTitle(title: any, role: string) {
    this.popupTitle = title;
    this._AuctionService.getCommitteeMembersBasedOnRole(role).subscribe(
      (res: any) => {
        this.committeeMemberList = res.d.results;
        console.log(res);
      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
        let res = {
          d: {
            results: [
              {
                __metadata: {
                  id: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet('13545097')",
                  uri: "http://10.13.85.22:8000/sap/opu/odata/sap/ZSRM_PREAUCTION_APPROVAL_SRV/CommiteeMembersSet('13545097')",
                  type: 'ZSRM_PREAUCTION_APPROVAL_SRV.CommitteeMembers',
                },
                EmployeeId: '13545097',
                Message: 'Success',
                EmployeeName: 'Saurabh',
                Msgty: 'S',
                EmpMailid: 'dummyuser@dummytest.com',
                AgencyId: '022001000000',
                EmployeeRole: 'ZEAUCTION_SALCOMM_CHAIRMAN',
              },
            ],
          },
        };
        this.committeeMemberList = res.d.results;
        console.log(this.committeeMemberList);
      }
    );
  }

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.committeeChairSelected = false;
    this.committeeSecSelected = false;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
