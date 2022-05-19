import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommiteeOpenOffersComponent } from './auction-commitee-open-offers.component';

describe('AuctionCommiteeOpenOffersComponent', () => {
  let component: AuctionCommiteeOpenOffersComponent;
  let fixture: ComponentFixture<AuctionCommiteeOpenOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommiteeOpenOffersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommiteeOpenOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
