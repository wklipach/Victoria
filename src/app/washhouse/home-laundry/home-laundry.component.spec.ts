import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLaundryComponent } from './home-laundry.component';

describe('HomeLaundryComponent', () => {
  let component: HomeLaundryComponent;
  let fixture: ComponentFixture<HomeLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
