import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAwardingComponent } from './final-awarding.component';

describe('FinalAwardingComponent', () => {
  let component: FinalAwardingComponent;
  let fixture: ComponentFixture<FinalAwardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalAwardingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalAwardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
