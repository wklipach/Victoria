import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private gr: GlobalRef) { }

  getSelectReportWeek(id_user, id_branch, date_begin, date_end) {
    const params = new HttpParams()
      .set('select_report_week', 'select_report_week')
      .set('id_user', id_user)
      .set('id_branch', id_branch)
      .set('date_begin', date_begin)
      .set('date_end', date_end);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  // получить незакрытые смены
  getSelectFace(id_user, id_branch) {
    const params = new HttpParams()
      .set('select_report_face', 'select_report_face')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getAddress(id_address) {
    const params = new HttpParams()
      .set('report_address', 'report_address')
      .set('id_address', id_address);

    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getAcceptanceReport(id_address, id_branch) {
    const params = new HttpParams()
      .set('report_acceptance', 'report_acceptance')
      .set('id_address', id_address)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getWarehouseReport(id_address, id_branch)  {
    const params = new HttpParams()
      .set('report_warehouse', 'report_warehouse')
      .set('id_address', id_address)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getRepairReport(id_address, id_branch) {
    const params = new HttpParams()
      .set('report_repair', 'report_repair')
      .set('id_address', id_address)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

  getWashingReport(id_address, id_branch) {
    const params = new HttpParams()
      .set('report_washing', 'report_washing')
      .set('id_address', id_address)
      .set('id_branch', id_branch);
    return this.http.get(this.gr.sUrlGlobal + 'report', {params: params});
  }

}
