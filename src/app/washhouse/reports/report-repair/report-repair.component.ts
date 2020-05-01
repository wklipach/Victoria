import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {AuthService} from '../../../services/auth-service.service';
import {any} from 'codelyzer/util/function';

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
  constructor(private rs: ReportService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  Load() {
    this.rs.getAddress(this.intAddress).subscribe(arrAddr => {
      this.sAddress = arrAddr[0].address;

      const Res = this.auth.loginStorage();
      this.rs.getRepairReport(this.intAddress, Res.id_branch_vict).subscribe((value) => {
        this.warehouseList = value[0];
        console.log(this.warehouseList);
      });
    });
  }


}
