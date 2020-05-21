import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, AfterViewInit {

  dataPie = [];

  i = 10;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  cfG() {
    const f = [];
    f.push(['Work', 11]);
    f.push(['Eat', 2]);
    f.push(['Commute', 2]);
    f.push(['Watch TV', 2]);
    this.dataPie = f;
  }

  cfG2() {
    this.i = this.i + 1;
    const r = [this.i.toString(), this.i];
    const f = this.dataPie;
    f.push(r);
    this.dataPie = f;
  }
}
