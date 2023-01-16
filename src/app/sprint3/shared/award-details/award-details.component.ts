import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { CommitteeHeadService } from '../../services/committee-head.service';

@Component({
  selector: 'app-award-details',
  templateUrl: './award-details.component.html',
  styleUrls: ['./award-details.component.scss']
})
export class AwardDetailsComponent implements OnInit {
  @Input() auctionId: any;
  highestOffer: any = [];
  offerDate = '';
  offerTime = '';
  offerTimeSuffix = '';

  constructor(private committeeHeadService: CommitteeHeadService) { }

  ngOnInit(): void {
    this.getHighestOffer();
  }

  getHighestOffer() {
    this.committeeHeadService.getHighestOffer(this.auctionId).subscribe((res: any) => {
      this.committeeHeadService.XCSRFToken = res.headers.get('x-csrf-token');

      this.highestOffer = res.body.d.results[0];
      this.offerDate = moment(this.highestOffer.DtTime.split(" ")[0], 'DD.MM.YYYY').format('YYYY-MM-DD')
      this.offerTime = moment(this.highestOffer.DtTime.split(" ")[1], 'HH:mm:ss').format('hh:mm')
      this.offerTimeSuffix = moment(this.highestOffer.DtTime.split(" ")[1], 'HH:mm:ss').format('A')


      localStorage.setItem('x-csrf-token', this.committeeHeadService.XCSRFToken)
    });
  }

}
