import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserTable} from '../../class/UserTable';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {timer} from 'rxjs';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  nStopMs = 1000;
  bConnected = false;
  public showErr = false;
  public showSucc = false;
  public sResTrouble = '';
  public stopCondition = false;
  private subscribeTimer:  Subscription;

  public loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

  this.loginForm  = new FormGroup({
      'nameOrEmail': new FormControl('',
        [Validators.required, Validators.minLength(3)]),
      'password': new FormControl('',
        [Validators.required])
    });



  }


  ngOnInit() {

 //   const Res =  this.authService.loginStorage();
//    console.log('a1', Res);
//    this.bConnected = Res.bVictConnected;
//    if (this.bConnected) {
//      this.router.navigate(['/']);
// 6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918 - это 12
//    const encrypted = CryptoJS.SHA256('12');
//    console.log('encrypted', encrypted.toString());

  }

  ngOnDestroy() {
  if (typeof this.subscribeTimer !== 'undefined') {
    this.subscribeTimer.unsubscribe();
  }
  }


  block_button(ms: number) {
    // блокируем кнопку 1 секунду
    this.stopCondition = true;
    this.subscribeTimer = timer(ms).subscribe(() =>
      this.stopCondition = false);
  }


  submit() {

    const sUserOrEmail = this.loginForm.controls['nameOrEmail'].value;

    console.log('a1', sUserOrEmail);

    const sPassword = this.loginForm.controls['password'].value;
    const tUser =  {sUserOrEmail: this.loginForm.controls['nameOrEmail'].value, sPassword: this.loginForm.controls['password'].value};

    this.authService.getUserFromBase(sUserOrEmail).subscribe(
      (value: Array<any>) => {

        if (value[0].length > 1) {
        this.showErr = true;
          this.showSucc = false;
        this.sResTrouble = 'С такими данными больше одного пользователя.';
        this.authService.clearStorage();
        this.block_button(this.nStopMs);
        }

        if (value[0].length === 0) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'Пользователь не найден.';
          this.authService.clearStorage();
          this.block_button(this.nStopMs);
        }

        if (value[0].length === 1) {

          const dbPassword = value[0][0].password;
          const sFormPassword = CryptoJS.SHA256(this.loginForm.controls['password'].value).toString();
          if (dbPassword !== sFormPassword) {
            this.showErr = true;
            this.showSucc = false;
            this.sResTrouble = 'Вы неверно ввели пароль.';
            this.authService.clearStorage();
            this.block_button(this.nStopMs);
          }

          if (dbPassword === sFormPassword) {
            this.showErr = false;
            this.showSucc = true;
            this.sResTrouble = '';
            this.authService.setStorage(value[0][0].nick, true, value[0][0].id);
            // куда-то там переходим
            this.router.navigate(['/laundry']);
          }

        }
    });

  }


}



