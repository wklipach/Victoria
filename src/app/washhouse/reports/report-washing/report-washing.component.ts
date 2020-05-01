import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-report-washing',
  templateUrl: './report-washing.component.html',
  styleUrls: ['./report-washing.component.css']
})
export class ReportWashingComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;
  washingList = [];
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
      this.rs.getWashingReport(this.intAddress, Res.id_branch_vict).subscribe((value) => {
        this.washingList = value[0];
      });
    });
  }
}
