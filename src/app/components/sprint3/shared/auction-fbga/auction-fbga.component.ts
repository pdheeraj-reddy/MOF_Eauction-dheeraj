import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-fbga',
  templateUrl: './auction-fbga.component.html',
  styleUrls: ['./auction-fbga.component.scss']
})
export class AuctionFbgaComponent implements OnInit {
  @Input() upcomingAuction:any;
  constructor() { }

  ngOnInit(): void {
  }

}
