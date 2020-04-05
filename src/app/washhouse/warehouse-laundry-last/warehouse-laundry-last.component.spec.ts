import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLaundryLastComponent } from './warehouse-laundry-last.component';

describe('WarehouseLaundryLastComponent', () => {
  let component: WarehouseLaundryLastComponent;
  let fixture: ComponentFixture<WarehouseLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
