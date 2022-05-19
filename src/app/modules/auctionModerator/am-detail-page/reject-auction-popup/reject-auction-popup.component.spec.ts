import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAuctionPopupComponent } from './reject-auction-popup.component';

describe('RejectAuctionPopupComponent', () => {
  let component: RejectAuctionPopupComponent;
  let fixture: ComponentFixture<RejectAuctionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectAuctionPopupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectAuctionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
