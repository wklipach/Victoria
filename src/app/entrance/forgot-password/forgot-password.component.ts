import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';
import {UserTable} from '../../class/UserTable';
import {AuthService} from '../../services/auth-service.service';
import {ForgotpasswordService} from '../../services/forgotpassword.service';
import * as CryptoJS from 'crypto-js';
import {timer} from 'rxjs/observable/timer';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotForm: FormGroup;

  public showSucc = false;
  public showErr = false;
  public showErrMany = false;
  public stopCondition = false;
  public errorSend = '';
  public sErrSend = '';

  subscribeTimer: Subscription;

  constructor(private authService: AuthService, private fps: ForgotpasswordService) {

    this.forgotForm  = new FormGroup({
      'nameOrEmail': new FormControl('',
        [Validators.required, Validators.minLength(2)]
      )
    });

    this.forgotForm.get('nameOrEmail').valueChanges.subscribe(
      value => {

        this.showErrMany = false;
        this.showErr = false;
        this.errorSend = '';
        // console.log(value);
        }
    );


  }


  ngOnInit() {

    this.sErrSend = 'Ошибка отправки почты';
  }

  ngOnDestroy() {
    if (typeof this.subscribeTimer !== 'undefined') {
      this.subscribeTimer.unsubscribe();
    }
  }



  submit()  {
    const sUserOrEmail = this.forgotForm.controls['nameOrEmail'].value;


    this.authService.getUserFromBase(sUserOrEmail).subscribe((value: Array<any>) => {

        if (value[0].length === 1) {
          this.showSucc = false;
          this.showErr = false;
          this.showErrMany = false;
          const newpwd =  this.randomPass(12, true, '', true);

          const hash = CryptoJS.SHA256(newpwd.trim().toLowerCase()).toString().toLowerCase();
          // console.log('newpwd', newpwd, 'hash', hash);
          const email = value[0][0].email;

          if (!email) {
            this.showSucc = false;
            this.showErr = true;
            return;
          }

          this.fps.sendPassword(email, newpwd, hash).subscribe(
            mailValue => {
              // console.log('mailValue', mailValue);

              if (mailValue === 'error send') {
                this.errorSend = this.sErrSend; // 'Ошибка отправки почты';
                this.showSucc = false;
                this.showErr = false;
                this.showErrMany = false;
              } else {
                  this.showSucc = true;
                  this.showErr = false;
                  this.showErrMany = false;
                  this.errorSend = '';
              }

              this.Block1Sec();

            });

        }

        if (value[0].length === 0) {
          this.showSucc = false;
          this.showErrMany = false;
          this.showErr = true;
          this.Block1Sec();
        }

      if (value[0].length > 1) {
        this.showSucc = false;
        this.showErrMany = true;
        this.showErr = false;
        this.Block1Sec();
      }

    });

  } // end submit()


  Block1Sec() {
    // блокируем кнопку 1 секунда
    this.stopCondition = true;
    this.subscribeTimer =  timer(1000).subscribe(() =>
      this.stopCondition = false );
  }


  randomPass (length: number, addUpper: boolean, addSymbols, addNums: boolean) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = addUpper ? lower.toUpperCase() : '';
    const nums = addNums ? '0123456789' : '';
    const symbols = addSymbols ? '!#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' : '';

    const all = lower + upper + nums + symbols;
    while (true) {
      let pass = '';
      for (let i = 0; i < length; i++) {
        // tslint:disable-next-line:no-bitwise
        pass += all[ Math.random() * all.length | 0];
      }

      // criteria:
      if (!/[a-z]/.test(pass)) {continue; } // lowercase is a must
      if (addUpper && !/[A-Z]/.test(pass)) {continue; }  // check uppercase
      if (addSymbols && !/\W/.test(pass)) {continue; }  // check symbols
      if (addNums && !/\d/.test(pass)) {continue; }  // check nums

      return pass; // all good
    }
  }

}
