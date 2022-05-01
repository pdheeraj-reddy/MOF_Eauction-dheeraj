import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidValueComponent } from './edit-bid-value.component';

describe('EditBidValueComponent', () => {
  let component: EditBidValueComponent;
  let fixture: ComponentFixture<EditBidValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBidValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
