import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionOrderSummaryComponent } from './auction-order-summary.component';

describe('AuctionOrderSummaryComponent', () => {
  let component: AuctionOrderSummaryComponent;
  let fixture: ComponentFixture<AuctionOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionOrderSummaryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
