import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkLaundryLastComponent } from './addwork-laundry-last.component';

describe('AddworkLaundryLastComponent', () => {
  let component: AddworkLaundryLastComponent;
  let fixture: ComponentFixture<AddworkLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddworkLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddworkLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
