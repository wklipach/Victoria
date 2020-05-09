import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {LaundryService} from '../../washhouse/services/laundry.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Check} from '../../static/check';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-address-admin',
  templateUrl: './address-admin.component.html',
  styleUrls: ['./address-admin.component.css']
})
export class AddressAdminComponent implements OnInit {
  sAdName = '';
  addressList = [];
  selectedAD: any;
  addressForm: FormGroup;
  sErrorChangeAD = '';
  sErrorNewAD = '';
  id_branch = 1;


  constructor(private adminserv: AdminService,
              private ls: LaundryService,
              private location: Location,
              private authService: AuthService,
              private router: Router) {

    this.addressForm = new FormGroup({
      'inputNewAD': new FormControl('', []),
      'inputNewADBranch': new FormControl('', []),
      'inputChangeAD': new FormControl('', []),
      'inputChangeADBranch': new FormControl('', [])
    });
    this.addressForm.controls['inputNewADBranch'].disable();
    this.addressForm.controls['inputChangeADBranch'].disable();
  }

  ngOnInit(): void {
    this.loadADList();
  }

  loadADList() {
    //

    const Res = this.authService.loginStorage();
    let id_user_vict = -1;
    if (Res.bVictConnected) {
      id_user_vict = Res.id_user_vict;
    }

    this.id_branch = this.authService.getBranch(id_user_vict);
    this.ls.getWashHouseAddress(this.id_branch).subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.addressList.push(element);
      });

      console.log('this.addressList', this.addressList);

      this.CheckFirstAD();
    });

    this.adminserv.getBranchInfo(this.id_branch).subscribe( value => {
      if (value[0]) {
        this.addressForm.controls['inputNewADBranch'].setValue(value[0].name);
      }
    });

    //
  }

  CheckFirstAD() {
    if (!this.selectedAD) {
      if (this.addressList[0]) {
        this.selectedAD = this.addressList[0];
        this.sAdName = this.selectedAD.address;
      }
    }

  }

  reloadAllInput() {
    this.sAdName = this.selectedAD.address;
    this.addressForm.controls['inputChangeAD'].setValue(this.selectedAD.address);
    this.addressForm.controls['inputChangeADBranch'].setValue(this.selectedAD.branch_name);
    this.sErrorChangeAD = '';
    this.sErrorNewAD = '';
  }

  changeAD() {
    this.CheckFirstAD();
    if (this.selectedAD) {
      this.reloadAllInput();
    }

    if (!this.selectedAD) {
      this.addressForm.controls['inputChangeAD'].setValue('');
      this.addressForm.controls['inputChangeADBranch'].setValue('');
    }
  }

  newAD() {
    //
    this.sErrorNewAD = '';

    const sName = this.addressForm.controls['inputNewAD'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorNewAD = 'вы ввели пустую строку';
      return;
    }

/*
    const sBranch = this.addressForm.controls['inputNewADBranch'].value.toString().trim();

    if (sBranch.length === 0) {
      this.sErrorNewAD = 'вы ввели пустую строку';
      return;
    }
*/

    this.adminserv.setAddress(sName, this.id_branch).subscribe( value => {
      this.RouterReload();
    });
    //
  }

  OnChangeAD() {

    this.sErrorChangeAD = '';

    if (!this.selectedAD) {
      return;
    }

    const sName = this.addressForm.controls['inputChangeAD'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorChangeAD = 'вы ввели пустую строку';
      return;
    }

/*
    const sBranch = this.addressForm.controls['inputChangeADBranch'].value.toString().trim();

    if (sBranch.length === 0) {
      this.sErrorChangeAD = 'вы ввели пустую строку';
      return;
    }
 */

    this.adminserv.setChangeAddress(this.selectedAD.id_address, sName, this.id_branch).subscribe(value => {
      this.RouterReload();
    });


  }

  OnDeleteAD() {
    this.adminserv.setAddressDelete(this.selectedAD.id_address).subscribe(value => {
      this.RouterReload();
    });
  }

  mu(ad: any) {
    this.selectedAD = ad;
    this.reloadAllInput();
  }

  RouterReload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigated = false;

    this.router.navigate([this.router.url]);
  }

}
