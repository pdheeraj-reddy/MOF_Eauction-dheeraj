import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPricingCommitteComponent } from './auction-pricing-committe.component';

describe('AuctionPricingCommitteComponent', () => {
  let component: AuctionPricingCommitteComponent;
  let fixture: ComponentFixture<AuctionPricingCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionPricingCommitteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPricingCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
