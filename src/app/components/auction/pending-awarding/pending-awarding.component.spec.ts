import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAwardingComponent } from './pending-awarding.component';

describe('PendingAwardingComponent', () => {
  let component: PendingAwardingComponent;
  let fixture: ComponentFixture<PendingAwardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingAwardingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAwardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
