import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionHeadComponent } from './auction-head.component';

describe('AuctionHeadComponent', () => {
  let component: AuctionHeadComponent;
  let fixture: ComponentFixture<AuctionHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionHeadComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
