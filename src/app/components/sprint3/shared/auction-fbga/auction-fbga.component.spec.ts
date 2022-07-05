import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFbgaComponent } from './auction-fbga.component';

describe('AuctionFbgaComponent', () => {
  let component: AuctionFbgaComponent;
  let fixture: ComponentFixture<AuctionFbgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionFbgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionFbgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
