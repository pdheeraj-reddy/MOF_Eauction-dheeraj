import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

/**
 * auction-card.ts
 * @author Naveenkumar <naveenkumar@datasack.in>
 */
@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent implements OnInit {

  @Input() auction: any;

  constructor(
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
  }

}
