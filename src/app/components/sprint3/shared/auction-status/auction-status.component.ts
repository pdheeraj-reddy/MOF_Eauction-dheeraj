import { Component, OnInit, Input } from '@angular/core';
import { getStatusText } from 'src/app/utils/util';


@Component({
  selector: 'app-auction-status',
  templateUrl: './auction-status.component.html',
  styleUrls: ['./auction-status.component.scss']
})
export class AuctionStatusComponent implements OnInit {
  @Input() auctionStatus: string;
  @Input() count: number | undefined = 0;
  status: string = '';
  showEye: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.status = getStatusText(this.auctionStatus);
    if (this.status == "Ongoing") {
      // Has to be changed 
      this.showEye = true;
    }
  }

}
