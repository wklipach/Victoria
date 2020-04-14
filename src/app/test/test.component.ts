import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() {
    this.clickPage(1);
  }

  ngOnInit(): void {
  }

  clickPage($event: number) {
    console.log('$event', $event);
  }
}
