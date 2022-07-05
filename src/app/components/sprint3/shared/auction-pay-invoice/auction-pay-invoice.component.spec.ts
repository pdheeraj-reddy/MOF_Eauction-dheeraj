import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPayInvoiceComponent } from './auction-pay-invoice.component';

describe('AuctionPayInvoiceComponent', () => {
  let component: AuctionPayInvoiceComponent;
  let fixture: ComponentFixture<AuctionPayInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionPayInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPayInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
