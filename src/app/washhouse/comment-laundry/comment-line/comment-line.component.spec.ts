import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLineComponent } from './comment-line.component';

describe('CommentLineComponent', () => {
  let component: CommentLineComponent;
  let fixture: ComponentFixture<CommentLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
