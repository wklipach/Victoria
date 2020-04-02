import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../services/admin.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id_city = 1;
  adminForm: FormGroup;
  branchList = [];
  bShowDeleteBranch = false;
  sBranchName = '';
  private selectedBL: any;

  constructor(private adminserv: AdminService, private location: Location, private router: Router) {
    this.adminForm = new FormGroup({
      'inputBranch': new FormControl({}, []),
      'inputChangeBranch': new FormControl({}, []),
      'inputNewBranch': new FormControl({}, [])
    });
  }

  ngOnInit(): void {
    this.loadBranchList(this.id_city);
    this.adminForm.controls['inputNewBranch'].setValue('');
  }

  loadBranchList(id_city) {
    //
    this.adminserv.getBranch(id_city).subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.branchList.push(element);
      });
      // this.adminForm.controls['inputBranch'].setValue(this.branchList.find((valBranch) => valBranch.id === 1).name);
    });
    //
  }

  changeBranch() {
        this.CheckFirstBranch();
        if (this.selectedBL) {
          this.reloadAllInput();
        }

        if (!this.selectedBL) {
          this.adminForm.controls['inputChangeBranch'].setValue('');
        }
    }

  OnChangeBranch() {
    //
    if (!this.selectedBL) {
      return;
    }
      const sName = this.adminForm.controls['inputChangeBranch'].value.toString().trim();
    if (sName.length === 0) {
      return;
    }

    console.log('изменяем филиал', this.selectedBL.id, sName);
    this.adminserv.setBranchName(this.selectedBL.id, sName).subscribe(value => {
      this.RouterReload();
    });
  }


  newBranch() {
    const sName = this.adminForm.controls['inputNewBranch'].value.toString().trim();
    if (sName !== '') {
      console.log('добавляем филиал');
      this.adminserv.setBranch(1, sName).subscribe( value => {
        this.RouterReload();
      });
    }
  }

  RouterReload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigated = false;

    this.router.navigate([this.router.url]);
  }



  OnDeleteBranch() {
    console.log('удаляем филиал', this.selectedBL.id);
    this.adminserv.setBranchDelete(this.selectedBL.id).subscribe(value => {
      this.RouterReload();
    });
  }

  DisappearFrameDeleteBranch() {
    this.bShowDeleteBranch = false;
  }

  CheckFirstBranch() {
    if (!this.selectedBL) {
      if (this.branchList[0]) {
        this.selectedBL = this.branchList[0];
      }
    }
  }


DeleteBranch() {
  this.CheckFirstBranch();
  if (this.selectedBL) {
      this.bShowDeleteBranch = true;
      this.sBranchName = this.selectedBL.name;
    }
  }

  mu(bl) {
    this.selectedBL = bl;
    this.reloadAllInput();
  }

  reloadAllInput() {
    this.sBranchName = this.selectedBL.name;
    this.adminForm.controls['inputChangeBranch'].setValue(this.selectedBL.name);
  }

}
