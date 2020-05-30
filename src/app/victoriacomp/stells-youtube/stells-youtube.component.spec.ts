import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StellsYoutubeComponent } from './stells-youtube.component';

describe('StellsYoutubeComponent', () => {
  let component: StellsYoutubeComponent;
  let fixture: ComponentFixture<StellsYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StellsYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StellsYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
