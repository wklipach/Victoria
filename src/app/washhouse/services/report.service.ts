import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private gr: GlobalRef) { }

  getAddress(id_address) {
    const params = new HttpParams()
      .set('report_address', 'report_address')
      .set('id_address', id_address);

    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getAcceptanceReport(id_address) {
    const params = new HttpParams()
      .set('report_acceptance', 'report_acceptance')
      .set('id_address', id_address);

    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getWarehouseReport(id_address) {
    const params = new HttpParams()
      .set('report_warehouse', 'report_warehouse')
      .set('id_address', id_address);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getRepairReport(id_address) {
    const params = new HttpParams()
      .set('report_repair', 'report_repair')
      .set('id_address', id_address);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getWashingReport(id_address) {
    const params = new HttpParams()
      .set('report_washing', 'report_washing')
      .set('id_address', id_address);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

}
