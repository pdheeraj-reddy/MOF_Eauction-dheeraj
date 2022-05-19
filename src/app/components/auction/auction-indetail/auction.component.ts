import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuctionService } from "src/app/service/auction.service";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  title = 'Auction Details';
  public charNum = '0/250';
  activeStep: number = 1;
  auctionStatus: string;

  showLoader: boolean = false;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  auctionDetails: any;
  auctionDetailsSubscription$: Subscription;

  showSuccessfulModal: boolean = false;
  showConfirmCancelModal: boolean = false;
  showCancelSuccessfulModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public auctionServc: AuctionService,
    public router: Router
  ) { }

  countChar(val: string) {
    console.log(val);
    var len = val.length;
    if (len >= 250) {
      val = val.substring(0, 250);
    } else {
      this.charNum = len + "/250";
    }
  }
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
    if (this.ViewMode == 'edit' || this.ViewMode == 'view') {
      this.getAuctionDetails(this.ObjectId, this.DraftId);
    } else {
      if (this.ObjectId || this.DraftId) {
        this.getAuctionDetails(this.ObjectId, this.DraftId);
      }
    }
  }


  getAuctionDetails(ObjectId: string, DraftId: string) {
    this.showLoader = true;
    this.auctionDetailsSubscription$ = this.auctionServc.getAuctionDetails(ObjectId, DraftId).subscribe((auctionDetailsResp: any) => {
      this.auctionDetails = auctionDetailsResp.d.results[0];
      this.showLoader = false;
      if (this.ViewMode == 'view') {
        if (this.auctionDetails.listtoproductnav?.results.length > 0) {
          this.activeStep = 3;
        } else {
          this.activeStep = 1;
        }
      } else if (this.ViewMode == 'edit') {
        if (this.auctionDetails.listtoproductnav?.results.length > 0) {
          this.activeStep = 2;
        } else {
          this.activeStep = 1;
        }
      }
      // this.createForm();
      // this.editForm();
    }, (error) => {
      this.showLoader = false;
      console.log('getAuctionDetails RespError : ', error);
    });
  }

  // ReceiveData(event:any){
  //   if(event=='auction_saved_to_continue'){
  //     // this.draftStatus = 'product';
  //     this.is_auction_save ="done";
  //   }else if(event=="product_saved_to_continue"){
  //     // this.draftStatus = 'member';
  //     this.is_product_save ="done";
  //   }else if(event=="committee_saved_to_continue"){
  //     // this.draftStatus = 'all';
  //     this.is_committee_members_save ="done";
  //   }
  //   if(event=='product_back'){
  //     // this.draftStatus = 'basic';
  //     this.is_auction_save ="done";
  //     this.is_product_save ="";
  //   }
  //   console.log(event);
  // }
  onChangeSteps(value: number): void {
    this.activeStep = value;
  }
  onChangeauctiontype(value: string): void {
    this.auctionStatus = value;
  }
  onAuctionCreateResp(value: any): void {
    this.ObjectId = value.ObjectId;
    this.DraftId = value.DraftId;
  }
  onProductCreateResp(value: any): void {
    this.ObjectId = value.ObjectId;
    this.DraftId = value.DraftId;
  }

  navAuctionDetails() {
    if (this.ViewMode == 'edit' || this.ViewMode == 'view' || (this.ObjectId || this.DraftId)) {
      this.activeStep = 1;
    }
  }

  navAuctionProducts() {
    console.log("navAuctionProducts", this.auctionDetails)
    if (this.ViewMode == 'edit' || this.ViewMode == 'view' || (this.ObjectId || this.DraftId)) {
      if (this.auctionDetails?.listtoproductnav?.results.length > 0 || this.ObjectId || this.ViewMode == 'edit' ) {
        this.activeStep = 2;
      }
    }

  }

  navAuctionSummary() {
    console.log("navAuctionSummary", this.auctionDetails);
    // console.log(this.auctionDetails);
    // console.log(this.auctionDetails.listtoproductnav?.results.length);
    if (this.ViewMode == 'edit' || this.ViewMode == 'view' || (this.ObjectId || this.DraftId)) {
      if (this.auctionDetails?.listtoproductnav?.results.length > 0 || this.ObjectId) {
        this.activeStep = 3;
      }
    }

  }

  public openSuccessfulModal() {
    if (this.ViewMode == 'edit') {
      this.showSuccessfulModal = true;
    } else {
      if (this.ViewMode == 'view') {
        this.router.navigate(['/auctionlist']);
      } else {
        if (this.ObjectId || this.DraftId) {
          this.showSuccessfulModal = true;
        } else {
          this.router.navigate(['/auctionlist']);
        }
      }
    }
  }

  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.router.navigate(['/auctionlist']);
    } else if (confirmType == 'close') {
      this.showSuccessfulModal = false;
    }
  }
}
