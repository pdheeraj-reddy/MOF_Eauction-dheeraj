import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingCommitteeHeadReqComponent } from './pricing-committee-head-req.component';

describe('PricingCommitteeHeadReqComponent', () => {
  let component: PricingCommitteeHeadReqComponent;
  let fixture: ComponentFixture<PricingCommitteeHeadReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricingCommitteeHeadReqComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingCommitteeHeadReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
