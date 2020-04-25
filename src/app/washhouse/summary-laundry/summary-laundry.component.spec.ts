import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryLaundryComponent } from './summary-laundry.component';

describe('SummaryLaundryComponent', () => {
  let component: SummaryLaundryComponent;
  let fixture: ComponentFixture<SummaryLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
