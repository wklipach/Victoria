import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportShipmentComponent } from './report-shipment.component';

describe('ReportShipmentComponent', () => {
  let component: ReportShipmentComponent;
  let fixture: ComponentFixture<ReportShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
