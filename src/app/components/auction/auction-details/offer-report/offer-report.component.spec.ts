import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferReportComponent } from './offer-report.component';

describe('OfferReportComponent', () => {
  let component: OfferReportComponent;
  let fixture: ComponentFixture<OfferReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
