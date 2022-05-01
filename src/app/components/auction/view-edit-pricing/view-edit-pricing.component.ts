import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-view-edit-pricing',
  templateUrl: './view-edit-pricing.component.html',
  styleUrls: ['./view-edit-pricing.component.scss']
})
export class ViewEditPricingComponent implements OnInit {

  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('applicationsList', columnId, sortType, dateFormat);
  }
}
