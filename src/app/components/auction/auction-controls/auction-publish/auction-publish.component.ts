import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-auction-publish',
  templateUrl: './auction-publish.component.html',
  styleUrls: ['./auction-publish.component.scss']
})
export class AuctionPublishComponent implements OnInit {

  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }

  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('inventoryAllocationTable', columnId, sortType, dateFormat);
  }

}
