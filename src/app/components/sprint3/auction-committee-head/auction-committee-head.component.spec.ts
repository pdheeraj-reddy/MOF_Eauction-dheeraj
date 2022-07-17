import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommitteeHeadComponent } from './auction-committee-head.component';

describe('AuctionCommitteeHeadComponent', () => {
  let component: AuctionCommitteeHeadComponent;
  let fixture: ComponentFixture<AuctionCommitteeHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionCommitteeHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommitteeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
