import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPdfTemplateComponent } from './bill-pdf-template.component';

describe('BillPdfTemplateComponent', () => {
  let component: BillPdfTemplateComponent;
  let fixture: ComponentFixture<BillPdfTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillPdfTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPdfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
