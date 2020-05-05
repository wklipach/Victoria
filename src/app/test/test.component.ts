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


  constructor() {

  }

  ngOnInit(): void {
    // вначале берем текущего
    this.idUser = 1;
  }

  ngAfterViewInit() {

  }

}
