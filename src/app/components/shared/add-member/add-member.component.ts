import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface Employee {
  EmployeeId: string;
  Message: string;
  EmployeeName: string;
  Msgty: string;
  EmpMailid: string;
  AgencyId: string;
  EmployeeRole: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  title: any;
  role: any;
  committeeMemberList: Employee[];
  stateCtrl = new FormControl();
  filteredStates: Observable<Employee[]>;
  selectedEmployee: any;

  memberSelected(member: any) {
    this.selectedEmployee = member;
    console.log(member);
  }
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog
  ) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterStates(state) : this.committeeMemberList.slice()
      )
    );
  }

  private _filterStates(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.committeeMemberList.filter((state) =>
      state.EmpMailid.toLowerCase().includes(filterValue) ||
      state.EmployeeId.toLowerCase().includes(filterValue)
    );
  }

  closeDialog(type: any) {
    // this.close.emit('close')
    if (type == "close") {
      this.dialogRef.close();
      console.log("this.test");
      console.log(this.committeeMemberList);
    } else {
      if (this.selectedEmployee)
        this.selectedEmployee['EmployeeRole'] = this.role;
        console.log(this.committeeMemberList);
      this.dialogRef.close({
        EmpMailid: this.selectedEmployee.EmpMailid,
        EmployeeId: this.selectedEmployee.EmployeeId,
        EmployeeName: this.selectedEmployee.EmployeeName,
        EmployeeRole: this.selectedEmployee.EmployeeRole,
      });
    }
  }

  ngOnInit(): void {
    // console.log(this.committeeMemberList);
    this.title = this.dialogData.title;
    this.role = this.dialogData.role;
    this.committeeMemberList = this.dialogData.committeeMemberList;
    console.log(this.committeeMemberList);
    this.stateCtrl.setValue(((this.dialogData.committeeEditData != undefined) ? this.dialogData.committeeEditData.EmployeeId : ''));


    if (this.dialogData.committeeEditData != undefined) {
      var committeeEditData = this.getDimensionsByFilter(this.dialogData.committeeEditData.EmployeeId);
      // console.log("this.test");
      // console.log(committeeEditData);
      this.selectedEmployee = committeeEditData;
    }
  }

  getDimensionsByFilter(EmployeeId: any) {
    return this.committeeMemberList.find(x => x.EmployeeId === EmployeeId);
  }
}
export interface DialogData {
  title: any;
  role: any;
  committeeMemberList: any;
  committeeEditData: any;
}
