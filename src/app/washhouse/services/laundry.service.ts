import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from '../../services/globalref';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  constructor(private http: HttpClient, private gr: GlobalRef) {}

  setacceptance(value: any, id_shift, id_address) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_acceptance = { 'acceptance_insert': value, 'id_shift' : id_shift, 'id_address': id_address};
    return this.http.post(sUrl, new_acceptance);
  }

  setwarehouse(value: any, id_shift, id_address) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_warehouse = { 'warehouse_insert': value, 'id_shift' : id_shift, 'id_address' : id_address};
    return this.http.post(sUrl, new_warehouse);
  }

  setAddWork(mas_res: any, mas_spend: any, id_shift) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_addwork = { 'addwork_insert': mas_res, 'addspend_insert': mas_spend, 'id_shift' : id_shift};
    return this.http.post(sUrl, new_addwork);
  }

  setshipment(value: any, id_shift, id_address) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_shipment = { 'shipment_insert': value, 'id_shift' : id_shift, 'id_address' : id_address};
    return this.http.post(sUrl, new_shipment);
  }

  setrepair(value: any, id_shift, id_address) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_repair = { 'repair_insert': value, 'id_shift' : id_shift, 'id_address': id_address};
    return this.http.post(sUrl, new_repair);
  }

  setwashing(value: any, id_shift, id_address) {
    const sUrl = this.gr.sUrlGlobal + 'laundry';
    const new_washing = { 'washing_insert': value, 'id_shift' : id_shift, 'id_address': id_address};
    return this.http.post(sUrl, new_washing);
  }

  getLastAcceptance(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_acceptance', 'last_acceptance')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getLastWashing(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_washing', 'last_washing')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getLastWarehouse(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_warehouse', 'last_warehouse')
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

  getDetailWashing(id_washing) {
    const params = new HttpParams()
      .set('detail_washing', 'detail_washing')
      .set('id_washing', id_washing.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getDetailWarehouse(id_warehouse) {
    const params = new HttpParams()
      .set('detail_warehouse', 'detail_warehouse')
      .set('id_warehouse', id_warehouse.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getDetailAddwork(id_addwork) {
    const params = new HttpParams()
      .set('detail_addwork', 'detail_addwork')
      .set('id_addwork', id_addwork.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getDetailAddworkAndSpend(id_addwork) {
    const params = new HttpParams()
      .set('detail_addwork_and_spend', 'detail_addwork_and_spend')
      .set('id_addwork', id_addwork.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }


  getLastRepair(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_repair', 'last_repair')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

    getLastShipment(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_shipment', 'last_shipment')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getLastAddWork(id_user, id_branch) {
    const params = new HttpParams()
      .set('last_addwork', 'last_addwork')
      .set('id_user', id_user.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }


  getDetailRepair(id_repair) {
    const params = new HttpParams()
      .set('detail_repair', 'detail_repair')
      .set('id_repair', id_repair.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getValidatorsRepair(id_address, id_branch) {
    const params = new HttpParams()
      .set('get_valid_repair', 'get_valid_repair')
      .set('id_address', id_address.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'validators', {params: params});
  }

  getValidatorsWashing(id_address, id_branch) {
    const params = new HttpParams()
      .set('get_valid_washing', 'get_valid_washing')
      .set('id_address', id_address.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'validators', {params: params});
  }

  getValidatorsWarehouse(id_address, id_branch) {
    const params = new HttpParams()
      .set('get_valid_warehouse', 'get_valid_warehouse')
      .set('id_address', id_address.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'validators', {params: params});
  }

  getValidatorsShipment(id_address, id_branch) {
    const params = new HttpParams()
      .set('get_valid_shipment', 'get_valid_shipment')
      .set('id_address', id_address.toString())
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'validators', {params: params});
  }

  getWashHouseAddress(id_branch) {
    const params = new HttpParams()
      .set('get_washhouse_address', 'get_washhouse_address')
      .set('id_branch', id_branch.toString());
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }

  getAddWork() {
    const params = new HttpParams()
      .set('get_laundry_add_work', 'get_laundry_add_work');
    return this.http.get(this.gr.sUrlGlobal + 'laundry', {params: params});
  }



}
