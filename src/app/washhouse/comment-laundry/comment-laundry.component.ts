import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services/shift.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import { LOCALE_ID } from '@angular/core';
import {DatePipe} from '@angular/common';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-comment-laundry',
  templateUrl: './comment-laundry.component.html',
  styleUrls: ['./comment-laundry.component.css']
})
export class CommentLaundryComponent implements OnInit {

  currentDate: Date;
  sDate = '';
  id_user_vict = -1;
  id_branch_vict = -1;
  id_position_from = -1;
  arrLine = [];

  constructor(private router: Router,
              private cs: CommentService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.currentDate = new Date();
    const dPipe = new DatePipe('ru');
    this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');


    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
      this.id_branch_vict = Res.id_branch_vict;
    }

    this.cs.getPositionUser(this.id_user_vict, this.id_branch_vict).subscribe(value => {
      if (value[0]) {
        this.id_position_from = value[0].id_position;
        this.loadDate(this.id_user_vict, this.id_branch_vict, this.id_position_from);
      }
    });


  }

  loadDate(id_user, id_branch, id_position) {
    const Res = this.getMonthBounds(this.currentDate);
    const dateBegin = Res[0];
    const dateEnd = Res[1];
    this.cs.getMessageList(id_user, id_branch, id_position, dateBegin, dateEnd).subscribe((value: Array<any>) => {
      const arrLine = [];
      value[0].forEach((elem, ih) => {
        const dPipe = new DatePipe('ru'), date_from = dPipe.transform(elem.date_from, 'dd.MM.yyyy   HH.mm');
        const n = arrLine.push({id: elem.id, sFrom: elem.position_name, sDate: date_from,
                  sSituationLittle: elem.little_situation, sSituationSumma: elem.summa});
      });

      this.arrLine = arrLine;

//      InputOutput: 0
//      date_from: "2020-05-06T11:55:19.000Z"
//      id: 12
//      id_position: 1
//      elem.little_situation: "ситуация 3"
//      position_name: "прачка"
//      summa: 200
//      arrLine

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


  onLeft() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    const dPipe = new DatePipe('ru');
    this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');
  }

  onRight() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      const dPipe = new DatePipe('ru');
      this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');
  }

  onNow() {
    this.currentDate = new Date();
    const dPipe = new DatePipe('ru');
    this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');
  }

  createNewMessage() {
    this.router.navigate(['/comment-new']);
  }
}
