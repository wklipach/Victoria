import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioNewComponent } from './biblio-new.component';

describe('BiblioNewComponent', () => {
  let component: BiblioNewComponent;
  let fixture: ComponentFixture<BiblioNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
