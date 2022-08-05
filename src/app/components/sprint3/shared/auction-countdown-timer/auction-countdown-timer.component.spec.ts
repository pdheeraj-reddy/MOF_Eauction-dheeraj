import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCountdownTimerComponent } from './auction-countdown-timer.component';

describe('AuctionCountdownTimerComponent', () => {
  let component: AuctionCountdownTimerComponent;
  let fixture: ComponentFixture<AuctionCountdownTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCountdownTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCountdownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
