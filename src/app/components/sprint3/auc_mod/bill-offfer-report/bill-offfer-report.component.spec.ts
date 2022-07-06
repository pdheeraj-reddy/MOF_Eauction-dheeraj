import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOffferReportComponent } from './bill-offfer-report.component';

describe('BillOffferReportComponent', () => {
  let component: BillOffferReportComponent;
  let fixture: ComponentFixture<BillOffferReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillOffferReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillOffferReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
