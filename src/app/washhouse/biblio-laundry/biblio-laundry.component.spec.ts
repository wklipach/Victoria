import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioLaundryComponent } from './biblio-laundry.component';

describe('BiblioLaundryComponent', () => {
  let component: BiblioLaundryComponent;
  let fixture: ComponentFixture<BiblioLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
