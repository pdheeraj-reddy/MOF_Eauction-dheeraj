import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAuctionComponent } from './upcoming-auction.component';

describe('UpcomingAuctionComponent', () => {
  let component: UpcomingAuctionComponent;
  let fixture: ComponentFixture<UpcomingAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingAuctionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
