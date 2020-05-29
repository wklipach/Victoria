import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ShiftService} from '../../services/shift.service';
import {ReportService} from '../services/report.service';
import {GlobalRef} from '../../services/globalref';
import {CommentService} from '../services/comment.service';
declare var jQuery: any;

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit, AfterViewChecked {


  titleShiftDate: Date;
  titleShift = '';
  id_user_vict = -1;
  id_branch_vict = -1;
  userName = '';
  userSurname = '';
  sEndShift = 'Закончить смену';
  sBeginShift = 'Начать смену';

  public sAvatarPath  = '';
  unreadMessageCount = 0;
  BranchName = '';
  masInputFace = {db: '', de: '', productivity: 0, rounded_time: '', exact_time: '',
                  virtual_basic: 0, virt_addwork: 0, virt_itogo: 0,
                  last_shift_itogo: 0, rating: 0};

  sErrorPageAccess = '';

  showCalender = false;
  showGraph = false;
  showPie = false;
  booleanNowGraph = false;
  booleanNowCalendar = false;
  booleanNowPie = false;


  constructor(private router: Router, private authService: AuthService,
                                      private cs: CommentService,
                                      private repserv: ReportService,
                                      private gr: GlobalRef,
                                      private ss: ShiftService) {

    this.sErrorPageAccess = '';
    if (this.router.getCurrentNavigation()) {
      if (this.router.getCurrentNavigation().extras) {
        if (this.router.getCurrentNavigation().extras.state) {
          if (this.router.getCurrentNavigation().extras.state['errorPageAccess']) {
            this.sErrorPageAccess = this.router.getCurrentNavigation().extras.state['errorPageAccess'];
          }
        }
      }
    }

    this.titleShift = 'Начать смену';
  }

  ngAfterViewChecked() {
    if (this.booleanNowGraph) {
      this.booleanNowGraph = false;
      const graphEl = document.getElementById('collapseGraph');
      setTimeout(() =>
        graphEl.scrollIntoView(), 500);
    }

    if (this.booleanNowCalendar) {
      this.booleanNowCalendar = false;
      const calendarEl = document.getElementById('collapseCalendar');
      setTimeout(() =>
        calendarEl.scrollIntoView(), 500);
    }

  }


  ngOnInit(): void {

    if (this.router.getCurrentNavigation()) {
      console.log(this.router.getCurrentNavigation().extras);
    }


    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
      this.id_branch_vict = Res.id_branch_vict;
    }

    this.loadInfo();
    this.onLoadFromBaseAvatar();

    const ResCountDate = this.getMonthBounds(new Date());

    this.cs.getMessageUnreadCount(this.id_user_vict, Res.id_branch_vict, ResCountDate[0], ResCountDate[1]).subscribe( value => {
      this.unreadMessageCount = value[0][0].unread_message;
    });

    this.authService.getBranchName(Res.id_branch_vict).subscribe(
      value => {

        if (!value) {
          return;
        }

        if (!value[0]) {
          return;
        }

        if (!value[0].name) {
          return;
        }

        this.BranchName = value[0].name;
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

    this.sErrorPageAccess = '';

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


              this.ss.get_shiftuserbranch(this.id_user_vict, id_branch).subscribe((shift: Array<any>) => {

                if (shift.length > 0) {
                  this.titleShiftDate = shift[0].date_begin;
                  this.titleShift = this.sEndShift;
                  ShiftService.setShift(true);
                } else {
                  this.titleShift = this.sBeginShift;
                  ShiftService.setShift(false);
                }

                this.masInputFace.db = face.db;
                this.masInputFace.de = face.de;
                this.masInputFace.productivity = face.productivity;
                this.masInputFace.rounded_time = face.rounded_time;
                this.masInputFace.exact_time = face.exact_time;
                this.masInputFace.virtual_basic = face.virtual_basic;
                this.masInputFace.virt_addwork = face.virt_addwork;
                this.masInputFace.virt_itogo  = face.virt_itogo;
                this.masInputFace.last_shift_itogo = face.last_shift_itogo;
                this.masInputFace.rating = face.rating;

              });

            });



      });
  }

  onLoadFromBaseAvatar() {
    console.log('laundry', 'onLoadFromBaseAvatar');
    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {

      if (!aRes) {
        return;
      }

      if (!aRes[0]) {
        return;
      }

      if (!aRes[0].avatar_name) {
        return;
      }

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


  pie() {
    this.showPie = !this.showPie;
    if (this.showPie) {
      this.booleanNowPie = true;
    }
  }


  graph() {
     this.showGraph = !this.showGraph;
     if (this.showGraph) {
       this.booleanNowGraph = true;
    }
  }

    calendar() {
     this.showCalender =  !this.showCalender;
     if (this.showCalender) {
        this.booleanNowCalendar = true;
     }
   }

  onNavigateUnreadMessage() {
    // смотрим что последнее непрочитанное - инструкция или письмо, к тому и переходим
   this.cs.getLastUnreadMessage(this.id_user_vict, this.id_branch_vict).subscribe( value => {
    if (value) {
       if (value[0][0].result_response.toString() === '3') {
         this.router.navigate(['/biblio-laundry']);
       }

      if (value[0][0].result_response.toString() !== '3') {
        this.router.navigate(['/comment-laundry']);
      }
    }
   });
  }
}
