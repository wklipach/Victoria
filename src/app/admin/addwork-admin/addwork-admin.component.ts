import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Check} from '../../static/check';
import {LaundryService} from '../../washhouse/services/laundry.service';

@Component({
  selector: 'app-addwork-admin',
  templateUrl: './addwork-admin.component.html',
  styleUrls: ['./addwork-admin.component.css']
})
export class AddworkAdminComponent implements OnInit {
  sAwName = '';
  addworkList = [];
  selectedAW: any;
  addworkForm: FormGroup;
  sErrorChangeAW = '';
  sErrorNewAW = '';

  constructor(private adminserv: AdminService,
              private ls: LaundryService,
              private location: Location,
              private router: Router) {


    this.addworkForm = new FormGroup({
      'inputNewAW': new FormControl('', []),
      'inputNewAWPrice': new FormControl('', []),
      'inputChangeAW': new FormControl('', []),
      'inputChangeAWPrice': new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.loadAWList();
  }

  loadAWList() {
    //
    this.ls.getAddWork().subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.addworkList.push(element);
      });
      this.CheckFirstAW();
    });
    //
  }

  CheckFirstAW() {
    if (!this.selectedAW) {
      if (this.addworkList[0]) {
        this.selectedAW = this.addworkList[0];
        this.sAwName = this.selectedAW.work_name;
      }
    }
  }

  reloadAllInput() {
    this.sAwName = this.selectedAW.work_name;
    this.addworkForm.controls['inputChangeAW'].setValue(this.selectedAW.work_name);
    this.addworkForm.controls['inputChangeAWPrice'].setValue(this.selectedAW.price);
    this.sErrorChangeAW = '';
    this.sErrorNewAW = '';
  }

  changeAW() {
    this.CheckFirstAW();
    if (this.selectedAW) {
      this.reloadAllInput();
    }

    if (!this.selectedAW) {
      this.addworkForm.controls['inputChangeAW'].setValue('');
      this.addworkForm.controls['inputChangeAWPrice'].setValue('');
    }
  }

  newAW() {
    //
    this.sErrorNewAW = '';

    const sName = this.addworkForm.controls['inputNewAW'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorNewAW = 'вы ввели пустую строку';
      return;
    }

    const sPrice = this.addworkForm.controls['inputNewAWPrice'].value.toString().trim();

    if (!Check.checkPositiveNumber(sPrice)) {
      this.sErrorNewAW = 'введите оплату - положительное целое число';
      return;
    }

    this.adminserv.setAddWork(sName, sPrice).subscribe( value => {
      this.RouterReload();
    });
    //
  }

  OnChangeAW() {

    this.sErrorChangeAW = '';

    if (!this.selectedAW) {
      return;
    }

    const sName = this.addworkForm.controls['inputChangeAW'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorChangeAW = 'вы ввели пустую строку';
      return;
    }

    const sPrice = this.addworkForm.controls['inputChangeAWPrice'].value.toString().trim();

    if (!Check.checkPositiveNumber(sPrice)) {
      this.sErrorChangeAW = 'введите оплату - положительное целое число';
      return;
    }

    this.adminserv.setChangeAddWork(this.selectedAW.id, sName, sPrice).subscribe(value => {
      this.RouterReload();
    });


  }

  OnDeleteAW() {
    this.adminserv.setAddWorkDelete(this.selectedAW.id).subscribe(value => {
      this.RouterReload();
    });
  }

  mu(aw: any) {
    this.selectedAW = aw;
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
