import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentImageComponent } from './comment-image.component';

describe('CommentImageComponent', () => {
  let component: CommentImageComponent;
  let fixture: ComponentFixture<CommentImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
