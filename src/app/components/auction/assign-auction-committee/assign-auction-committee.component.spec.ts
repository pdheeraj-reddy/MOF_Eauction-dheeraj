import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAuctionCommitteeComponent } from './assign-auction-committee.component';

describe('AssignAuctionCommitteeComponent', () => {
  let component: AssignAuctionCommitteeComponent;
  let fixture: ComponentFixture<AssignAuctionCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignAuctionCommitteeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAuctionCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
