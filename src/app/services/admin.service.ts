import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';

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

  // сведения о филиале по номеру филиала
  getBranchInfo (id_branch: number) {
    const params = new HttpParams()
      .set('get_branch_info', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});

  }

  // добавдяем новый филиал
  setBranch(id_city, newName) {
      const sUrl = this.gr.sUrlGlobal + 'admin';
      const data_branch = { 'id_city': id_city, 'insert_branch': newName };
      return this.http.post(sUrl, data_branch);
  }

  // добавдяем новую допработу
  setAddWork(newName, price) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_addwork = { 'insert_addwork': 'insert_addwork', 'name': newName, 'price': price };
    return this.http.post(sUrl, data_addwork);
  }

   // добавляем новый адрес доставки
  setAddress(newName, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_address = { 'insert_address': 'insert_address', 'name': newName, 'id_branch': id_branch };
    return this.http.post(sUrl, data_address);
  }

  // добавляем новую должность
  insertPosition(newName, newPrice, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_address = { 'insert_position': 'insert_position', 'name': newName, 'price': newPrice, 'id_branch': id_branch };
    return this.http.post(sUrl, data_address);
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
    if (id_user === 1) {
      return Observable.of(true);
    } else {
      const sUrl = this.gr.sUrlGlobal + 'admin';
      const data_branch = {'user_nick': 'user_nick', 'id_user': id_user, 'nick': nick};
      return this.http.post(sUrl, data_branch);
    }
  }

  getUniqueNick(id_user, nick) {
    const params = new HttpParams()
      .set('get_unique_nick', 'get_unique_nick')
      .set('id_user', id_user)
      .set('nick', nick);

    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});

  }

  setUpdateLinkBranchUser(id_user, mas_res) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'linkbranchuser': 'linkbranchuser', 'id_user': id_user,
                           'mas_res': mas_res};
    return this.http.post(sUrl, data_branch);
  }


  // изменяем имя филиала
  setBranchName(id, newName) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_branch = { 'id_update': id, 'insert_branch_name': newName };
    return this.http.post(sUrl, data_branch);
  }

// изменяем допуслугу
  setChangeAddWork(id, newName, newPrice) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_addwork = { 'update_addwork': 'update_addwork', 'id': id, 'work_name': newName, 'price': newPrice};
    return this.http.post(sUrl, data_addwork);
  }

  // изменяем адрес доставки
  setChangeAddress(id_address, address, id_branch) {
     const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_address = { 'update_address': 'update_address', 'id_address': id_address, 'address': address, 'id_branch': id_branch};
    return this.http.post(sUrl, data_address);
  }

  // изменяем должность
  setChangePosition(id, name, price, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_position = { 'update_position': 'update_position', 'id': id, 'name': name, 'price': price, 'id_branch': id_branch};
    return this.http.post(sUrl, data_position);
  }

  // удаляем допуслугу
  setAddWorkDelete(id) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_addwork = { 'id_addwork_delete': id };
    return this.http.post(sUrl, data_addwork);
  }

  // удаляем адрес доставки
  setAddressDelete(id_address) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_address = { 'id_address_delete': id_address};
    return this.http.post(sUrl, data_address);
  }


  // удаляем адрес должность
  setPositionDelete(id) {
    const sUrl = this.gr.sUrlGlobal + 'admin';
    const data_position = { 'id_position_delete': id};
    return this.http.post(sUrl, data_position);
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

  getBranchUser(id_user) {
    const params = new HttpParams()
      .set('get_branch_user', 'get_branch_user')
      .set('id_user', id_user);
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

  getPosition(id_branch) {
    const params = new HttpParams()
      .set('get_position', 'get_position')
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

}
