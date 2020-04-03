import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingLaundryComponent } from './washing-laundry.component';

describe('WashingLaundryComponent', () => {
  let component: WashingLaundryComponent;
  let fixture: ComponentFixture<WashingLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashingLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
