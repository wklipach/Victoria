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


}
