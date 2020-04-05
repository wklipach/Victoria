import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentLaundryLastComponent } from './shipment-laundry-last.component';

describe('ShipmentLaundryLastComponent', () => {
  let component: ShipmentLaundryLastComponent;
  let fixture: ComponentFixture<ShipmentLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
