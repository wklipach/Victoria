import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceLaundryComponent } from './acceptance-laundry.component';

describe('AcceptanceLaundryComponent', () => {
  let component: AcceptanceLaundryComponent;
  let fixture: ComponentFixture<AcceptanceLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
