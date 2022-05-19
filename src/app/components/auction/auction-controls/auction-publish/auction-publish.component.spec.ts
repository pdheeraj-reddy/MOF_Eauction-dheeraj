import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPublishComponent } from './auction-publish.component';

describe('AuctionPublishComponent', () => {
  let component: AuctionPublishComponent;
  let fixture: ComponentFixture<AuctionPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionPublishComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
