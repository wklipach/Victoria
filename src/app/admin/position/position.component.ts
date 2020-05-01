import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {LaundryService} from '../../washhouse/services/laundry.service';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {Check} from '../../static/check';
declare var jQuery: any;

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {


  @ViewChild('summaryPosition') public summaryPosition: ElementRef;
  sPositionName = '';
  positionList = [];
  branchList = [];
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
      'inputChangePosition': new FormControl('', []),
      'inputBranch': new FormControl('', [])
    });
    // this.positionForm.controls['inputNewPositionBranch'].disable();
  }

  ngOnInit(): void {
   this.destroyElement();
   this.loadPositionList();
  }

  destroyElement() {
    Object.keys(this.positionForm.controls).forEach(key => {
      if (this.positionForm.controls[key] !== this.positionForm.controls['inputNewPosition'] &&
        this.positionForm.controls[key] !== this.positionForm.controls['inputChangePosition'] &&
        this.positionForm.controls[key] !== this.positionForm.controls['inputBranch']) {
        this.positionForm.removeControl(key);
      }
    });
  }

  // целиком нужно только пр ипервой загрузке
  loadPositionList() {
    //
    const Res = this.authService.loginStorage();
    this.id_branch =  Res.id_branch_vict;

    this.adminserv.getBranch(1).subscribe( (arrBranch: Array<any>) => {
      this.branchList = arrBranch;
      this.positionForm.controls['inputBranch'].setValue(this.id_branch);
        // после получения филиалов строим позиции
      this.loadPositionBranch(this.positionForm.controls['inputBranch'].value);

    });
 }


  loadPositionBranch(id_branch) {
        this.adminserv.getPositionBranch(id_branch).subscribe( (value: Array<any>) => {

        this.positionList = [];
        value.forEach((element, ih) => {


            if (!this.positionForm.controls['checkPosition' + element.id]) {
                  this.positionForm.addControl('checkPosition' + element.id, new FormControl(''));
            }

            if (!this.positionForm.controls['price' + element.id]) {
                 this.positionForm.addControl('price' + element.id, new FormControl(''));
            }

         this.positionList.push(element);
        });
        this.LoadInfo();
     });
  }

    LoadInfo() {
        this.positionList.forEach((element, ih) => {
          this.positionForm.controls['checkPosition' + element.id].setValue(Boolean(element.flagdelete.data[0]));
          this.positionForm.controls['price' + element.id].setValue(element.price);
      });
    }

  CheckFirstPosition() {
    if (!this.selectedPosition) {
      if (this.positionList[0]) {
        this.selectedPosition = this.positionList[0];
        this.sPositionName = this.selectedPosition.name;
      }
    }
  }

/*
////////////////////////////////////////////////
*/

  reloadAllInput() {


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

  onChangeBranch($event: Event) {
    this.loadPositionBranch(this.positionForm.controls['inputBranch'].value);
  }

  savePrice() {

    const res_mas = [];
    this.positionList.forEach((element, ih) => {
//      this.positionForm.controls['checkPosition' + element.id]
//      this.positionForm.controls['price' + element.id]
      let price = 0;
      if (Check.ZeroOrPositive(this.positionForm.controls['price' + element.id].value)) {
         price = this.positionForm.controls['price' + element.id].value;
      }
      res_mas.push({id_position: element.id, price: price, check_position: this.positionForm.controls['checkPosition' + element.id].value});
     // console.log('==>', element);
    });
    console.log('res_mas==>', res_mas);
    jQuery(this.summaryPosition.nativeElement).collapse('hide');


  }
}
