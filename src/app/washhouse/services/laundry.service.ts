import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  constructor(private http: HttpClient, private gr: GlobalRef) {}

  set_shift_begin(email: string, pwd: string, hash: string) {
    const sUrl = this.gr.sUrlGlobal + 'shift';
    return this.http.post(sUrl, {email, pwd, hash});
  }

  setacceptance(value: any, id_shift) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';

    const new_acceptance = { 'acceptance_insert': value, 'id_shift' : id_shift};
    console.log(new_acceptance);
    return this.http.post(sUrl, new_acceptance);
  }


  getLastAcceptance(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_acceptance', 'last_acceptance')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getDetailAcceptance(id_accept) {
    const params = new HttpParams()
      .set('detail_acceptance', 'detail_acceptance')
      .set('id_accept', id_accept.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }



}
