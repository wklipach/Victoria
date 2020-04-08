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

  sError = '';
  id_city = 1;
  adminForm: FormGroup;
  branchList = [];
  usersList = [];
  bShowDeleteBranch = false;
  sBranchName = '';
  private selectedBL: any;
  private selectedUser: any;
  private chBranch: any;

  constructor(private adminserv: AdminService, private location: Location, private router: Router) {
    this.adminForm = new FormGroup({
      'inputBranch': new FormControl({}, []),
      'inputChangeBranch': new FormControl({}, []),
      'inputNewBranch': new FormControl({}, []),
      'checkIP': new FormControl({}, []),
      'ip': new FormControl({}, []),
      'nick': new FormControl({}, []),
      'chbranch': new FormControl({}, [])
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
      this.CheckFirstBranch();
      this.LoadUserFromBranch();
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



  LoadUserFromBranch() {
    console.log('LoadUserFromBranch', this.selectedBL);

    this.adminserv.getUsers(this.selectedBL.id).subscribe( (value: Array<any>) =>  {
      this.usersList = [];
      value.forEach((element, ih) => {
        this.usersList.push(element);
      });

      this.CheckFirstUser();

    });
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

    // console.log('изменяем филиал', this.selectedBL.id, sName);
    this.adminserv.setBranchName(this.selectedBL.id, sName).subscribe(value => {
      this.RouterReload();
    });
  }


  newBranch() {
    const sName = this.adminForm.controls['inputNewBranch'].value.toString().trim();
    if (sName !== '') {
      // console.log('добавляем филиал');
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
   // console.log('удаляем филиал', this.selectedBL.id);
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

  CheckFirstUser() {
    if (this.usersList) {
      if (this.usersList[0]) {
        this.selectedUser = this.usersList[0];
        this.changeUserRight(this.selectedUser);
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


  muUser(uElem) {
    this.changeUserRight(uElem);
  }

  mu(bl) {
    this.selectedBL = bl;
    this.reloadAllInput();
  }

  reloadAllInput() {
    this.sBranchName = this.selectedBL.name;
    this.adminForm.controls['inputChangeBranch'].setValue(this.selectedBL.name);
    this.LoadUserFromBranch();
  }

  changeUserRight(uElem) {
    this.selectedUser = uElem;

    this.adminForm.controls['checkIP'].setValue(Boolean(uElem.check_ip));
    if (uElem.ip) {
      this.adminForm.controls['ip'].setValue(uElem.ip);
    } else {
      this.adminForm.controls['ip'].setValue('');
    }

    this.adminForm.controls['nick'].setValue(uElem.nick);


    // проверяем тношение к текущему филиалу, если относится показывает нет то задаем пустое поле
   if (uElem.filial === 1) {
      this.adminForm.controls['chbranch'].setValue(this.selectedBL.name);
   } else {
     this.adminForm.controls['chbranch'].setValue('');
   }


  }

  choiseBranchForUser(chBranch: any) {
    this.chBranch = chBranch;
    this.adminForm.controls['chbranch'].setValue(this.chBranch.name);

    this.adminserv.getBranchUser(this.selectedUser.id, this.chBranch.id).subscribe((value: Array<any>) => {

      if (value.length === 0 ) {
        this.adminForm.controls['ip'].setValue('');
        this.adminForm.controls['checkIP'].setValue(Boolean(false));
      }

      if (value.length > 0 ) {
        console.log(value[0]);
        if (value[0]) {
          this.adminForm.controls['checkIP'].setValue(Boolean(value[0].check_ip));
          this.adminForm.controls['ip'].setValue(value[0].ip);
        } else {
          this.adminForm.controls['ip'].setValue('');
          this.adminForm.controls['checkIP'].setValue(Boolean(false));
        }
      }

    });
    //
   // console.log('choiseBranchForUser', chBranch);
  }

  OnDeleteUserBranch() {
    this.adminserv.setDeleteUserBranch(this.selectedUser.id, this.chBranch.id).subscribe( valee => {
      this.RouterReload();
    });
  }

  OnDeleteUserFull() {
    if (!this.selectedUser) {
      return;
    }
    if (this.selectedUser.id === 1) {
      return;
    }
    this.adminserv.setDeleteUserFull(this.selectedUser.id).subscribe( value => {
      this.RouterReload();
    });
  }

  // сохраняем все что можем
  OnSaveAllUserBranch() {

    if (this.adminForm.controls['nick'].value.toString().trim().length < 3 ) {
      this.sError = 'Никнейм не должен быть короче 3 символов';
      return;
    }

    // пересохраняем данные
    const nick = this.adminForm.controls['nick'].value.toString().trim();
    const id_user = this.selectedUser.id;

    let chbranch = '';
    if (this.adminForm.controls['chbranch'].value) {
      chbranch = this.adminForm.controls['chbranch'].value.toString().trim();
    }

    const checkIP = this.adminForm.controls['checkIP'].value;

    let ip = '';
    if (this.adminForm.controls['ip'].value) {
        ip = this.adminForm.controls['ip'].value.toString().trim();
    }

    this.adminserv.setUpdateNickNane(id_user, nick).subscribe( value => {
      if (chbranch.length === 0) {
        this.RouterReload();
      }

      if (chbranch.length > 0) {
        this.adminserv.setUpdateLinkBranchUser(id_user, chbranch, ip, checkIP).subscribe( res => {
          this.RouterReload();
        });
      }
    });





  }
}
