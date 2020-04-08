import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  // получаем полный список филиалов
   getBranch(id_city) {
    const params = new HttpParams()
      .set('get_branch', 'get_branch')
      .set('id_city', id_city);
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

  // добавдяем новый филиал
  setBranch(id_city, newName) {
      const sUrl = this.gr.sUrlGlobal + 'admin';
      const data_branch = { 'id_city': id_city, 'insert_branch': newName };
      return this.http.post(sUrl, data_branch);
  }

  // разрушаем связь филиала и юзера
  setDeleteUserBranch(id_user, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'userbranch_delete': 'userbranch_delete', 'id_user': id_user, 'id_branch': id_branch};
    return this.http.post(sUrl, data_branch);
  }

  setDeleteUserFull(id_user) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'user_delete': 'user_delete', 'id_user': id_user};
    return this.http.post(sUrl, data_branch);
  }

  setUpdateNickNane(id_user, nick) {

    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'user_nick': 'user_nick', 'id_user': id_user, 'nick': nick};
    return this.http.post(sUrl, data_branch);
  }

  setUpdateLinkBranchUser(id_user, chbranch, ip, checkIP) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'linkbranchuser': 'linkbranchuser', 'id_user': id_user, 'chbranch': chbranch, 'ip': ip, 'checkIP' : checkIP};
    return this.http.post(sUrl, data_branch);
  }


  // изменяем имя филиала
  setBranchName(id, newName) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'id_update': id, 'insert_branch_name': newName };
    return this.http.post(sUrl, data_branch);
  }

  // удаляем филиал
  setBranchDelete(id) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'id_branch_delete': id };
    return this.http.post(sUrl, data_branch);
  }

  // получаем полный список филиалов
  getUsers(id_branch) {
    const params = new HttpParams()
      .set('get_users', 'get_users')
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

  getBranchUser(id_user, id_branch) {
    const params = new HttpParams()
      .set('get_branch_user', 'get_branch_user')
      .set('id_user', id_user)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

}
