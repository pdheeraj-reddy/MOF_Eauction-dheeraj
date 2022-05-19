import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionApproveReq1Component } from './auction-approve-req1.component';

describe('AuctionApproveReq1Component', () => {
  let component: AuctionApproveReq1Component;
  let fixture: ComponentFixture<AuctionApproveReq1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionApproveReq1Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionApproveReq1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
