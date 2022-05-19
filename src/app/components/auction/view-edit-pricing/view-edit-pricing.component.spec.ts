import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditPricingComponent } from './view-edit-pricing.component';

describe('ViewEditPricingComponent', () => {
  let component: ViewEditPricingComponent;
  let fixture: ComponentFixture<ViewEditPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditPricingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
