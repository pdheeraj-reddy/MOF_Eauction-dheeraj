import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFinalAwardComponent } from './auction-final-award.component';

describe('AuctionFinalAwardComponent', () => {
  let component: AuctionFinalAwardComponent;
  let fixture: ComponentFixture<AuctionFinalAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionFinalAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionFinalAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
