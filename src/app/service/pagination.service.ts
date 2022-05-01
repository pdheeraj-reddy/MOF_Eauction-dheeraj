import { Injectable } from '@angular/core';
import * as moment from 'moment-mini';

@Injectable({
  providedIn: 'root',
})
export class PaginationSortingService {
  /* Paging Start */
  pageLinksPerScreen = 10;
  totalItems: number;
  pageSize = 10;
  currentPage = 1;
  pages: number[] = [];
  startPage: number;
  endPage: number;
  startIndex = 0;
  endIndex = 0;
  page: number;
  totalPages: number;
  isSmallScreen = false;
  /* Paging End */

  /*Sorting start */
  sortDirection = 'desc';
  sortType = 'string';
  columnId = -1;
  tableId = '';
  dateFormat = '';
  /*Sorting end */

  constructor() {
  }

  setPagerValues(totalElements: number, pageSize: number, pageNumber: number) {
    this.totalItems = totalElements;
    this.pageSize = pageSize;
    this.setPage(pageNumber);
    this.setPager();
    this.resetSorting();
  }

  setPager() {
    // calculate total pages
    if (this.isSmallScreen) {
      this.pageLinksPerScreen = 5;
    }
    const linksPerPage = +this.pageLinksPerScreen;
    const totalItems = +this.totalItems;
    const currentPage = +this.currentPage;
    this.totalPages = Math.ceil(totalItems / this.pageSize);
    // ensure current page isn't out of range

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.totalPages <= linksPerPage) {
      // less than 10 total pages so show all
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages

      if (currentPage <= linksPerPage) {
        this.startPage = 1;
        this.endPage = linksPerPage;
      } else if (currentPage + (linksPerPage - 1) >= this.totalPages) {
        if ((currentPage - 1) % linksPerPage === 0) {
          this.startPage = currentPage;
          this.endPage = currentPage + linksPerPage - 1;
        } else {
          this.startPage = this.totalPages - (linksPerPage - 1);
          this.endPage = this.totalPages;
          let str = Math.floor(currentPage / linksPerPage);
          if (currentPage % linksPerPage === 0) {
            str = str - 1;
          }
          this.startPage = str * linksPerPage + 1;
          this.endPage = this.startPage + linksPerPage - 1;
        }

        if (this.endPage > this.totalPages) {
          this.endPage = this.totalPages;
        }
      } else {
        if ((currentPage - 1) % linksPerPage === 0) {
          this.startPage = currentPage;
          this.endPage = currentPage + linksPerPage - 1;
        } else {
          let str = Math.floor(currentPage / linksPerPage);
          if (currentPage % linksPerPage === 0) {
            str = str - 1;
          }
          this.startPage = str * linksPerPage + 1;
          this.endPage = this.startPage + linksPerPage - 1;
        }
      }
    }
    // calculate start and end item indexes
    this.startIndex = (currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(
      this.startIndex + (this.pageSize - 1),
      totalItems - 1
    );
    // create an array of pages to ng-repeat in the pager control
    this.pages = Array.from(
      Array(this.endPage + 1 - this.startPage).keys()
    ).map((i) => this.startPage + i);
    // return object with all pager properties required by the view
  }

  setPage(selectedPageNumber: number) {
    this.currentPage = selectedPageNumber;
    this.setPager();
  }

  reset() {
    this.pageLinksPerScreen = 10;
    if (this.isSmallScreen) {
      this.pageLinksPerScreen = 5;
    }
    this.totalItems = 0;
    this.pageSize = 10;
    this.currentPage = 1;
    this.pages = [];
    this.startPage = 0;
    this.endPage = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    this.page = 0;
    this.totalPages = 0;
    this.isSmallScreen = false;
    this.resetSorting();
  }

  init() {
    this.setPage(this.currentPage);
    this.setPager();
  }

  /*Sorting start */

  resetSorting() {
    this.columnId = 0;
    this.sortDirection = 'desc';
  }

  isSorting(columnId: number) {
    return this.columnId !== columnId;
  }

  isSortAsc(columnId: number) {
    return this.columnId === columnId && this.sortDirection === 'asc';
  }

  isSortDesc(columnId: number) {
    return this.columnId === columnId && this.sortDirection === 'desc';
  }

  sortTable() {
    let i = 0;
    let shouldSwitch = false;
    const table = document.getElementById(this.tableId) as HTMLTableElement;
    let switching = true;
    let xCell = '';
    let yCell = '';

    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      const rows = table['rows'];
      /* Loop through all table rows (except the first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare, one from current row and one from the next:*/
        const x = rows[i].getElementsByTagName('TD')[this.columnId];
        const y = rows[i + 1].getElementsByTagName('TD')[this.columnId];
        xCell = x.innerHTML.toLowerCase();
        yCell = y.innerHTML.toLowerCase();
        if (this.sortDirection === 'asc') {
          if (this.sortType === 'numeric') {
            if (xCell === '' || xCell === undefined) {
              xCell = '0';
            }
            if (yCell === '' || yCell === undefined) {
              yCell = '0';
            }
            if (+xCell > +yCell) {
              // if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (this.sortType === 'date') {
            const momentA = moment(xCell, this.dateFormat);
            const momentB = moment(yCell, this.dateFormat);
            if (momentA > momentB) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        } else {
          if (this.sortType === 'numeric') {
            if (xCell === '' || xCell === undefined) {
              xCell = '0';
            }
            if (yCell === '' || yCell === undefined) {
              yCell = '0';
            }
            if (+xCell < +yCell) {
              // if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (this.sortType === 'date') {
            const momentA = moment(xCell, this.dateFormat);
            const momentB = moment(yCell, this.dateFormat);
            if (momentA < momentB) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  sortByTableHeaderId(
    tableId: string,
    columnId: number,
    sortType: string,
    dateFormat?: string
  ) {
    if (this.columnId === columnId) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.columnId = columnId;
    this.tableId = tableId;
    this.sortType = sortType;
    if(dateFormat){
        this.dateFormat = dateFormat;
    }
    this.sortTable();
  }

  /*Sorting End */
}
