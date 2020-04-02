import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentLaundryComponent } from './shipment-laundry.component';

describe('ShipmentLaundryComponent', () => {
  let component: ShipmentLaundryComponent;
  let fixture: ComponentFixture<ShipmentLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
