import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionStatusComponent } from './auction-status.component';

describe('AuctionStatusComponent', () => {
  let component: AuctionStatusComponent;
  let fixture: ComponentFixture<AuctionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
