import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionListsComponent } from './auction-lists.component';
import { DatePipe } from '@angular/common';

describe('AuctionListsComponent', () => {
  let component: AuctionListsComponent;
  let fixture: ComponentFixture<AuctionListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionListsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
