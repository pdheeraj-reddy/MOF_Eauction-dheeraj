import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableParticipationComponent } from './disable-participation.component';

describe('DisableParticipationComponent', () => {
  let component: DisableParticipationComponent;
  let fixture: ComponentFixture<DisableParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisableParticipationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
