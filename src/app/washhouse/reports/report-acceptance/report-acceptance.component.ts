import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-acceptance',
  templateUrl: './report-acceptance.component.html',
  styleUrls: ['./report-acceptance.component.css']
})
export class ReportAcceptanceComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  acceptanceList = [];
  sAddress = 'Наименование';

  constructor(private rs: ReportService) { }


  ngOnChanges(changes: SimpleChanges) {
    this.Load();
  }

  ngOnInit(): void {

  }

  Load() {
    this.rs.getAddress(this.intAddress).subscribe(arrAddr => {
      this.sAddress = arrAddr[0].address;
      this.rs.getAcceptanceReport(this.intAddress).subscribe((value: Array<Object>) => {
        this.acceptanceList = value;
      });
    });

  }

}
