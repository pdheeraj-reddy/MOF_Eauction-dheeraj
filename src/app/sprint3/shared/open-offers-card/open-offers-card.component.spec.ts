import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOffersCardComponent } from './open-offers-card.component';

describe('OpenOffersCardComponent', () => {
  let component: OpenOffersCardComponent;
  let fixture: ComponentFixture<OpenOffersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenOffersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenOffersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
