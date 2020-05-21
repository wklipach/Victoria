import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../services/report.service';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pie-laundry',
  templateUrl: './pie-laundry.component.html',
  styleUrls: ['./pie-laundry.component.css']
})
export class PieLaundryComponent implements OnInit {
  dateBegin: Date;
  dateEnd: Date;
  currentDate: Date;

  pieForm: FormGroup;
  intPeriod = 0;
  id_user_vict = -1;
  id_branch_vict = -1;
  dataPie = [];
  dataIdAddress = [];

  constructor(private rs: ReportService,
              private authService: AuthService,
              private router: Router) {
    this.pieForm = new FormGroup({
      'groupYear': new FormControl(''),
      'inputOper': new FormControl('')
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
    this.pieForm.controls['groupYear'].setValue('1');

    this.pieForm.controls['inputOper'].setValue('1');

    this.intPeriod = this.pieForm.controls['groupYear'].value;
    this.currentDate = new Date();
    this.drawPeriod(Number(this.intPeriod), this.currentDate);

  }

  onNow() {
    this.intPeriod = this.pieForm.controls['groupYear'].value;
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

    this.pie_load(this.dateBegin, this.dateEnd);

  }

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

  onClick() {
    this.intPeriod = this.pieForm.controls['groupYear'].value;
    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }

  onOperChange() {
    this.intPeriod = this.pieForm.controls['groupYear'].value;
    this.drawPeriod(Number(this.intPeriod), this.currentDate);
  }



  pie_load(dateBegin, dateEnd) {

    const intType = this.pieForm.controls['inputOper'].value;

    this.rs.getSelectPie(this.id_branch_vict, this.dateBegin.toISOString() , this.dateEnd.toISOString(), intType).subscribe(
      value => {
        if (value) {
          const currentPie = [];
          const currentAddress = [];
          if (value[0]) {
              const res = value[0];
              Object.keys(res).forEach(key => {
                currentPie.push([res[key].address, res[key].massa]);
                currentAddress.push(res[key].id_address);
              });
          }

          this.dataIdAddress = currentAddress;
          this.dataPie = currentPie;
        }
      });
  }

}
