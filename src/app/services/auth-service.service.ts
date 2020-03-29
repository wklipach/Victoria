import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserType} from '../class/UserType';
import {Observable, Subject} from 'rxjs';
import {GlobalRef} from './globalref';

@Injectable()
export class AuthService {

  // private http: HttpClient, private gr: GlobalRef
  constructor(private http: HttpClient, public gr: GlobalRef) {

  }

  // заносим текущего пользователя в локальное хранилище
  public setStorage(victUserName: string, bVictConnected: boolean, id_user_vict: number) {
    window.localStorage.setItem('victUserName', victUserName);
    window.localStorage.setItem('bVictConnected', JSON.stringify(bVictConnected));
    window.localStorage.setItem('id_user_vict', JSON.stringify(id_user_vict));
  }

  // стираем текущего пользователя из локального хранилища
  public clearStorage() {
     window.localStorage.setItem('victUserName', '');
     window.localStorage.setItem('bVictConnected', JSON.stringify(false));
     window.localStorage.setItem('id_user_vict', JSON.stringify(-1));
  }


  // получаем текущего пользователя из хранилища
  public loginStorage(): {victUserName: string; bVictConnected: boolean; id_user_vict: number} {

    let victUserName = '';
    if (window.localStorage.getItem('victUserName')) {
    victUserName = window.localStorage.getItem('victUserName');
  }

  let bVictConnected = false;
  if (window.localStorage.getItem('bVictConnected')) {
    bVictConnected = JSON.parse(window.localStorage.getItem('bVictConnected'));
  }

  let id_user_vict = -1;
  if (window.localStorage.getItem('id_user_vict')) {
    id_user_vict = JSON.parse(window.localStorage.getItem('id_user_vict'));
  }

  const Res = {victUserName: victUserName, bVictConnected: bVictConnected, id_user_vict: id_user_vict};
  console.log('в сервисе', Res);
  return Res;
  }

  // получаем пользователя и зашифрованные пароли из базы
  getUserFromBase(UserName: string) {
     const params = new HttpParams()
      .set('get_user', UserName.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  // получаем пользователя по почтовому адресу
  getEmailUserTable(email: string) {
    const params = new HttpParams()
      .set('get_email_user', email.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  getNickUserTable(nick: string) {
    const params = new HttpParams()
      .set('get_nick_user', nick.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  setNewUser(NewUser, curSubject, curLetter) {
      // вставить запрос по добавлению пользователя в базу
      const user = { newuser : NewUser, subject: curSubject, letter: curLetter};
      return this.http.post(this.gr.sUrlGlobal + 'users', user);
  }

////

}
