import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuctionBasicMaster } from "src/app/model/auction.model";

@Component({
  selector: 'app-auction-committee-members',
  templateUrl: './auction-committee-members.component.html',
  styleUrls: ['./auction-committee-members.component.scss']
})
export class AuctionCommitteeMembersComponent implements OnInit {
  @Input() activeStep: number;
  @Output() changeSteps = new EventEmitter<number>();
  @Output() changeauctiontype = new EventEmitter<string>();
  //variables
  title = 'Auction Details';
  maxChars = 250;
  submitted = false;
  // Dropdown Values
  dropValBeneCategories: any = ['category 1', 'category 2', 'category 3', 'category 4'];
  // Form controls
  membersFormGroup: FormGroup;
  // Objects
  auctionItem: AuctionBasicMaster = new AuctionBasicMaster();

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(submitSrc: string) {
    this.submitted = true;
    console.log(submitSrc);
    if (submitSrc === 'save') {
      if (this.membersFormGroup.status === 'VALID') {
        this.activeStep++;
        this.changeSteps.emit(this.activeStep);
      }
    } else if (submitSrc === 'saveasdraft') {
      this.activeStep++;
      this.changeSteps.emit(this.activeStep);
    }
  }

  public back() {
    this.activeStep--;
    this.changeSteps.emit(this.activeStep);
    this.changeauctiontype.emit("productedit");
  }
}
