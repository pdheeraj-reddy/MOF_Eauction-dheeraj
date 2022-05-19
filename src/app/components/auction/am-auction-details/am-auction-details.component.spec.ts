import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmAuctionDetailsComponent } from './am-auction-details.component';

describe('AmAuctionDetailsComponent', () => {
  let component: AmAuctionDetailsComponent;
  let fixture: ComponentFixture<AmAuctionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmAuctionDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmAuctionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
