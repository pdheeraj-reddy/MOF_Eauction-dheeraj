import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';
import { RejectAuctionPopupComponent } from './reject-auction-popup/reject-auction-popup.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuctionModeratorService } from 'src/app/core/services/auctionModertor/auction-moderator.service';
import { InterconversionService } from 'src/app/service/interconversion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuctionService } from 'src/app/service/auction.service';
import { AlertModalComponent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-am-detail-page',
  templateUrl: './am-detail-page.component.html',
  styleUrls: ['./am-detail-page.component.scss'],
})

export class AmDetailPageComponent implements OnInit {
  preAuctionData: any = {};
  productValue: any;
  rejectionNotes: any;
  ObjectId: any = '';
  DraftId: any = '';
  ViewMode: any = '';
  selectedIndex = 0;
  activeIndex: number;
  tabThreeFour = true;
  tabTwoThree = true;
  tabFourFive = false;
  tabTwo = false;
  showAuction = false;
  showProduct = true;
  isPublishTab = true;
  showSuccessfulModal = false;
  showSuccessfulModalPub = false;
  showLoader: boolean = false;
  editable: boolean = false;
  auctionAnnouncement = true;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private activatedRoute: ActivatedRoute,
    public PaginationServc: PaginationSortingService,
    public _AuctionService: AuctionModeratorService,
    private interconversionService: InterconversionService,
    public auctionServc: AuctionService,
    public dialog: MatDialog,
    public router: Router,
    public envService: EnvService
  ) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('ObjectId')) {
      this.ObjectId = this.activatedRoute.snapshot.paramMap.get('ObjectId');
      this.DraftId = this.activatedRoute.snapshot.paramMap.get('DraftId');
      this.ViewMode = this.activatedRoute.snapshot.paramMap.get('ViewMode');
    }
    this.getPreAuctionData();
  }

  selectToggle(type: any) { }

  attachmentDownload(attchment: any) {
    console.log(attchment);
    window.open(attchment.DispUrl, '_blank');
  }

  openRejectPopup() {
    const dialogRef = this.dialog.open(RejectAuctionPopupComponent, {
      disableClose: true,
      height: 'auto',
      width: '55%',
      position: {
        left: '20%',
      },
      data: {
        auctionData: this.preAuctionData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  nowchangetoAuction() {
    this.showAuction = true;
    this.showProduct = false;
  }
  nowchangetoProduct() {
    this.showAuction = false;
    this.showProduct = true;
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
          // this.showSuccessfulModal = true;
          // alert('Updated Successfully');

          this.getPreAuctionData();
          console.log(res);
          this.stepper.next();
        },
        (error) => {
          // alert('Error Updating');
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }
  hideSuccessfulModel() {
    this.showSuccessfulModal = false;
    this.stepper.next();
    this.getPreAuctionData();
  }
  hideSuccessfulModelPub() {
    this.showSuccessfulModalPub = false;
    this.getPreAuctionData();
  }
  public closeModal(confirmType: string) {
    if (confirmType == 'success') {
      this.showSuccessfulModal = false;
      this.showSuccessfulModalPub = false;
      this.router.navigate(['/auctionlist']);
    }
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId(
      'inventoryAllocationTable',
      columnId,
      sortType,
      dateFormat
    );
  }

  publishAuction() {
    this._AuctionService
      .approveOrRejectAuction({
        ActionTaken: 'A',
        ZzPrtReason: '', // Reject reason
        ObjectId: this.preAuctionData.ObjectId, // 9700000487     9700000488   9700000489
        Description: this.preAuctionData.Description,
        Status: 'Published', // Rejected
        UserId: '1827879980',
        listtoproductnav: [],
      })
      .subscribe(
        (res: any) => {
          this.stepper.next();
          this.showSuccessfulModalPub = true;
          console.log(res);
          console.log(res.d.Msgty);
          if (res.d.Msgty == 'S') {
            this.auctionAnnouncement = false;
          }
        },
        (error) => {
          console.log('approveOrRejectAuction RespError : ', error);
        }
      );
  }

  goBack() {
    this.router.navigateByUrl('/');
    console.log("parent")
  }
  goBacktoAuction() {
    this.showAuction = true;
    this.showProduct = false;
  }
  goAheadtoProduct() {
    this.showAuction = false;
    this.showProduct = true;
  }

  onStepChange(ev: any) {
    this.selectedIndex = ev.selectedIndex;
  }

  getPreAuctionData() {
    this.showLoader = true;
    this._AuctionService.getAuctionDetails(this.ObjectId).subscribe(
      (res: any) => {
        this.showLoader = false;
        console.log('getAuctionDetails Resp ', res.body);
        this.auctionServc.XCSRFToken = res.headers.get('x-csrf-token');
        this.preAuctionData = res.body.d.results[0];
        console.log(this.preAuctionData, "saurabh kumar singh")
        if (this.preAuctionData.ActionTaken == 'A') {
          this.tabTwo = true;
        } else {
          this.tabTwo = false;
        }
        if (
          this.preAuctionData.Status == 'Pending Review' ||
          this.preAuctionData.Status == 'Pending Pricing' ||
          this.preAuctionData.Status == 'Rejected'
        ) {
          this.tabThreeFour = false;
        }

        if (
          this.preAuctionData.Status == 'Pending Review' ||
          this.preAuctionData.Status == 'Rejected'
        ) {
          this.tabTwoThree = false;
        }

        if (this.preAuctionData.Status == 'Pending to Publish') {
          this.tabFourFive = false;

          let data = this.preAuctionData.listtocomiteememnav.results;
          for (let i = 0; i < data.length; i++) {
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER') {
              // this.tabFourFive = true;
            }
          }
        }
        if (this.preAuctionData.Status == 'Pending Review') {
          if (this.preAuctionData?.ActionTaken == 'P') {
            this.selectedIndex = 0;
            this.activeIndex = 0;
          } else {
            this.selectedIndex = 1;
            this.activeIndex = 1;
          }
        } else if (this.preAuctionData.Status == 'Pending Pricing') {
          this.selectedIndex = 1;
          this.activeIndex = 1;
        } else if (this.preAuctionData.Status == 'Pending to Publish') {
          this.selectedIndex = 2;
          this.activeIndex = 2;
          let data = this.preAuctionData.listtocomiteememnav.results;
          for (let i = 0; i < data.length; i++) {
            if (data[i].EmployeeRole == 'ZEAUCTION_SALCOMM_MEMBER') {
              this.selectedIndex = 3;
              this.activeIndex = 3;
            }
          }
        } else if (this.preAuctionData.Status == 'Published') {
          this.tabFourFive = true;
          this.selectedIndex = 3;
          this.activeIndex = 3;
          this.auctionAnnouncement = false;
        }
        for (let i = 0; i < this.preAuctionData.listtoproductnav.results; i++) {
          this.productValue =
            this.productValue +
            parseFloat(
              this.preAuctionData.listtoproductnav.results[i].ProductValue
            );
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

  async goToAuctionList() {
    if (this.auctionServc.unsaved) {
      const confirm = await this.auctionServc.handleUnsavedError();;
      if (confirm) {
        this.router.navigate(['/auctionlist'])
      }
    } else {
      this.router.navigate(['/auctionlist'])
    }
  }

}
