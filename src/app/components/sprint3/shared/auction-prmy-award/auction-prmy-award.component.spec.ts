import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPrmyAwardComponent } from './auction-prmy-award.component';

describe('AuctionPrmyAwardComponent', () => {
  let component: AuctionPrmyAwardComponent;
  let fixture: ComponentFixture<AuctionPrmyAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionPrmyAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPrmyAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
