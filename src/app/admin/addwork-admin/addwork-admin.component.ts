import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Check} from '../../static/check';
import {LaundryService} from '../../washhouse/services/laundry.service';
import {AuthService} from '../../services/auth-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-addwork-admin',
  templateUrl: './addwork-admin.component.html',
  styleUrls: ['./addwork-admin.component.css']
})
export class AddworkAdminComponent implements OnInit {

  @ViewChild('summaryAW') public summaryAW: ElementRef;
  branchList = [];
  id_branch = 1;
  sAwName = '';
  addworkList = [];
  selectedAW: any;
  addworkForm: FormGroup;
  sErrorChangeAW = '';
  sErrorNewAW = '';

  constructor(private adminserv: AdminService,
              private authService: AuthService,
              private ls: LaundryService,
              private location: Location,
              private router: Router) {


    this.addworkForm = new FormGroup({
      'inputNewAW': new FormControl('', []),
      'inputChangeAW': new FormControl('', []),
      'inputBranch': new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.destroyElement();
    this.loadPositionList();
  }

  destroyElement() {
    Object.keys(this.addworkForm.controls).forEach(key => {
      if (this.addworkForm.controls[key] !== this.addworkForm.controls['inputNewAW'] &&
        this.addworkForm.controls[key] !== this.addworkForm.controls['inputChangeAW'] &&
        this.addworkForm.controls[key] !== this.addworkForm.controls['inputBranch']) {
        this.addworkForm.removeControl(key);
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
      this.addworkForm.controls['inputBranch'].setValue(this.id_branch);
      // после получения филиалов строим позиции
      this.loadAddworkBranch(this.addworkForm.controls['inputBranch'].value);

    });
  }


  loadAddworkBranch(id_branch) {
    this.adminserv.getAddWorkBranch(id_branch).subscribe( (value: Array<any>) => {


      this.addworkList = [];
      value.forEach((element, ih) => {


        if (!this.addworkForm.controls['checkAddwork' + element.id]) {
          this.addworkForm.addControl('checkAddwork' + element.id, new FormControl(''));
        }

        if (!this.addworkForm.controls['price' + element.id]) {
          this.addworkForm.addControl('price' + element.id, new FormControl(''));
        }

        this.addworkList.push(element);
      });
      this.CheckFirstAddwork();
      this.LoadInfo();
    });
  }

  LoadInfo() {
    this.addworkList.forEach((element, ih) => {
      this.addworkForm.controls['checkAddwork' + element.id].setValue(Boolean(element.check_price));
      this.addworkForm.controls['price' + element.id].setValue(element.price);
    });
  }


/*
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
 */

  CheckFirstAddwork() {
    if (!this.selectedAW) {
      if (this.addworkList[0]) {
        this.selectedAW = this.addworkList[0];
        this.sAwName = this.selectedAW.name;
      }
    }
  }

  reloadAllInput() {
    this.sAwName = this.selectedAW.name;
    this.addworkForm.controls['inputChangeAW'].setValue(this.selectedAW.name);
    this.sErrorChangeAW = '';
    this.sErrorNewAW = '';
  }

  changeAW() {
    this.CheckFirstAddwork();
    if (this.selectedAW) {
      this.reloadAllInput();
    }

    if (!this.selectedAW) {
      this.addworkForm.controls['inputChangeAW'].setValue('');
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

    this.adminserv.setAddWork(sName).subscribe( value => {
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

    this.adminserv.setChangeAddWork(this.selectedAW.id, sName,).subscribe(value => {
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

  onChangeBranch($event: Event) {
    this.loadAddworkBranch(this.addworkForm.controls['inputBranch'].value);
  }

  savePrice() {
    const id_branch = this.addworkForm.controls['inputBranch'].value;
    const res_mas = [];
    this.addworkList.forEach((element, ih) => {
      let price = 0;
      if (Check.ZeroOrPositive(this.addworkForm.controls['price' + element.id].value)) {
        price = this.addworkForm.controls['price' + element.id].value;
      }
      res_mas.push({id_addwork: element.id, price: price, check_addwork: this.addworkForm.controls['checkAddwork' + element.id].value});
    });

    this.adminserv.setAddworkBranchPrice(id_branch, res_mas).subscribe(value => {
        jQuery(this.summaryAW.nativeElement).collapse('hide');
      }
    );
  }

}
