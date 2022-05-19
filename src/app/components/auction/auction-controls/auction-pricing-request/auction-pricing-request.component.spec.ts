import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPricingRequestComponent } from './auction-pricing-request.component';

describe('AuctionPricingRequestComponent', () => {
  let component: AuctionPricingRequestComponent;
  let fixture: ComponentFixture<AuctionPricingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionPricingRequestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPricingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
