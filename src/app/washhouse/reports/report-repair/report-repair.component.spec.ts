import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRepairComponent } from './report-repair.component';

describe('ReportRepairComponent', () => {
  let component: ReportRepairComponent;
  let fixture: ComponentFixture<ReportRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
