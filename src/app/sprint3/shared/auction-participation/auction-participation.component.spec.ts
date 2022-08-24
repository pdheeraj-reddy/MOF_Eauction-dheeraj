import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionParticipationComponent } from './auction-participation.component';

describe('AuctionParticipationComponent', () => {
  let component: AuctionParticipationComponent;
  let fixture: ComponentFixture<AuctionParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
