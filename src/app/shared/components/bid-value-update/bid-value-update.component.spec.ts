import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidValueUpdateComponent } from './bid-value-update.component';

describe('BidValueUpdateComponent', () => {
  let component: BidValueUpdateComponent;
  let fixture: ComponentFixture<BidValueUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidValueUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidValueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
