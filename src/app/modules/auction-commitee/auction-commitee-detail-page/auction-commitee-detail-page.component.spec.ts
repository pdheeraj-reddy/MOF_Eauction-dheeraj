import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommiteeDetailPageComponent } from './auction-commitee-detail-page.component';

describe('AuctionCommiteeDetailPageComponent', () => {
  let component: AuctionCommiteeDetailPageComponent;
  let fixture: ComponentFixture<AuctionCommiteeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommiteeDetailPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommiteeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
