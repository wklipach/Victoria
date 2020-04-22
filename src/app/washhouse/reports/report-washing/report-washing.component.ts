import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-washing',
  templateUrl: './report-washing.component.html',
  styleUrls: ['./report-washing.component.css']
})
export class ReportWashingComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  washingList = [];
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
      this.rs.getWarehouseReport(this.intAddress).subscribe((value: Array<Object>) => {
        this.washingList = value;
      });
    });

  }
}
