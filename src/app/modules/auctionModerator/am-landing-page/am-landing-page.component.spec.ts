import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmLandingPageComponent } from './am-landing-page.component';

describe('AmLandingPageComponent', () => {
  let component: AmLandingPageComponent;
  let fixture: ComponentFixture<AmLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmLandingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
