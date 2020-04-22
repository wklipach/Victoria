import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-repair',
  templateUrl: './report-repair.component.html',
  styleUrls: ['./report-repair.component.css']
})
export class ReportRepairComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  warehouseList = [];
  sAddress = 'Наименование';

  ngOnChanges(changes: SimpleChanges) {
    this.Load();
  }
  constructor(private rs: ReportService) { }

  ngOnInit(): void {
  }

  Load() {
    this.rs.getAddress(this.intAddress).subscribe(arrAddr => {
      this.sAddress = arrAddr[0].address;
      this.rs.getRepairReport(this.intAddress).subscribe((value: Array<Object>) => {
        this.warehouseList = value;
      });
    });
  }


}
