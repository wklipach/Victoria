import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingLaundryLastComponent } from './washing-laundry-last.component';

describe('WashingLaundryLastComponent', () => {
  let component: WashingLaundryLastComponent;
  let fixture: ComponentFixture<WashingLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashingLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
