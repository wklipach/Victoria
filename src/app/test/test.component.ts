import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, AfterViewInit  {

  idUser = -1;

  calendarPlugins = [dayGridPlugin]; // important!

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent;

  constructor() {

  }

  ngOnInit(): void {
    // вначале берем текущего
    this.idUser = 1;
  }

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('firstDay', 1);
    calendarApi.setOption('locale', 'ru');
    calendarApi.setOption('header', {
        left: 'prev,next, today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    });
    calendarApi.setOption('buttonText', {today: 'Сегодня'});
//    calendarApi.next();

  }

}
