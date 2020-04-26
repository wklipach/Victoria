import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLaundryComponent } from './payment-laundry.component';

describe('PaymentLaundryComponent', () => {
  let component: PaymentLaundryComponent;
  let fixture: ComponentFixture<PaymentLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
