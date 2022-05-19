import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionHeadLandingPageComponent } from './auction-head-landing-page.component';

describe('AuctionHeadLandingPageComponent', () => {
  let component: AuctionHeadLandingPageComponent;
  let fixture: ComponentFixture<AuctionHeadLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionHeadLandingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionHeadLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
