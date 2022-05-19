import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionAttachmentsComponent } from './auction-attachments.component';

describe('AuctionAttachmentsComponent', () => {
  let component: AuctionAttachmentsComponent;
  let fixture: ComponentFixture<AuctionAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionAttachmentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
