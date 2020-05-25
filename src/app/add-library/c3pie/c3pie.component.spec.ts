import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C3pieComponent } from './c3pie.component';

describe('C3pieComponent', () => {
  let component: C3pieComponent;
  let fixture: ComponentFixture<C3pieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C3pieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C3pieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
