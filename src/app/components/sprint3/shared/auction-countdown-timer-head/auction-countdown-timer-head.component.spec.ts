import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCountdownTimerComponentHead } from './auction-countdown-timer-head.component';

describe('AuctionCountdownTimerComponent', () => {
  let component: AuctionCountdownTimerComponentHead;
  let fixture: ComponentFixture<AuctionCountdownTimerComponentHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCountdownTimerComponentHead ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCountdownTimerComponentHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
