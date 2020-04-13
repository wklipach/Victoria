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

    // сначала проверяем IP и не даем войти если IP не совпадает



    const sUserOrEmail = this.loginForm.controls['nameOrEmail'].value;


    if (this.loginForm.controls['nameOrEmail'].value.toString().length < 3)  {
      this.sResTrouble = 'Слишком короткое имя входа.';
      return;
    }

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

        if (!value[0][0].id) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'Пользователь не найден.';
          this.authService.clearStorage();
          this.block_button(this.nStopMs);
          return;
        }

        // console.log('value[0]', value[0], value[0][0]['CountBranch']);

        if (value[0][0].CountBranch === 0) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'Дождитесь решения администратора.';
          this.authService.clearStorage();
          this.block_button(this.nStopMs);
          return;
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
            // если все верно ввели проверяем IP
            const id_branch1 = this.authService.getBranch(value[0][0].id);
            this.authService.getIpAddress(value[0][0].id, id_branch1).subscribe(valueIP => {
              console.log('valueIP', valueIP);
              if (!valueIP) {
                this.showErr = true;
                this.showSucc = false;
                this.sResTrouble = 'Вход под таким IP запрещен.';
                this.authService.clearStorage();
                this.block_button(this.nStopMs);
              }
              if (valueIP) {
                this.showErr = false;
                this.showSucc = true;
                this.sResTrouble = '';
                this.authService.setStorage(value[0][0].nick, true, value[0][0].id);
                // переходим на главную страницу
                console.log('');
                this.router.navigate(['/laundry']);
              }
            });
          } // if dbPassword === sFormPassword
        } // value[0].length === 1
        });

  }


}



