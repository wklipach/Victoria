import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceLaundryLastComponent } from './acceptance-laundry-last.component';

describe('AcceptanceLaundryLastComponent', () => {
  let component: AcceptanceLaundryLastComponent;
  let fixture: ComponentFixture<AcceptanceLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
