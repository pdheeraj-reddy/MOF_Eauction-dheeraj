import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSliderComponent } from './auction-slider.component';

describe('AuctionSliderComponent', () => {
  let component: AuctionSliderComponent;
  let fixture: ComponentFixture<AuctionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
