import { Component, OnInit } from '@angular/core';
import { PaginationSortingService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-edit-pricing',
  templateUrl: './edit-pricing.component.html',
  styleUrls: ['./edit-pricing.component.scss']
})
export class EditPricingComponent implements OnInit {
  editmode1: boolean = false;
  constructor(public PaginationServc: PaginationSortingService) { }

  ngOnInit(): void {
  }
  sortByTableHeaderId(columnId: number, sortType: string, dateFormat?: string) {
    this.PaginationServc.sortByTableHeaderId('applicationsList', columnId, sortType, dateFormat);
  }
  edit() {
    this.editmode1 = true;
  }
  discard() {
    this.editmode1 = false;
  }
}
