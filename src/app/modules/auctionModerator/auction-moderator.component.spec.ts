import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionModeratorComponent } from './auction-moderator.component';

describe('AuctionModeratorComponent', () => {
  let component: AuctionModeratorComponent;
  let fixture: ComponentFixture<AuctionModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionModeratorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
