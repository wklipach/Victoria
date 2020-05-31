import {Component, Input, OnInit} from '@angular/core';
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
  bigArrayDate1 = [];
  bigArrayColor1 = [];
  bigArrayDate2 = [];
  bigArrayColor2 = [];
  bigArrayDate3 = [];
  bigArrayColor3 = [];
  bigArrayDate4 = [];
  bigArrayColor4 = [];
  bigArrayDate5 = [];
  bigArrayColor5 = [];
  bigArrayDate6 = [];
  bigArrayColor6 = [];


  colorAdress =  [{id: 1, color: '#597ba8'}, // Синий
                  {id: 2, color: '#82a2cd'}, // Светло синий
                  {id: 3, color: '#bf68a6'}, // Красный
                  {id: 4, color: '#78b27c'}, // Зеленый
                  {id: 5, color: '#c6a2bc'}, // Светло розовый
                  {id: 6, color: '#b0ceb2'}, // Светло зеленый
                  {id: 7, color: '#f3b200'}, // Желтый
                  {id: 8, color: '#e7e271'}, // Светло желтый
                  {id: 9, color: '#d2a544'}, // Оранжевый
                  {id: 10, color: '#dbbf83'} // Светло оранжевый
  ];


  constructor(private rs: ReportService,
              private authService: AuthService,
              private router: Router) {
    this.pieForm = new FormGroup({
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
    this.pieForm.controls['groupYear'].setValue('1');

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


    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 1);
    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 2);
    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 3);
    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 4);
    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 5);
    this.pie_load(this.id_branch_vict, this.dateBegin, this.dateEnd, 6);

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


  pie_load(id_branch, date_begin, date_end, inttype) {

    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const date_begin_gmt = (new Date(date_begin - tzoffset)).toISOString().slice(0, -1);
    const date_end_gmt = (new Date(date_end - tzoffset)).toISOString().slice(0, -1);

    const currentPie = [];
    const var_masColor = [];

    this.rs.getSelectPie(id_branch, date_begin_gmt, date_end_gmt, inttype).subscribe(
      value => {
        if (value) {
          if (value[0]) {
            const res = value[0];
            Object.keys(res).forEach( (key) => {
              currentPie.push([res[key].address, res[key].massa]);
              const curColor = this.colorAdress.find( arrAddr => arrAddr.id === Number(res[key].id_address)).color;
              var_masColor.push([res[key].address, curColor]);
            });
          }

          switch ( inttype ) {
            case 1:
              this.bigArrayDate1 = currentPie;
              this.bigArrayColor1 = var_masColor;
              break;
            case 2:
              this.bigArrayDate2 = currentPie;
              this.bigArrayColor2 = var_masColor;
              break;
            case 3:
              this.bigArrayDate3 = currentPie;
              this.bigArrayColor3 = var_masColor;
              break;
            case 4:
              this.bigArrayDate4 = currentPie;
              this.bigArrayColor4 = var_masColor;
              break;
            case 5:
              this.bigArrayDate5 = currentPie;
              this.bigArrayColor5 = var_masColor;
              break;
            case 6:
              this.bigArrayDate6 = currentPie;
              this.bigArrayColor6 = var_masColor;
              break;
            default:
              this.bigArrayDate1 = [];
              this.bigArrayColor1 = [];
              this.bigArrayDate2 = [];
              this.bigArrayColor2 = [];
              this.bigArrayDate3 = [];
              this.bigArrayColor3 = [];
              this.bigArrayDate4 = [];
              this.bigArrayColor4 = [];
              this.bigArrayDate5 = [];
              this.bigArrayColor5 = [];
              this.bigArrayDate6 = [];
              this.bigArrayColor6 = [];
              break;
          }

        }
      });
  }


/*
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
*/

}
