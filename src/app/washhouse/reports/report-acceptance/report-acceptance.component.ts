import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-report-acceptance',
  templateUrl: './report-acceptance.component.html',
  styleUrls: ['./report-acceptance.component.css']
})
export class ReportAcceptanceComponent implements OnInit, OnChanges {

  @Input() intAddress = -1;

  acceptanceList = [];
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
      this.rs.getAcceptanceReport(this.intAddress, Res.id_branch_vict).subscribe((value) => {
        this.acceptanceList = value[0];
      });
    });

  }

}
