import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionMemberComponent } from './auction-member.component';

describe('AuctionMemberComponent', () => {
  let component: AuctionMemberComponent;
  let fixture: ComponentFixture<AuctionMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionMemberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
