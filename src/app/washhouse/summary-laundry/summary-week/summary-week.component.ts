import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-summary-week',
  templateUrl: './summary-week.component.html',
  styleUrls: ['./summary-week.component.css']
})
export class SummaryWeekComponent implements OnInit, OnChanges {

  @Input() id_user = -1;
  @Input() id_branch = -1;
  @Input() date_begin: Date;
  @Input() date_end: Date;

  payList = [];

  constructor(private report: ReportService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {


      if (this.id_user > 0 && this.id_branch > 0 && this.date_begin && this.date_end) {
        this.SelectReportWeek(this.id_user, this.id_branch, this.date_begin, this.date_end);
      }


  }

  SelectReportWeek(id_user, id_branch, date_begin, date_end) {
    this.report.getSelectReportWeek(id_user, id_branch, date_begin.getTime(), date_end.getTime()).subscribe((value) => {
      console.log('this.payList', value);
      this.payList = value[0];

    });
  }


}
