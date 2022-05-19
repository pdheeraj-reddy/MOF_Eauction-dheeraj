import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-auction-pricing-request',
  templateUrl: './auction-pricing-request.component.html',
  styleUrls: ['./auction-pricing-request.component.scss']
})
export class AuctionPricingRequestComponent implements OnInit {

  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }

  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

}
