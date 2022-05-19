import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommitteComponent } from './auction-committe.component';

describe('AuctionCommitteComponent', () => {
  let component: AuctionCommitteComponent;
  let fixture: ComponentFixture<AuctionCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommitteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
