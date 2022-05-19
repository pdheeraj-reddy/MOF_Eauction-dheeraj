import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAuctionCommitteComponent } from './assign-auction-committe.component';

describe('AssignAuctionCommitteComponent', () => {
  let component: AssignAuctionCommitteComponent;
  let fixture: ComponentFixture<AssignAuctionCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignAuctionCommitteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAuctionCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
