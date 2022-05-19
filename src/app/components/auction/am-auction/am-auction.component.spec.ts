import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmAuctionComponent } from './am-auction.component';

describe('AmAuctionComponent', () => {
  let component: AmAuctionComponent;
  let fixture: ComponentFixture<AmAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmAuctionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
