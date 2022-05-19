import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPricingCommitteComponent } from './assign-pricing-committe.component';

describe('AssignPricingCommitteComponent', () => {
  let component: AssignPricingCommitteComponent;
  let fixture: ComponentFixture<AssignPricingCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignPricingCommitteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPricingCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
