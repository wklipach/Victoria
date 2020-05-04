import { Component, OnInit } from '@angular/core';
import Dygraph from 'dygraphs';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../services/report.service';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  dateBegin: Date;
  dateEnd: Date;
  currentDate: Date;

  graphForm: FormGroup;
  intPeriod = 0;
  id_user_vict = -1;
  id_branch_vict = -1;

  constructor(private rs: ReportService,
              private authService: AuthService,
              private router: Router) {
    this.graphForm = new FormGroup({
      'groupYear': new FormControl('')
    });
  }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    this.id_user_vict = Res.id_user_vict;
    this.id_branch_vict = Res.id_branch_vict;

    this.dateBegin = new Date();
    this.dateEnd = new Date();
    this.graphForm.controls['groupYear'].setValue('1');

    this.intPeriod = this.graphForm.controls['groupYear'].value;
    this.currentDate = new Date();
    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

  drawPeriod(i: number, currentDate) {

    let Res = [];

   if (i === 1) {
     Res = this.getMonthBounds(currentDate);
     this.dateBegin = Res[0];
     this.dateEnd = Res[1];
   }

    if (i === 2) {
      Res = this.getQuarterBounds(currentDate);
      this.dateBegin = Res[0];
      this.dateEnd = Res[1];
    }

    if (i === 3) {
      Res = this.getYearBounds(currentDate);
      this.dateBegin = Res[0];
      this.dateEnd = Res[1];
    }

   this.graph_load(this.dateBegin, this.dateEnd);

  }

  graph_load(dateBegin, dateEnd) {

    this.rs.getSelectGraph(this.id_user_vict, this.id_branch_vict, this.dateBegin, this.dateEnd, this.intPeriod).subscribe(
      (value: Array<any>) => {
        const data = [];
        value[0].forEach((element, ih) => {
          const dd = new Date(element.date_shift);
          const summa = element.summa;
          data.push([dd, summa]);
        });

        if (data.length === 0) {
          data.push([this.dateBegin, 0]);
          data.push([this.dateEnd, 0]);
        }

        const g = new Dygraph(
          document.getElementById('graph'),
          data,
          { fillGraph: true, drawAxis: true, showLabelsOnHighlight: false, color: '#87CEFA', labels: ['Date', 'Series1'] }
        );

      }
    );
  }


/* ОБРАЗЕЦ
  payment_graph() {

const data = [];
data.push([new Date(2020, 4, 3, 0, 0, 0, 0), 1]);
data.push([new Date(2020, 4, 5, 0, 0, 0, 0), 2]);
data.push([new Date(2020, 4, 6, 0, 0, 0, 0), 3]);
    const g = new Dygraph(
      document.getElementById('graph'),
      data,
      { fillGraph: true, drawAxis: true, showLabelsOnHighlight: false, color: '#87CEFA' }
    );
  }
 */

// границы квартала
  getQuarterBounds(date) {

    const qDate = new Date(date);
    const firstQuarter  = new Date(qDate.setMonth(date.getMonth() - date.getMonth() % 3, 1));
    const endQuarter = new Date(qDate.setMonth(date.getMonth() + 3 - date.getMonth() % 3, 0));
    return [firstQuarter, endQuarter];
  }

// границы года
  getYearBounds(date) {
    // первый день года
  const firstDayCurrYear  = new Date(date.getFullYear(), 0, 1);
  // Аналогичным образом находим последний день текущего года как 31 число 11 месяца.
  const lastDayCurrYear  = new Date(date.getFullYear(), 11, 31);
    return [firstDayCurrYear, lastDayCurrYear];
  }

// границы месяца
  getMonthBounds(date) {

    const dd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // первый день месяца
    const firstDayCurrMonth  = new Date(date.getFullYear(), date.getMonth(), 1);
    // последний день месяца
    const lastDayCurrMonth  = new Date(date.getFullYear(), date.getMonth(), dd);
    return [firstDayCurrMonth, lastDayCurrMonth];
  }

  onClick() {
    this.intPeriod = this.graphForm.controls['groupYear'].value;
    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

  onNow() {
    this.intPeriod = this.graphForm.controls['groupYear'].value;
    this.currentDate = new Date();
    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

  onClickLeft() {

    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    // уменьшаяем на 1 месяц
    if (Number(this.intPeriod) === 1) {
       this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }

    // уменьшаяем на 1 квартал
    if (Number(this.intPeriod) === 2) {
      this.currentDate.setMonth(this.currentDate.getMonth() - 3);
    }

    // уменьшаяем на 1 год
    if (Number(this.intPeriod) === 3) {
      this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    }

    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

  onClickRifht() {
    // увеличиваем на 1 месяц
    if (Number(this.intPeriod) === 1) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }

    // увеличиваем на 1 квартал
    if (Number(this.intPeriod) === 2) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 3);
    }

    // увеличиваем на 1 год
    if (Number(this.intPeriod) === 3) {
      this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    }

    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

}
