import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucModLandingPageComponent } from './auc-mod-landing-page.component';

describe('AucModLandingPageComponent', () => {
  let component: AucModLandingPageComponent;
  let fixture: ComponentFixture<AucModLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucModLandingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucModLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
