import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private gr: GlobalRef) { }

  setPayment(id_user, id_branch, payment: any) {
    const sUrl = this.gr.sUrlGlobal + 'payment';
    const new_payment = { 'payment_insert': 'payment_insert', 'payment' : payment, 'id_user': id_user, 'id_branch': id_branch};
    return this.http.post(sUrl, new_payment);
  }

  getPaymentReal(id_user, id_branch, date_begin, date_end) {
    const params = new HttpParams()
      .set('payment_real', 'payment_real')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString())
      .set('date_begin', date_begin)
      .set('date_end', date_end);
    return this.http.get(this.gr.sUrlGlobal + 'payment', {params: params});
  }

  getPaymentVirtual(id_user, id_branch, date_begin, date_end) {
    const params = new HttpParams()
      .set('payment_virtual', 'payment_virtual')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString())
      .set('date_begin', date_begin)
      .set('date_end', date_end);
    return this.http.get(this.gr.sUrlGlobal + 'payment', {params: params});
  }

}
