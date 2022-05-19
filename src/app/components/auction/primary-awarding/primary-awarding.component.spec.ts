import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAwardingComponent } from './primary-awarding.component';

describe('PrimaryAwardingComponent', () => {
  let component: PrimaryAwardingComponent;
  let fixture: ComponentFixture<PrimaryAwardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryAwardingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAwardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
