import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-warehouse',
  templateUrl: './report-warehouse.component.html',
  styleUrls: ['./report-warehouse.component.css']
})
export class ReportWarehouseComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  warehouseList = [];
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
        this.warehouseList = value;
      });
    });
  }


}
