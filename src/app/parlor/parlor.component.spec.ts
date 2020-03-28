import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlorComponent } from './parlor.component';

describe('ParlorComponent', () => {
  let component: ParlorComponent;
  let fixture: ComponentFixture<ParlorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParlorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
