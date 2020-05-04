import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient, private gr: GlobalRef) {}

  // начать-занончить смену
  public static setShift(bShiftBegin: boolean) {
    window.localStorage.setItem('bShiftBegin', JSON.stringify(bShiftBegin));
  }

  // получить бит смены
  public static getShift() {
    let bShiftBegin = false;
    if (window.localStorage.getItem('bShiftBegin')) {
      bShiftBegin = JSON.parse(window.localStorage.getItem('bShiftBegin'));
    }
    return bShiftBegin;
  }

  // начать смену
  set_shift_begin(id_user, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'shift';
    const data_shift = { 'new_shift': 'new_shift', 'id_user' : id_user, 'id_branch': id_branch};
    return this.http.post(sUrl, data_shift);
  }

  // закончить смену
  set_shift_end(id_user, id_branch) {
    const sUrl = this.gr.sUrlGlobal + 'shift';
    const data_shift = { 'end_shift': 'end_shift', 'id_user' : id_user, 'id_branch': id_branch};
    return this.http.post(sUrl, data_shift);
  }


  // получить незакрытые смены
  get_shiftuserbranch(id_user, id_branch) {
    const params = new HttpParams()
      .set('get_shiftuserbranch', 'get_shiftuserbranch')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'shift', {params: params});
  }

}
