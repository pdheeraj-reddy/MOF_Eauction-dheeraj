import { Component, Input, OnInit } from '@angular/core';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from 'src/app/components/shared/add-member/add-member.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auction-pricing-committe',
  templateUrl: './auction-pricing-committe.component.html',
  styleUrls: ['./auction-pricing-committe.component.scss'],
})
export class AuctionPricingCommitteComponent implements OnInit {
  @Input() preAuctionData: any;
  _3MembersErrorMsg = false;
  rejectionNotes: any;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';

  popupTitle: any = '';
  committeeMemberList: any = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  committeeChairSelected: any;
  committeeSecSelected: any;
  committeeMemberData: any;
  showAuction = false;
  showProduct = false;
  showAssignPricing = true;
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _AuctionService: AuctionApprovalService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  memberSelected(data: any) {
    console.log(this.preAuctionData);
    console.log(data);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
  showErrorMsg(error :any){
    this._3MembersErrorMsg = error;
    console.log(error);
  }
  openAddMemberDialog(title: any, role: string) {
    switch (role) {
      case 'ZEAUCTION_SALCOMM_CHAIRMAN':
        if (this.committeeChairSelected) return;
        break;
      case 'ZEAUCTION_SALCOMM_SECRETARY':
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
            left: '30%',
          },
          data: {
            title: title,
            role: role,
            committeeMemberList: this.committeeMemberList,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Haroi');
          console.log(this.preAuctionData);
          this.committeeMemberData = result;
          switch (result?.EmployeeRole) {
            case 'ZEAUCTION_SALCOMM_CHAIRMAN':
              this.committeeChairSelected = true;
              break;
            case 'ZEAUCTION_SALCOMM_SECRETARY':
              this.committeeSecSelected = true;
          }
          console.log(result);
        });
      }
    );
  }

  editMember(role: any) {
    switch (role) {
      case 'ZEAUCTION_SALCOMM_CHAIRMAN':
        this.committeeChairSelected = false;
        break;
    }
    //  this.openAddMemberDialog(title, role);
  }
  nowchangetoAuction() {
    // add dynamic style cc, display: none
    this.showAuction = true;
    this.showProduct = false;
    this.showAssignPricing = false;
  }
  nowchangetoProduct() {
    this.showAuction = false;
    this.showAssignPricing = false;
    this.showProduct = true;
  }
  nowchangetoAssingPricing() {
    this.showAuction = false;
    this.showAssignPricing = true;
    this.showProduct = false;
  }
  approveOrRejectAuction(action: any) {
    this.preAuctionData.ActionTaken = action;
    if (action == 'R') this.preAuctionData.RejectNotes = this.rejectionNotes;
    console.log(this.preAuctionData);
    this._AuctionService
      .approveOrRejectAuction({
        ActionTaken: action,
        RejectNotes: this.rejectionNotes,
        ObjectId: this.preAuctionData.ObjectId,
        Description: this.preAuctionData.Description,
        Status: 'Pending Review',
        UserId: '1827879980',
        listtoproductnav: [],
      })
      .subscribe(
        (res: any) => {
          alert('Updated Successfully');
          this.getPreAuctionData();
          console.log(res);
        },
        (error) => {
          alert('Error Updating');
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
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
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
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
  
  getPreAuctionData() {
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        console.log(res);
        this.preAuctionData = res['d']['results'][0];
      },
      (error) => {
        console.log('getAuctionList RespError : ', error);
      }
    );
    // let temp = this._AuctionService.getPreAuctionApproval('9700000300');
    // this.preAuctionData = temp['d']['results'][0];
  }
}
