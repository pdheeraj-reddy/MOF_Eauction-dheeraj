import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionReqDetailsComponent } from './auction-req-details.component';

describe('AuctionReqDetailsComponent', () => {
  let component: AuctionReqDetailsComponent;
  let fixture: ComponentFixture<AuctionReqDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionReqDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionReqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
