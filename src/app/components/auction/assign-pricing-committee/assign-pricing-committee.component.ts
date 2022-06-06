import { Component, OnInit } from '@angular/core';
import { AuctionApprovalService } from 'src/app/service/auction-approval.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberComponent } from '../../shared/add-member/add-member.component';
import { AuctionService } from 'src/app/service/auction.service';

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
    public dialog: MatDialog,
    public auctionServc: AuctionService,
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
        console.log('getCommitteeMembersBasedOnRole ', res.body);
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.committeeMemberList = res.body.d.results;
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
      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
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
        console.log('getCommitteeMembersBasedOnRole ', res.body);
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.committeeMemberList = res.body.d.results;
      },
      (error) => {
        console.log('approveOrRejectAuction RespError : ', error);
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
