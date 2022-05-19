import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucMemDetailPageComponent } from './auc-mem-detail-page.component';

describe('AucMemDetailPageComponent', () => {
  let component: AucMemDetailPageComponent;
  let fixture: ComponentFixture<AucMemDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucMemDetailPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucMemDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
