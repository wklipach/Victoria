import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryFaceWeekComponent } from './laundry-face-week.component';

describe('LaundryFaceWeekComponent', () => {
  let component: LaundryFaceWeekComponent;
  let fixture: ComponentFixture<LaundryFaceWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryFaceWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryFaceWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
