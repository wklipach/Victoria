import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-laundry-face-week',
  templateUrl: './laundry-face-week.component.html',
  styleUrls: ['./laundry-face-week.component.css']
})
export class LaundryFaceWeekComponent implements OnInit, OnChanges {

  @Input() titleShiftDate: Date;
  @Input() masInputFace = {db: '', de: '', productivity: 0, rounded_time: '', exact_time: '',
                           virtual_basic: 0, virt_addwork: 0, virt_itogo: 0,
                           last_shift_itogo: 0, rating: 0};
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

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.titleDB = this.masInputFace.db;
    this.titleDE = this.masInputFace.de;
    this.Productivity = this.masInputFace.productivity;
    this.RoundedTime = this.masInputFace.rounded_time;
    this.ExactTime = this.masInputFace.exact_time;
    this.VirtualBasicPayment = this.masInputFace.virtual_basic;
    this.VirtualAddwork = this.masInputFace.virt_addwork;
    this.VirtItogo  = this.masInputFace.virt_itogo;
    this.LastShiftItogo = this.masInputFace.last_shift_itogo;
    this.rating = this.masInputFace.rating;

  }


  ngOnInit(): void {


  }

}
