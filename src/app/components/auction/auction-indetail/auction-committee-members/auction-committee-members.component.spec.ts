import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommitteeMembersComponent } from './auction-committee-members.component';

describe('AuctionCommitteeMembersComponent', () => {
  let component: AuctionCommitteeMembersComponent;
  let fixture: ComponentFixture<AuctionCommitteeMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommitteeMembersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommitteeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
