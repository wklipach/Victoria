import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkAdminComponent } from './addwork-admin.component';

describe('AddworkAdminComponent', () => {
  let component: AddworkAdminComponent;
  let fixture: ComponentFixture<AddworkAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddworkAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddworkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
