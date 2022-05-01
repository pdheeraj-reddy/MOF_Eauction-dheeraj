import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdctDetailsComponent } from './prodct-details.component';

describe('ProdctDetailsComponent', () => {
  let component: ProdctDetailsComponent;
  let fixture: ComponentFixture<ProdctDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdctDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdctDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
