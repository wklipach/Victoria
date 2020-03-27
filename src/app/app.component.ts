import { Component } from '@angular/core';
import * as $ from 'jquery';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    console.log(environment.production); // Logs false for default environment
  }


  testing() {
    console.log('!!!', $.fn.jquery);
  }

}

