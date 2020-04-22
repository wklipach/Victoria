import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {LaundryService} from '../../washhouse/services/laundry.service';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {Check} from '../../static/check';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  sPositionName = '';
  positionList = [];
  selectedPosition: any;
  positionForm: FormGroup;
  sErrorChangePosition = '';
  sErrorNewPosition = '';
  id_branch = 1;

  constructor(private adminserv: AdminService,
              private ls: LaundryService,
              private location: Location,
              private authService: AuthService,
              private router: Router) {
    this.positionForm = new FormGroup({
      'inputNewPosition': new FormControl('', []),
      'inputNewPositionPrice': new FormControl('', []),
      'inputNewPositionBranch': new FormControl('', []),
      'inputChangePosition': new FormControl('', []),
      'inputChangePositionPrice': new FormControl('', []),
      'inputChangePositionBranch': new FormControl('', [])
    });
    this.positionForm.controls['inputNewPositionBranch'].disable();
    this.positionForm.controls['inputChangePositionBranch'].disable();
  }

  ngOnInit(): void {
    this.loadPositionList();
  }

  loadPositionList() {
    //

    const Res = this.authService.loginStorage();
    let id_user_vict = -1;
    if (Res.bVictConnected) {
      id_user_vict = Res.id_user_vict;
    }

    this.id_branch = this.authService.getBranch(id_user_vict);
    this.adminserv.getPosition(this.id_branch).subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.positionList.push(element);
      });
      this.CheckFirstPosition();
    });

    this.adminserv.getBranchInfo(this.id_branch).subscribe( value => {
      if (value[0]) {
        this.positionForm.controls['inputNewPositionBranch'].setValue(value[0].name);
      }
    });


    //
  }

  CheckFirstPosition() {
    if (!this.selectedPosition) {
      if (this.positionList[0]) {
        this.selectedPosition = this.positionList[0];
        this.sPositionName = this.selectedPosition.name;
      }
    }

  }

  reloadAllInput() {
    this.sPositionName = this.selectedPosition.name;
    this.positionForm.controls['inputChangePosition'].setValue(this.selectedPosition.name);
    this.positionForm.controls['inputChangePositionPrice'].setValue(this.selectedPosition.price);
    this.positionForm.controls['inputChangePositionBranch'].setValue(this.selectedPosition.branch_name);
    this.sErrorChangePosition = '';
    this.sErrorNewPosition = '';
  }

  changePosition() {
    this.CheckFirstPosition();
    if (this.selectedPosition) {
      this.reloadAllInput();
    }

    if (!this.selectedPosition) {
      this.positionForm.controls['inputChangePosition'].setValue('');
      this.positionForm.controls['inputChangePositionPrice'].setValue('');
      this.positionForm.controls['inputChangePositionBranch'].setValue('');
    }
  }

  newPosition() {
    //
    this.sErrorNewPosition = '';

    const sName = this.positionForm.controls['inputNewPosition'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorNewPosition = 'Введите название должности';
      return;
    }

    const sPrice = this.positionForm.controls['inputNewPositionPrice'].value.toString().trim();
    if (!Check.checkPositiveNumber(sPrice)) {
      this.sErrorNewPosition = 'Стоимость часа - положительное целое число';
      return;
    }

    const sBranch = this.positionForm.controls['inputNewPositionBranch'].value.toString().trim();

    if (sBranch.length === 0) {
      this.sErrorNewPosition = 'вы ввели пустую строку';
      return;
    }

    this.adminserv.insertPosition(sName, sPrice, this.id_branch).subscribe( value => {
      this.RouterReload();
    });
    //
  }

  OnChangePosition() {

    this.sErrorChangePosition = '';

    if (!this.selectedPosition) {
      return;
    }

    const sName = this.positionForm.controls['inputChangePosition'].value.toString().trim();
    if (sName.length === 0) {
      this.sErrorChangePosition = 'Введите название должности';
      return;
    }

    const sPrice = this.positionForm.controls['inputChangePositionPrice'].value.toString().trim();
    if (!Check.checkPositiveNumber(sPrice)) {
      this.sErrorNewPosition = 'Стоимость часа - положительное целое число';
      return;
    }

    const sBranch = this.positionForm.controls['inputChangePositionBranch'].value.toString().trim();

    if (sBranch.length === 0) {
      this.sErrorChangePosition = 'вы ввели пустую строку';
      return;
    }

    this.adminserv.setChangePosition(this.selectedPosition.id, sName, sPrice, this.id_branch).subscribe(value => {
      this.RouterReload();
    });


  }

  OnDeletePosition() {
    this.adminserv.setPositionDelete(this.selectedPosition.id).subscribe(value => {
      this.RouterReload();
    });
  }

  mu(ad: any) {
    this.selectedPosition = ad;
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
