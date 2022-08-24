import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAuctionComponent } from './manual-auction.component';

describe('ManualAuctionComponent', () => {
  let component: ManualAuctionComponent;
  let fixture: ComponentFixture<ManualAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
