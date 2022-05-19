import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-pricing-committee-head-req',
  templateUrl: './pricing-committee-head-req.component.html',
  styleUrls: ['./pricing-committee-head-req.component.scss']
})
export class PricingCommitteeHeadReqComponent implements OnInit {
  selectedCat = "all";
  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('applicationsList', columnId, sortType, dateFormat);
  }
  catChange(value: string) {
    this.selectedCat = value;
  }
}
