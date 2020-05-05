import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services/shift.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import { LOCALE_ID } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-comment-laundry',
  templateUrl: './comment-laundry.component.html',
  styleUrls: ['./comment-laundry.component.css']
})
export class CommentLaundryComponent implements OnInit {

  currentDate: Date;
  sDate = '';
  id_user_vict = -1;

  constructor(private router: Router,
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
    }

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
}
