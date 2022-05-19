import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPricingCommitteeComponent } from './assign-pricing-committee.component';

describe('AssignPricingCommitteeComponent', () => {
  let component: AssignPricingCommitteeComponent;
  let fixture: ComponentFixture<AssignPricingCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignPricingCommitteeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPricingCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
