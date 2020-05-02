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
  positionList = [];
  branchList = [];
  selectedPosition: any;
  sPosition = '';
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
        this.CheckFirstPosition();
        this.LoadInfo();
     });
  }

    LoadInfo() {
        this.positionList.forEach((element, ih) => {
          this.positionForm.controls['checkPosition' + element.id].setValue(Boolean(element.check_price));
          this.positionForm.controls['price' + element.id].setValue(element.price);
      });
    }

  CheckFirstPosition() {
    if (!this.selectedPosition) {
      if (this.positionList[0]) {
        this.selectedPosition = this.positionList[0];
        this.sPosition = this.selectedPosition.name;
        this.positionForm.controls['inputChangePosition'].setValue(this.sPosition);
      }
    }
  }

/*
////////////////////////////////////////////////
*/

  crearError() {
    this.sErrorChangePosition = '';
    this.sErrorNewPosition = '';
  }

  changePosition() {
    this.CheckFirstPosition();
    if (this.selectedPosition) {
      this.crearError();
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

    this.adminserv.insertPosition(sName).subscribe( value => {
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

    this.adminserv.setChangePosition(this.selectedPosition.id, sName).subscribe(value => {
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
    this.sPosition = this.selectedPosition.name;
    this.positionForm.controls['inputChangePosition'].setValue(this.sPosition);
    this.crearError();
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
    const id_branch = this.positionForm.controls['inputBranch'].value;
    const res_mas = [];
    this.positionList.forEach((element, ih) => {
      let price = 0;
      if (Check.ZeroOrPositive(this.positionForm.controls['price' + element.id].value)) {
         price = this.positionForm.controls['price' + element.id].value;
      }
      res_mas.push({id_position: element.id, price: price, check_position: this.positionForm.controls['checkPosition' + element.id].value});
    });

    this.adminserv.setPositionBranchPrice(id_branch, res_mas).subscribe(value => {
        jQuery(this.summaryPosition.nativeElement).collapse('hide');
      }
    );
  }
}
