import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairLaundryLastComponent } from './repair-laundry-last.component';

describe('RepairLaundryLastComponent', () => {
  let component: RepairLaundryLastComponent;
  let fixture: ComponentFixture<RepairLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
