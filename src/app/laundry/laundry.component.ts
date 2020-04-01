import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';
import {ShiftService} from '../services/shift.service';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {

  titleShift = '';
  titleShiftDate: Date;
  id_user_vict = -1;
  userName = '';
  userSurname = '';
  sEndShift = 'Закончить смену';
  sBeginShift = 'Начать смену';

  constructor(private router: Router, private authService: AuthService, private ss: ShiftService) {
    this.titleShift = 'Начать смену';
  }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }


    this.loadInfo();
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['/login']);
  }

  onShift() {
    console.log('onShift()', ShiftService.getShift());

    if (ShiftService.getShift()) {
      this.endShift();
    } else {
      this.beginShift();
    }
  }

  // функция завершения смены
  endShift() {
    const dDate = new Date();

    this.ss.set_shift_end(this.id_user_vict, this.authService.getBranch(this.id_user_vict), dDate.getTime()).subscribe(
      value => {
        this.titleShiftDate = null;
        this.titleShift = this.sBeginShift;
        ShiftService.setShift(false);
      });
  }

  // функция начала смены
  beginShift() {
    const dDate = new Date();
    this.ss.set_shift_begin(this.id_user_vict, this.authService.getBranch(this.id_user_vict), dDate.getTime()).subscribe(
      value => {
        this.titleShiftDate = dDate;
        this.titleShift = this.sEndShift;
        ShiftService.setShift(true);
      });
  }

  loadInfo() {
    // смотрим и выводим имя пользователя
    this.authService.getUserFromId(this.id_user_vict).subscribe(
      value => {
            this.userName = value[0].name;
            this.userSurname = value[0].surname;
            // после этого выводим данные о смене
            const id_branch = this.authService.getBranch(this.id_user_vict);
            this.ss.get_shiftuserbranch(this.id_user_vict, id_branch).subscribe((shift: Array<any>) => {

              console.log('shift[0]', shift[0], shift.length);
              if (shift.length > 0) {
                this.titleShiftDate = shift[0].date_begin;
                this.titleShift = this.sEndShift;
                ShiftService.setShift(true);
              } else {
                this.titleShift = this.sBeginShift;
                ShiftService.setShift(false);
              }
            });
      });
  }

}

/*
  В laundry
  Кнопка Начать смену после клика:
  1. должна иметь название Окончить смену
  2. в <li class="list-group-item"> Дата начала смены в
      <span class="startDate">29.03.2020</span> надо занести текущую дату
  3. <li class="list-group-item"> Время начала смены в <span class="startTime">06.00</span></li>
     надо занести текущее время
  4. Получить текущий IP и сравнить с эталоном, который должен вноситься в базу.
      (Поскольку подразделения разные, то и IP у них будут разные, то есть должна быть привязка
      IP к месту нахождения подразделения.
 */
