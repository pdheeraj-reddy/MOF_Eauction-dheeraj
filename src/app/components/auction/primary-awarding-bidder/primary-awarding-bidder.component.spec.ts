import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAwardingBidderComponent } from './primary-awarding-bidder.component';

describe('PrimaryAwardingBidderComponent', () => {
  let component: PrimaryAwardingBidderComponent;
  let fixture: ComponentFixture<PrimaryAwardingBidderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryAwardingBidderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAwardingBidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
