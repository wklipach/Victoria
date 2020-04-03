import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
