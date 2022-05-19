import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucMemLandingPageComponent } from './auc-mem-landing-page.component';

describe('AucMemLandingPageComponent', () => {
  let component: AucMemLandingPageComponent;
  let fixture: ComponentFixture<AucMemLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucMemLandingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucMemLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
