import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTotalPricingComponent } from './auction-total-pricing.component';

describe('AuctionTotalPricingComponent', () => {
  let component: AuctionTotalPricingComponent;
  let fixture: ComponentFixture<AuctionTotalPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionTotalPricingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTotalPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
