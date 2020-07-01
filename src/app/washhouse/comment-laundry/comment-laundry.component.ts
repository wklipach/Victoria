import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {DatePipe} from '@angular/common';
import {CommentService} from '../services/comment.service';
import {FormControl, FormGroup} from '@angular/forms';

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
  intTypeMessage = 1;

  commentLaundryForm: FormGroup;

  constructor(private router: Router,
              private cs: CommentService,
              private authService: AuthService) {
              this.commentLaundryForm  = new FormGroup({});
  }

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
        // this.intTypeMessage = this.commentLaundryForm.controls['checkMessage'].value;
        this.loadDateType(this.intTypeMessage);
      }
    });

  }


  // в зависимости от чек-переключателя выводим письма или инструкции
  loadDateType(int_message) {
    // письма
    if (int_message.toString() === '1') {
      this.loadDateMessage(this.id_user_vict, this.id_branch_vict, this.id_position_from);
    }

    if (int_message.toString() === '2') {
      this.loadDateInstruction(this.id_user_vict, this.id_branch_vict, this.id_position_from);
    }
  }

  loadDateInstruction(id_user, id_branch, id_position) {
    this.cs.getInstructionList(id_user, id_branch, id_position).subscribe((value: Array<any>) => {
      const arrLine = [];
      value[0].forEach((elem, ih) => {
        const dPipe = new DatePipe('ru'), date_from = dPipe.transform(elem.date_from, 'dd.MM.yyyy   HH.mm');
        const n = arrLine.push({id: elem.id, sFrom: elem.position_name, sDate: date_from,
          sSituationLittle: elem.little_situation,
          sSituationSumma: elem.summa, unread: elem.unread, InputOutput: elem.InputOutput, apply: 0});
      });

      this.arrLine = arrLine;

    });
  }

  loadDateMessage(id_user, id_branch, id_position) {
    const Res = this.getMonthBounds(this.currentDate);
    const dateBegin = Res[0];
    const dateEnd = Res[1];
    this.cs.getMessageList(id_user, id_branch, id_position, dateBegin, dateEnd).subscribe((value: Array<any>) => {

      const arrLine = [];
      value[0].forEach((elem, ih) => {
        const dPipe = new DatePipe('ru'), date_from = dPipe.transform(elem.date_from, 'dd.MM.yyyy   HH.mm');
        const n = arrLine.push({id: elem.id, sFrom: elem.position_name, sDate: date_from,
                  sSituationLittle: elem.little_situation, sSituationSumma: elem.summa, unread: elem.unread,
                  InputOutput: elem.InputOutput, apply: 0});
      });

      this.arrLine = arrLine;

      // console.log('this.arrLine', this.arrLine);

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
    this.loadDateType(this.intTypeMessage);
  }

  onRight() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      const dPipe = new DatePipe('ru');
      this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');
    this.loadDateType(this.intTypeMessage);
  }

  onNow() {
    this.currentDate = new Date();
    const dPipe = new DatePipe('ru');
    this.sDate = dPipe.transform(this.currentDate, ' LLLL, yyyy');
    this.loadDateType(this.intTypeMessage);
  }

  createNewMessage() {
    this.router.navigate(['/comment-new']);
  }

/*
onClickCheck() {
    this.intTypeMessage = this.commentLaundryForm.controls['checkMessage'].value;
    this.loadDateType(this.intTypeMessage);
  }
 */
}
