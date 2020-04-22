import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAcceptanceComponent } from './report-acceptance.component';

describe('ReportAcceptanceComponent', () => {
  let component: ReportAcceptanceComponent;
  let fixture: ComponentFixture<ReportAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
