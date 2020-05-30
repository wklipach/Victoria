import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioVideoComponent } from './biblio-video.component';

describe('BiblioVideoComponent', () => {
  let component: BiblioVideoComponent;
  let fixture: ComponentFixture<BiblioVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
