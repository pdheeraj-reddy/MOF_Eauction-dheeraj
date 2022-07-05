import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestOffersSentComponent } from './latest-offers-sent.component';

describe('LatestOffersSentComponent', () => {
  let component: LatestOffersSentComponent;
  let fixture: ComponentFixture<LatestOffersSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestOffersSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestOffersSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
