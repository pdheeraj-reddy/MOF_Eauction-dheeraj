import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-auction-slider',
  templateUrl: './auction-slider.component.html',
  styleUrls: ['./auction-slider.component.scss']
})
export class AuctionSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.sliderevent();
  }

  sliderevent() {
    setTimeout(() => {
      // $("#deliveryDate").unbind().removeData();
      // $("#prodeliveryDate").unbind().removeData();
      // $("#deliveryTime").unbind().removeData();
      // $("#prodeliveryTime").unbind().removeData();
      var galleries23 = $('.ad-gallery').adGallery();
      galleries23[0].settings.effect = "fade";
      // $("#incDecControls").on('dp.change', function (arg: any) {
      //   const v = new Event('change');
      //   const e = document.querySelector("#incDecControls");
      //   e?.dispatchEvent(v);
      // });
    }, 100);
  }
}
