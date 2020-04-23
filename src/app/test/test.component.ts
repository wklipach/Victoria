import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from '@fullcalendar/angular';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, AfterViewInit  {

  option: Object;

  calendarPlugins = [dayGridPlugin]; // important!

  // plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent;

  constructor() {

  }


  someMethod() {
//    const calendarApi = this.calendarComponent.getApi();
//    calendarApi.setOption('firstDay', 1);
//    calendarApi.next();
  }

  ngOnInit(): void {
    // calendarApi.next();
  }

  ngAfterViewInit(){
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('firstDay', 1);
    calendarApi.setOption('locale', 'ru');

    calendarApi.setOption('header', {
        left: 'prev,next, today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    });

    calendarApi.setOption('buttonText', {today: 'Сегодня'});


  }

}
