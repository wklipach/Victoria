import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  // получаем полный список филиалов
   getBranch() {
    const params = new HttpParams()
      .set('get_branch', 'get_branch');
    return this.http.get(this.gr.sUrlGlobal + 'admin', {params: params});
  }

  // добавдяем новый филиал
  setBranch(newName, id_city) {
      const sUrl = this.gr.sUrlGlobal + 'admin';
      const data_branch = { 'insert_branch': newName, 'id_city': id_city};
      return this.http.post(sUrl, data_branch);
  }


}
