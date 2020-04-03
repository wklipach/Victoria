import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairLaundryComponent } from './repair-laundry.component';

describe('RepairLaundryComponent', () => {
  let component: RepairLaundryComponent;
  let fixture: ComponentFixture<RepairLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
