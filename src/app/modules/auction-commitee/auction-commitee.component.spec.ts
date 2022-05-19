import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCommiteeComponent } from './auction-commitee.component';

describe('AuctionCommiteeComponent', () => {
  let component: AuctionCommiteeComponent;
  let fixture: ComponentFixture<AuctionCommiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionCommiteeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCommiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
