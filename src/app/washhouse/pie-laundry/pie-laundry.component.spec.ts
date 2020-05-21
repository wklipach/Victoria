import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieLaundryComponent } from './pie-laundry.component';

describe('PieLaundryComponent', () => {
  let component: PieLaundryComponent;
  let fixture: ComponentFixture<PieLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
