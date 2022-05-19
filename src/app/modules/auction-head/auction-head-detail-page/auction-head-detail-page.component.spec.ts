import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionHeadDetailPageComponent } from './auction-head-detail-page.component';

describe('AuctionHeadDetailPageComponent', () => {
  let component: AuctionHeadDetailPageComponent;
  let fixture: ComponentFixture<AuctionHeadDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionHeadDetailPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionHeadDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
