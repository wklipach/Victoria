import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserTable} from '../../class/UserTable';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {UserType} from '../../class/UserType';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bPassword = false;
  myForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

    this.myForm  = new FormGroup({
      'userName': new FormControl('', [Validators.required, Validators.minLength(3)], [this.userNameAsyncValidator.bind(this)]
      ),

      'userEmail': new FormControl(null, [
          Validators.required,
          Validators.email
        ], [this.userEmailAsyncValidator.bind(this)]
      ),
      'userPassword1': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'userPassword2': new FormControl('', [Validators.required, Validators.minLength(2)], [this.password2AsyncValidator.bind(this)])
    });

  }

  ngOnInit(): void {
  }

  // валидатор по имени пользователя
  userNameAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.authService.getNickUserTable(control.value).subscribe(
          (data: Array<UserTable>) => {
            if (data.length > 0) {
              resolve( {'myError': true});
            }   else {
              resolve(null);
            }
          }
        );
      }
    );
  }

  // валидатор по EMail
  userEmailAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.authService.getEmailUserTable(control.value).subscribe(
          (data: Array<UserTable>) => {
            if (data.length > 0) {
              resolve( {'errorEmailExists': true});
            } else {
              resolve(null);
            }
          }
        );
      }
    );
  }

  // валидатор по паролю
  password2AsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {
        if (this.myForm.controls['userPassword1'].value !== control.value) {
          resolve( {'myError': true});
        } else {
          resolve(null);
        }
      }
    );
  }

  submit() {
    this.bPassword = false;

    const {userName, userEmail, userPassword1, userPassword2} = this.myForm.value;

    if (userPassword1.trim() !== userPassword2.trim()) {
      this.bPassword = true;
      return -1;
    }

    const NewUser = new UserTable;
    NewUser.id = -1;
    NewUser.nick = userName;
    NewUser.password = CryptoJS.SHA256(userPassword1.trim().toLowerCase()).toString().toLowerCase();
    NewUser.email = userEmail;
    NewUser.surname = '';
    NewUser.name = '';
    NewUser.patronymic = '';
    NewUser.datebirth = null;
    NewUser.address = '';
    NewUser.phone1 = '';
    NewUser.phone2 = '';
    NewUser.avatar_name = '';
    NewUser.comment = '';
    NewUser.bitdelete = false;

    const curSubject = 'Добро пожаловать.';
    const curLetter = 'Спасибо за регистрацию. Надеемся, что вы найдете здесь решение ваших вопросов.';

    return this.authService.setNewUser(NewUser, curSubject, curLetter).subscribe((value) => {
          this.authService.setStorage(value[0][0].nick, true, value[0][0].id);
          this.router.navigate(['/login']);
        });
  }


  chec() {
    console.log(this.myForm);
  }
}
