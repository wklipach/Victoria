import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {Calendar} from '@fullcalendar/core/Calendar';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {PaymentService} from '../services/payment.service';
import {ReportService} from '../services/report.service';
declare var jQuery: any;

@Component({
  selector: 'app-summary-laundry',
  templateUrl: './summary-laundry.component.html',
  styleUrls: ['./summary-laundry.component.css']
})
export class SummaryLaundryComponent implements OnInit, AfterViewInit {

  idUser = -1;
  id_user_vict = -1;
  resultPay: any;
  calendarEvents = [];


  calendarPlugins = [dayGridPlugin]; // important!

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent;
  @ViewChild('summaryLaundryModal') public summaryLaundryModal: ElementRef;

  public calendarApi: Calendar;
  weekDateBegin: Date;
  weekDateEnd: Date;
  weekUser = -1;
  weekBranch = -1;

  constructor(private router: Router,
              private authService: AuthService,
              private pay: PaymentService,
              private report: ReportService) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    this.id_user_vict = Res.id_user_vict;

  }


  ngAfterViewInit() {

    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.setOption('firstDay', 1);
    this.calendarApi.setOption('locale', 'ru');
    this.calendarApi.setOption('weekLabel', '№');
    this.calendarApi.setOption('weekNumbers', true);
    this.calendarApi.setOption('header', {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    });
    this.calendarApi.setOption('buttonText', {today: 'Сегодня'});

  }

  summary() {
    // this.calendarApi.getEvents().forEach(event => event.remove());
  }

   // находим дату с которой начинается первая неделя месяца
  beginCalendarDate(): Date {
      const curDateOffset = 24 * 60 * 60 * 1000;
      const myDate = new Date(this.calendarApi.getDate());
      myDate.setDate(1);
      myDate.setHours(0, 0, 0, 0);

      if (myDate.getDay() !== 1) {
        let dayCount = 6;
        if (myDate.getDay() !== 0) {
          dayCount = myDate.getDay() - 1;
        }
        const s =  myDate.getTime() - curDateOffset * (dayCount);
        myDate.setTime(s);
      }
      return myDate;
    }

   // находим дату которой заканчивается последняя неделя месяца
  endCalendarDate(): Date {
    const curDateOffset = 24 * 60 * 60 * 1000;
    const myDate = new Date(this.calendarApi.getDate());
    const endDay =  33 - new Date(myDate.getFullYear(), myDate.getMonth(), 33).getDate();
    myDate.setDate(endDay);
    myDate.setHours(23, 59, 59, 59);

    if (myDate.getDay() > 0) {
      const s =  myDate.getTime() + curDateOffset * (7 - myDate.getDay());
      myDate.setTime(s);
    }

    return myDate;
  }

  getInfoPayment(id_user: number, id_branch: number, date_begin: Date, date_end: Date) {
      this.pay.getPaymentVirtual(id_user, id_branch, date_begin.getTime(), date_end.getTime()).subscribe((pay_virtual) => {

       // берем новую дату и вычитаем из нее часовой пояс
       const curDate = new Date(date_begin);

        while (curDate <= date_end) {
                 const res_virtual = pay_virtual[0].filter((pv) => {
                  const s = new Date(pv.date_shift);
                  return s.getTime() === curDate.getTime();
                  });

                  if (res_virtual.length > 0) {
                   // заносим виртуальные данные
                    this.insert_virtual(res_virtual[0]);
                  }
            curDate.setDate(curDate.getDate() + 1);
        }
        this.LoadNewItog(id_user, id_branch, date_begin, date_end);
      });

  }


    insert_virtual(res_virtual) {

    const sec = res_virtual.exact_time;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec - h * 3600) / 60);

    const sPayDay = res_virtual.rounded_time * res_virtual.price_position + res_virtual.summa_add;

    const myEventVirtual = {title: sPayDay,
                            start: new Date(res_virtual.date_shift), end: new Date(res_virtual.date_shift),
                            allDay: true, backgroundColor: '#FFFACD',
                            extendedProps: {
                            payday: new Date(res_virtual.date_shift),
                            payhour: h + ':' + m,
                            paymentperhour: res_virtual.price_position,
                            paykoeff: 1,
                            payaddwork: res_virtual.summa_add,
                            itogo: sPayDay
      }

    };

      this.calendarEvents.push(myEventVirtual);
      // console.log('this.calendarEvents.push', myEventVirtual);
      // this.calendarApi.addEvent(myEventVirtual);
  }


  onChange() {
    if (this.calendarApi) {
      this.calendarEvents = [];
      // this.calendarApi.getEvents().forEach(event => event.remove());
      const date_begin = this.beginCalendarDate();
      const date_end = this.endCalendarDate();
      const id_branch = this.authService.getBranch(this.id_user_vict);
      this.getInfoPayment(this.id_user_vict, id_branch, date_begin, date_end);
      this.resultPay = undefined;
    }
  }

  myClick(info: any) {
    this.resultPay = info.event.extendedProps;
    jQuery(this.summaryLaundryModal.nativeElement).modal('show');
  }

  LoadNewItog(id_user: number, id_branch: number, date_begin, date_end) {
      this.weekDateBegin = date_begin;
      this.weekDateEnd = date_end;
      this.weekUser = id_user;
      this.weekBranch = id_branch;
    }

}
