import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLaundryComponent } from './comment-laundry.component';

describe('CommentLaundryComponent', () => {
  let component: CommentLaundryComponent;
  let fixture: ComponentFixture<CommentLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
