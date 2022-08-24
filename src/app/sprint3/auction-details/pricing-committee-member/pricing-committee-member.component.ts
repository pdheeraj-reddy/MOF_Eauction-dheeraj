import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-committee-member',
  templateUrl: './pricing-committee-member.component.html',
  styleUrls: ['./pricing-committee-member.component.scss']
})
export class PricingCommitteeMemberComponent implements OnInit {
  @Input() committeeMember: any;
  committeeChairData: any;
  committeeSecData: any;
  committeeMem1Data: any;
  committeeMem2Data: any;
  committeeMem3Data: any;
  addcommitteeMemberList: any[] = [];
  constructor() { }

  ngOnInit(): void {
    if (this.committeeMember?.length > 0) {
      let data = this.committeeMember;
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_HEAD') {
          this.committeeChairData = data[i];
        }
        if (data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_SECRETARY') {
          this.committeeSecData = data[i];
        }
        if (data[i].SlNo == '01') {
          this.committeeMem1Data = data[i];
        }
        if (data[i].SlNo == '02') {
          this.committeeMem2Data = data[i];
        }
        if (data[i].SlNo == '03') {
          this.committeeMem3Data = data[i];
        }
        if (data[i].SlNo !== '01' && data[i].SlNo !== '02' && data[i].SlNo !== '03' && data[i].EmployeeRole == 'ZEAUCTION_PRICECOMM_MEMBER') {
          this.addcommitteeMemberList.push(data[i])
        }
      }
    }
  }

}
