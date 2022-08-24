import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent implements OnInit {

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  showText = 'Starts In'

  constructor(private envService: EnvService) { }

  public get getHomeUrl() {
    return this.envService.environment.idmHomeUrl;
  }

  ngOnInit(): void {
  }

}
