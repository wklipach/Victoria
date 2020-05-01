import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-report-warehouse',
  templateUrl: './report-warehouse.component.html',
  styleUrls: ['./report-warehouse.component.css']
})
export class ReportWarehouseComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  warehouseList = [];
  sAddress = 'Наименование';

  constructor(private rs: ReportService, private auth: AuthService) { }


  ngOnChanges(changes: SimpleChanges) {
    this.Load();
  }

  ngOnInit(): void {

  }

  Load() {
    this.rs.getAddress(this.intAddress).subscribe(arrAddr => {
      this.sAddress = arrAddr[0].address;
      const Res = this.auth.loginStorage();
      this.rs.getWarehouseReport(this.intAddress, Res.id_branch_vict).subscribe((value) => {
        this.warehouseList = value[0];
      });
    });
  }


}
