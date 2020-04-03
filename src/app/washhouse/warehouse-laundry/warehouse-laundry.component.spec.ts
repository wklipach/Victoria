import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLaundryComponent } from './warehouse-laundry.component';

describe('WarehouseLaundryComponent', () => {
  let component: WarehouseLaundryComponent;
  let fixture: ComponentFixture<WarehouseLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
