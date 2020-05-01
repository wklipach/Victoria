import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-report-shipment',
  templateUrl: './report-shipment.component.html',
  styleUrls: ['./report-shipment.component.css']
})
export class ReportShipmentComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;
  shipmentList = [];
  sAddress = 'Наименование';

  constructor(private rs: ReportService, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.Load();
  }

  ngOnInit(): void {
  }

  Load() {
    this.rs.getAddress(this.intAddress).subscribe(arrAddr => {
      const Res = this.auth.loginStorage();
      this.sAddress = arrAddr[0].address;
      this.rs.getShipmentReport(this.intAddress, Res.id_branch_vict).subscribe((value) => {
        this.shipmentList = value[0];
      });
    });
  }

}
