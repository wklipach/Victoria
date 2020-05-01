import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserTable} from '../../class/UserTable';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {timer} from 'rxjs';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth-service.service';
import {AdminService} from '../../services/admin.service';
import {BranchSelectionComponent} from '../branch-selection/branch-selection.component';


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
  selector_id_user = -1;
  selector_nick = '';
  arrayBranch: Array<any>;

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

            // показываем бранчи и тормозим до выбора
            this.authService.getUserLink(value[0][0].id).subscribe((valueBranchUser: Array<any>) => {
              if (valueBranchUser.length > 1) {
                // это покажет компонент, из которого сработает событие выбора филиала
                 this.selector_id_user = value[0][0].id;
                 this.selector_nick = value[0][0].nick;
                 this.arrayBranch = valueBranchUser;

              } else {
                 this.accessIP(valueBranchUser[0].id_branch,
                               value[0][0].id,
                               valueBranchUser[0].ip,
                               Boolean(valueBranchUser[0].check_ip.data[0]),
                               value[0][0].nick);
              }
            });

          } // if dbPassword === sFormPassword
        } // value[0].length === 1
    });
  }


  accessIP (id_branch, id_user, ip, checkIP, nick) {
    // если все верно ввели проверяем IP

    // если не надо проыерять IP
    if (checkIP === false) {
      console.log('не проверяем checkIP', checkIP);
      this.successLogin (nick, id_user, id_branch);
      return;
    }

    console.log('проверяем checkIP', checkIP);

      // иначе проверяеm IP
      this.authService.getIpEasy(ip).subscribe(valueIP => {
        if (valueIP === false) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'Войдите с разрешенного IP-адреса.';
          this.authService.clearStorage();
          this.block_button(this.nStopMs);
        }
        if (valueIP) {
          this.successLogin (nick, id_user, id_branch);
        }
      });
    }


  // успешный вход
  successLogin (nick, id_user, id_branch) {
    this.showErr = false;
    this.showSucc = true;
    this.sResTrouble = '';
    console.log('записали в хранилище', nick, true, id_user, id_branch)
    this.authService.setStorage(nick, true, id_user, id_branch);
    // переходим на главную страницу
    this.router.navigate(['/laundry']);
  }

  getBranchMessage(res: any) {
    this.accessIP(res.id_branch, this.selector_id_user, res.ip, Boolean(res.check_ip.data[0]), this.selector_nick);

  }
}



