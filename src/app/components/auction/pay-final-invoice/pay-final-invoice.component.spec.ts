import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFinalInvoiceComponent } from './pay-final-invoice.component';

describe('PayFinalInvoiceComponent', () => {
  let component: PayFinalInvoiceComponent;
  let fixture: ComponentFixture<PayFinalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayFinalInvoiceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFinalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
