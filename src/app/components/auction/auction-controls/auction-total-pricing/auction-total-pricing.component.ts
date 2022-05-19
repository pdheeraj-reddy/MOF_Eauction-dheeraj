import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-auction-total-pricing',
  templateUrl: './auction-total-pricing.component.html',
  styleUrls: ['./auction-total-pricing.component.scss']
})
export class AuctionTotalPricingComponent implements OnInit {

  editmode1: boolean = false;

  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

  edit() {
    this.editmode1 = true;
  }

  discard() {
    this.editmode1 = false;
  }

}
