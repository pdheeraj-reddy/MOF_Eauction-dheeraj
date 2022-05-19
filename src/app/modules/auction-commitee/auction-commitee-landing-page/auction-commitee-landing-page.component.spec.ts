import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommiteeLandingPageComponent } from './auction-commitee-landing-page.component';

describe('AuctionCommiteeLandingPageComponent', () => {
  let component: AuctionCommiteeLandingPageComponent;
  let fixture: ComponentFixture<AuctionCommiteeLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommiteeLandingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommiteeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
