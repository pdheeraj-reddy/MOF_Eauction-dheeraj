import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmDetailPageComponent } from './am-detail-page.component';

describe('AmDetailPageComponent', () => {
  let component: AmDetailPageComponent;
  let fixture: ComponentFixture<AmDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmDetailPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
