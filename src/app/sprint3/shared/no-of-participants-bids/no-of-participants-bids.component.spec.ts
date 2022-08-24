import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOfParticipantsBidsComponent } from './no-of-participants-bids.component';

describe('NoOfParticipantsBidsComponent', () => {
  let component: NoOfParticipantsBidsComponent;
  let fixture: ComponentFixture<NoOfParticipantsBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoOfParticipantsBidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoOfParticipantsBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
