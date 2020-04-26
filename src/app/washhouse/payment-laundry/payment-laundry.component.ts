import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {DatePipe, Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {PaymentService} from '../services/payment.service';
import {Check} from '../../static/check';

@Component({
  selector: 'app-payment-laundry',
  templateUrl: './payment-laundry.component.html',
  styleUrls: ['./payment-laundry.component.css']
})
export class PaymentLaundryComponent implements OnInit {
  userList = [];
  paymentForm: FormGroup;
  payDynamForm: FormGroup;
  id_user_vict = -1;
  id_branch = -1;
  sError = '';

  // массив с итоговыми данными 1 поле - номер компонента, 2 поле - дата, 3 поле - плата в час, 4 поле число часов, 5 - koeff,
  // 6 поле - доп. работы, 7 поле - виртуальное или начисленное реально, 8 - был ли день рабочим для человека
  showPayModel   = [];
  arrayPay: [number, Date, number, number, number, number, boolean, boolean][] = [];


  constructor(private adminserv: AdminService,
              private pay: PaymentService,
              private location: Location,
              private router: Router,
              private authService: AuthService) {
    this.paymentForm = new FormGroup({
      'dateBegin': new FormControl({}, []),
      'dateEnd': new FormControl({}, []),
      'cs1': new FormControl({}, [])
    });

  this.payDynamForm = new FormGroup ({});


  }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }
    this.id_user_vict = Res.id_user_vict;

    this.id_branch = this.authService.getBranch(this.id_user_vict);
    this.LoadUserFromBranch(this.id_branch);

    const currentDate = new Date();
    this.paymentForm.controls['dateBegin'].setValue(currentDate.toISOString().substring(0, 10));
    this.paymentForm.controls['dateEnd'].setValue(currentDate.toISOString().substring(0, 10));
  }

  LoadUserFromBranch(id_branch) {
  this.adminserv.getUsers(id_branch).subscribe( (value: Array<any>) => {
    this.userList = [];
    value.forEach((element, ih) => {
      this.userList.push(element);
    });
    if (this.userList.length > 0) {
      this.paymentForm.controls['cs1'].setValue(this.userList[0].id);
    }
  });
  }

  userChange(e: Event) {
    this.showPay();
  }

  resetValue() {
    const dp = new DatePipe(navigator.language);
    const p = 'y-MM-dd';
    const dtr = dp.transform(new Date(), p );
   // this.dateForm.setValue({effectiveEndDate: dtr});
  }

  showPay() {
    //
    this.sError = '';
    const sDateBegin = this.paymentForm.controls['dateBegin'].value;
    const sDateEnd = this.paymentForm.controls['dateEnd'].value;

    const  timestampBegin = Date.parse(sDateBegin);
    if (isNaN(timestampBegin)) {
      this.sError = 'Неправильная дата начала.';
      return;
    }
    const beginDate = new Date(timestampBegin);

    const  timestampEnd = Date.parse(sDateEnd);
    if (isNaN(timestampEnd)) {
      this.sError = 'Неправильная дата конца.';
      return;
    }
    const endDate = new Date(timestampEnd);
    const id_user = this.paymentForm.controls['cs1'].value;


    const countDay = (endDate.getTime() - beginDate.getTime()) / 1000 / 60 / 60 / 24;

    if (countDay > 32) {
      this.sError = 'Слишком большой промежуток. Выберите не более 30 дней.';
    }

    // массив с итоговыми данными 0 поле - номер компонента, 1 поле - дата, 2 поле - плата в час, 3 поле число часов, 4 - koeff,
    // 5 поле - доп. работы, 6 поле - виртуальное или начисленное реально, 7 - был ли день рабочим для человека
    this.globalMassive(beginDate, endDate);
    this.pay.getPaymentReal(id_user, this.id_branch, beginDate.getTime(), endDate.getTime()).subscribe((pay_real: Array<any>) => {
      this.pay.getPaymentVirtual(id_user, this.id_branch, beginDate.getTime(), endDate.getTime()).subscribe((pay_virtual: Array<any>) => {

        // заносим каждую строку массива c реальными оплатами в наш массив для показа
        this.insert_pay_real(pay_real[0]);
        // если не было оплат но были смены - заносим виртуальные оплаты из смен
        this.insert_pay_virtual(pay_virtual[0]);
        this.createModelPayment();

        ///
        /// по факту получения всей информации создаем модель в paymentForm
        ///

      });
    });
  }

  // массив с итоговыми данными 0 поле - номер компонента, 1 поле - дата, 2 поле - плата в час, 3 поле число часов, 4 - koeff,
  // 5 поле - доп. работы, 6 поле - виртуальное или начисленное реально, 7 - был ли день рабочим для человека
   globalMassive(beginDate, endDate) {
     const tempDate = new Date(beginDate);
     this.arrayPay = [];
     let numberDay = 1;
     while (tempDate <= endDate) {
       const arrDate = new Date(tempDate);
       arrDate.setHours(0, 0, 0, 0);
       this.arrayPay.push([numberDay, arrDate, 0, 0, 1, 0, false, false]);
       tempDate.setDate(tempDate.getDate() + 1);
       numberDay = numberDay + 1;
     }
   }

   clearDynamForm() {
     const m = [];
     Object.keys(this.payDynamForm.controls).forEach(key => {
       this.payDynamForm.removeControl(key);
     });
     this.showPayModel = [];
     this.payDynamForm.updateValueAndValidity();
   }

  // массив с итоговыми данными 0 поле - номер компонента, 1 поле - дата, 2 поле - плата в час, 3 поле число часов, 4 - koeff,
  // 5 поле - доп. работы, 6 поле - виртуальное или начисленное реально, 7 - был ли день рабочим для человека
  /// после получения всей информации создаем модель в payDynamForm
    createModelPayment () {
         this.clearDynamForm();
         for (let i = 0; i < this.arrayPay.length; i ++ )  {
           this.showPayModel.push(i + 1);
           this.payDynamForm.addControl('PayPerHour' + this.arrayPay[i][0], new FormControl(this.arrayPay[i][2]));
           this.payDynamForm.addControl('Hour' + this.arrayPay[i][0], new FormControl(this.arrayPay[i][3]));
           this.payDynamForm.addControl('Koeff' + this.arrayPay[i][0], new FormControl(this.arrayPay[i][4]));
           this.payDynamForm.addControl('AddWork' + this.arrayPay[i][0], new FormControl(this.arrayPay[i][5]));
       }

     }


  Clear() {
    this.clearDynamForm();
  }

  // массив с итоговыми данными 0 - номер компонента, 1 - дата, 2 - плата в час, 3 число часов, 4 - koeff,
  // 5 - доп. работы, 6 - виртуальное или начисленное реально, 7 - был ли день рабочим для человека
  insert_pay_real(arrRealPay) {
    for (let i = 0; i < arrRealPay.length; i ++ ) {
      const tempDate = new Date(arrRealPay[i].pay_year, arrRealPay[i].pay_mm - 1, arrRealPay[i].pay_dd);
      tempDate.setHours(0, 0, 0, 0);
      const Res = this.arrayPay.find((rpay) =>  rpay[1].getTime()  === tempDate.getTime());

      if (Res) {
        Res[2] = arrRealPay[i].pay;
        Res[3] = arrRealPay[i].hour;
        Res[4] = arrRealPay[i].koeff;
        Res[5] = arrRealPay[i].addwork;
        Res[6] = true;
        Res[7] = true;
      }
    }
  }

  // массив с итоговыми данными 0 - номер компонента, 1 - дата, 2 - плата в час, 3 число часов, 4 - koeff,
  // 5 - доп. работы, 6 - виртуальное или начисленное реально, 7 - был ли день рабочим для человека
  insert_pay_virtual(arrVirtualPay) {
    for (let i = 0; i < arrVirtualPay.length; i ++ ) {

      const tempDate = new Date(arrVirtualPay[i].date_shift);
      tempDate.setHours(0, 0, 0, 0);
      const Res = this.arrayPay.find((vpay) =>  {
        if (!vpay[6]) {
          return vpay[1].getTime()  === tempDate.getTime();
        }
      });

      if (Res) {
        Res[2] = arrVirtualPay[i].price_position;
        Res[3] = arrVirtualPay[i].rounded_time;
        Res[4] = 1;
        Res[5] = arrVirtualPay[i].summa_add;
        Res[6] = false;
        Res[7] = true;
      }
    }

  }

  getCurStyle(p: number) {
    if (this.arrayPay[p - 1][7] === true &&
        this.arrayPay[p - 1][4] !== 0) {
      if (this.arrayPay[p - 1][6] === true) {
        return 'background-color:#87CEEB';
      } else {
        return 'background-color:#FFFFE0';
      }
    } else {
      return 'background-color:#DCDCDC';
    }

  }

  saveData() {

    const Res = [];
    console.log('save data');

    for (let i = 0; i < this.arrayPay.length; i ++ )  {
      // обновляем плату в час
      let sPayHour = this.payDynamForm.controls['PayPerHour' + this.arrayPay[i][0]].value;
      let sHour = this.payDynamForm.controls['Hour' + this.arrayPay[i][0]].value;
      let sKoeff = this.payDynamForm.controls['Koeff' + this.arrayPay[i][0]].value;
      let sAddWork = this.payDynamForm.controls['AddWork' + this.arrayPay[i][0]].value;

      sKoeff = sKoeff.toString().trim().replace(',', '.');
      if (Number(sKoeff)) {
        if (Number(sKoeff) < 0) {
          sKoeff = '0';
        }
      } else {
        sKoeff = '0';
      }

      sPayHour = sPayHour.toString().trim();
      if (!Check.ZeroOrPositive(sPayHour)) {
        sPayHour = '0';
      }

      sHour = sHour.toString().trim();
      if (!Check.ZeroOrPositive(sHour)) {
        sHour = '0';
      }

      sAddWork = sAddWork.toString().trim();
      if (!Check.ZeroOrPositive(sAddWork)) {
        sAddWork = '0';
      }

      const tmpDate = new Date(this.arrayPay[i][1]);
      Res.push({'payhour': sPayHour, 'hour': sHour, 'koeff': sKoeff, 'addwork': sAddWork,
                'dd': tmpDate.getDate(), 'mm': tmpDate.getMonth() + 1, 'yyyy': tmpDate.getFullYear()});
    }


    const id_user = this.paymentForm.controls['cs1'].value;
    this.pay.setPayment(id_user, this.id_branch, Res).subscribe( value => {
      this.showPay();
      this.sError = 'Данные результаты занесены в базу и обновлены.';
    });

  }
}
