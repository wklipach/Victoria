import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWashingComponent } from './report-washing.component';

describe('ReportWashingComponent', () => {
  let component: ReportWashingComponent;
  let fixture: ComponentFixture<ReportWashingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportWashingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWashingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
