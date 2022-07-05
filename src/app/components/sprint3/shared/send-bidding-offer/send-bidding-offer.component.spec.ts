import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBiddingOfferComponent } from './send-bidding-offer.component';

describe('SendBiddingOfferComponent', () => {
  let component: SendBiddingOfferComponent;
  let fixture: ComponentFixture<SendBiddingOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendBiddingOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBiddingOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
