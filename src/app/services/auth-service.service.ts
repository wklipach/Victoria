import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  // private http: HttpClient, private gr: GlobalRef
  constructor(private http: HttpClient, public gr: GlobalRef) {

  }

  public setAddressShipment (id_address_vict: number) {
    window.localStorage.setItem('id_address_vict', JSON.stringify(id_address_vict));
  }

  getAddressShipment () {
    if (window.localStorage.getItem('id_address_vict')) {
      return JSON.parse(window.localStorage.getItem('id_address_vict'));
    } else {
      return -1;
    }
  }

// заносим текущего пользователя в локальное хранилище
  public setStorage(victUserName: string, bVictConnected: boolean, id_user_vict: number, id_branch_vict: number, editor: number) {
    window.localStorage.setItem('victUserName', victUserName);
    window.localStorage.setItem('bVictConnected', JSON.stringify(bVictConnected));
    window.localStorage.setItem('id_user_vict', JSON.stringify(id_user_vict));
    window.localStorage.setItem('id_branch_vict', JSON.stringify(id_branch_vict));
    window.localStorage.setItem('editor', JSON.stringify(editor));
  }

  // стираем текущего пользователя из локального хранилища
  public clearStorage() {
     window.localStorage.setItem('victUserName', '');
     window.localStorage.setItem('bVictConnected', JSON.stringify(false));
     window.localStorage.setItem('id_user_vict', JSON.stringify(-1));
     window.localStorage.setItem('bShiftBegin', JSON.stringify(false));
     window.localStorage.setItem('id_branch_vict', JSON.stringify(-1));
    window.localStorage.setItem('editor', JSON.stringify(-1));
  }


  // получаем текущего пользователя из хранилища
  public loginStorage(): {victUserName: string; bVictConnected: boolean; id_user_vict: number; id_branch_vict: number} {

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

   let id_branch_vict = -1;
    if (window.localStorage.getItem('id_branch_vict')) {
      id_branch_vict = JSON.parse(window.localStorage.getItem('id_branch_vict'));
    }

  return {victUserName: victUserName, bVictConnected: bVictConnected, id_user_vict: id_user_vict, id_branch_vict: id_branch_vict};
  }

  getBranch (id_user_vict: number) {
    if (window.localStorage.getItem('id_branch_vict')) {
      return JSON.parse(window.localStorage.getItem('id_branch_vict'));
    } else {
      return -1;
    }
  }

   getEditorStorage() {
     if (window.localStorage.getItem('editor')) {
        return  JSON.parse(window.localStorage.getItem('editor'));
      } else  {
        return -1;
      }
   }

  getItIsAdmin(id_user) {
    let ed = 0;
    let bAdmin = false;
    if (window.localStorage.getItem('editor')) {
      ed = JSON.parse(window.localStorage.getItem('editor'));
    }
    if (ed.toString() === '1'.toString()) {
      bAdmin = true;
    }
    return Observable.of(bAdmin);
  }

  // получаем пользователя, поиск по 2 полям - его почте и нику одновременно
  getUserLink(id_user) {
    const params = new HttpParams()
      .set('get_user_link', 'get_user_link')
      .set('id_user', id_user);
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }



  // получаем пользователя, поиск по 2 полям - его почте и нику одновременно
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

  getIpAddress(id_user, id_branch) {
    const params = new HttpParams()
      .set('get_ip_arrress', 'get_ip_arrress')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }


  getIpEasy(ip) {
    const params = new HttpParams()
      .set('get_ip_easy', 'get_ip_easy')
      .set('ip', ip);
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  getUserFromId(id_user) {
    const params = new HttpParams()
      .set('get_id_user', id_user.toString());
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

  updateAvatarUserTable(curAvatar: any, id_user: number) {
    const data_avatar = { 'avatar': curAvatar, 'id_user' : id_user};
    return this.http.post(this.gr.sUrlGlobal + 'users', data_avatar);
  }

  updateImageMessageTable(curMessage: any, ext: string, id_message: number, id_prefix) {
    const data_message = {'message_image': curMessage, 'id_message' : id_message, 'id_prefix': id_prefix, 'ext': ext};
    return this.http.post(this.gr.sUrlGlobal + 'users', data_message);
  }


  updatePassword(password: string, id_user: number) {
    const update_password = { 'update_password': password, 'id_user' : id_user};
    return this.http.post(this.gr.sUrlGlobal + 'users', update_password);
  }

  updateUser(postUser, id_user: number) {
    const update_user = { 'post_user': postUser, 'id_user' : id_user};
    return this.http.post(this.gr.sUrlGlobal + 'users', update_user);
  }

  clearAvatarUserTable(id_user: number) {
    const data_avatar = { 'clear_avatar': 'clear_avatar', 'id_user' : id_user};
    return this.http.post(this.gr.sUrlGlobal + 'users', data_avatar);
  }
////
   getCheckEmailWithoutCurrentUser(email: string, id_user: number) {
     const params = new HttpParams()
       .set('email_without_user', email)
        .set('email_without_iduser', id_user.toString());
     return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
   }

  getBranchName(id_branch) {
    const params = new HttpParams()
      .set('branch_name', 'branch_name')
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});

  }

}
