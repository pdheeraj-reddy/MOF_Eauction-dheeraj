import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPdfProductComponent } from './bill-pdf-product.component';

describe('BillPdfProductComponent', () => {
  let component: BillPdfProductComponent;
  let fixture: ComponentFixture<BillPdfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillPdfProductComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPdfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
