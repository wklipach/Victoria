import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ShiftService} from '../../services/shift.service';
import {ReportService} from '../services/report.service';
import {GlobalRef} from '../../services/globalref';
import {CommentService} from '../services/comment.service';

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

  /* начало и окончание текущей недели */
  titleDB = '';
  titleDE = '';
  /* выработка за неделю */
  Productivity = 0;
  RoundedTime = '';
  ExactTime = '';
  VirtualBasicPayment = 0;
  VirtItogo = 0;
  VirtualAddwork = 0;
  LastShiftItogo = 0;
  rating = 0;
  public sAvatarPath  = '';
  unreadMessageCount = 0;

  constructor(private router: Router, private authService: AuthService,
                                      private cs: CommentService,
                                      private repserv: ReportService,
                                      private gr: GlobalRef,
                                      private ss: ShiftService) {
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
    this.onLoadFromBaseAvatar();

    const ResCountDate = this.getMonthBounds(new Date());

    this.cs.getMessageUnreadCount(this.id_user_vict, Res.id_branch_vict, ResCountDate[0], ResCountDate[1]).subscribe( value => {
      this.unreadMessageCount = value[0][0].unread_message;
    });


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

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['/login']);
  }

  onShift() {

    if (ShiftService.getShift()) {
      this.endShift();
    } else {
      this.beginShift();
    }
  }

  // функция завершения смены
  endShift() {
    const dDate = new Date();

    this.ss.set_shift_end(this.id_user_vict, this.authService.getBranch(this.id_user_vict)).subscribe(
      value => {
        this.titleShiftDate = null;
        this.titleShift = this.sBeginShift;
        ShiftService.setShift(false);
      });
  }

  // функция начала смены
  beginShift() {
    const dDate = new Date();
    this.ss.set_shift_begin(this.id_user_vict, this.authService.getBranch(this.id_user_vict)).subscribe(
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

            if (value[0]) {
              this.userName = value[0].name;
              this.userSurname = value[0].surname;
            }
            // после этого выводим данные о смене
            const id_branch = this.authService.getBranch(this.id_user_vict);
            this.repserv.getSelectFace(this.id_user_vict, id_branch).subscribe((res_face: Array<any>) => {

              const face = res_face[0][0];

              // db
              // de
              // rounded_time
              // exact_time
              // productivity
              // virt_addwork
              // virtual_basic
             // virt_itogo
              // last_shift_itogo
              // rating

                // this.titleShiftDate = value[0].
                this.titleDB = face.db;
                this.titleDE = face.de;
                this.Productivity = face.productivity;
                this.RoundedTime = face.rounded_time;
                this.ExactTime = face.exact_time;
                this.VirtualBasicPayment = face.virtual_basic;
                this.VirtualAddwork = face.virt_addwork;
                this.VirtItogo  = face.virt_itogo;
                this.LastShiftItogo = face.last_shift_itogo;
                this.rating = face.rating;
            });

            this.ss.get_shiftuserbranch(this.id_user_vict, id_branch).subscribe((shift: Array<any>) => {

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

  onLoadFromBaseAvatar() {
    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {
      const S = aRes[0].avatar_name;
      if (S !== '""' && (S)) {
        if (typeof S !== 'undefined') {
          if (S.length > 0) {
            this.sAvatarPath = this.gr.sUrlAvatarGlobal + S;
          }
        }
      }
    });
  }

  graph() {
    //
    this.router.navigate(['/graph-laundry']);
  }

  calendar() {
    this.router.navigate(['/summary-laundry']);
  }
}
