import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLaundryLastComponent } from './comment-laundry-last.component';

describe('CommentLaundryLastComponent', () => {
  let component: CommentLaundryLastComponent;
  let fixture: ComponentFixture<CommentLaundryLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentLaundryLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLaundryLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
