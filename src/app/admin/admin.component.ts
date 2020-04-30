import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../services/admin.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sError = '';
  id_city = 1;
  adminForm: FormGroup;
  adminFormUser: FormGroup;
  branchList = [];
  positionList = [];
  usersList = [];
  bShowDeleteBranch = false;
  sBranchName = '';
  private selectedBL: any;
  public selectedUser: any;
  public chBranchU: any;
  public chPositionU: any;

  constructor(private adminserv: AdminService, private location: Location, private router: Router, private authService: AuthService) {
    this.adminForm = new FormGroup({
      'inputBranch': new FormControl({}, []),
      'inputChangeBranch': new FormControl({}, []),
      'inputNewBranch': new FormControl({}, []),
      'checkIP': new FormControl({}, []),
      'ip': new FormControl({}, []),
       'chPosition': new FormControl({}, []),
      'chbranch': new FormControl({}, [])
    });


    this.adminFormUser = new FormGroup({});

  }

  ngOnInit(): void {
    this.loadBranchList(this.id_city);
    this.adminForm.controls['inputNewBranch'].setValue('');
  }

  loadBranchList(id_city) {
    //

    Object.keys(this.adminFormUser.controls).forEach(key => {
      this.adminFormUser.removeControl(key);
    });
    this.adminFormUser.addControl('nick', new FormControl(''));
    this.adminserv.getBranch(id_city).subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.branchList.push(element);
        this.adminFormUser.addControl('checkBranch' + element.id, new FormControl(''));
        this.adminFormUser.addControl('checkIP' + element.id, new FormControl(''));
        this.adminFormUser.addControl('ip' + element.id, new FormControl(''));
        this.adminFormUser.addControl('textPosition' + element.id, new FormControl(''));
      });
      this.CheckFirstBranch();
      this.LoadUserFromBranch();
      this.LoadPositionList();
      // this.adminForm.controls['inputBranch'].setValue(this.branchList.find((valBranch) => valBranch.id === 1).name);
    });
    //
  }

  LoadPositionList() {

    const Res = this.authService.loginStorage();
    let id_user_vict = -1;
    if (Res.bVictConnected) {
      id_user_vict = Res.id_user_vict;
    }

    const id_branch = this.authService.getBranch(id_user_vict);
    this.adminserv.getPosition(id_branch).subscribe((value: Array<any>) => {
      value.forEach((element, ih) => {
        this.positionList.push(element);
      });
    });
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
/*
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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

    // проверяем должность, если показывает или задаем пустое поле
    if (uElem.id_position !== 0) {
      this.adminForm.controls['chPosition'].setValue(uElem.position_name);
    } else {
      this.adminForm.controls['chPosition'].setValue('');
    }
*/

  }

  choiseBranchForUser(id_user) {
    // this.chBranchU = chBranch;
    // this.adminForm.controls['chbranch'].setValue(this.chBranchU.name);
    // //adminFormUser

    this.adminserv.getBranchUser(id_user).subscribe((value: Array<any>) => {

/*
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
*/

    });
    //
   // console.log('choiseBranchForUser', chBranch);
  }

  choisePositionForUser(chPosition: any) {
    this.chPositionU = chPosition;
    this.adminForm.controls['chPosition'].setValue(this.chPositionU.name);
  }

  OnDeleteUserBranch() {
    this.adminserv.setDeleteUserBranch(this.selectedUser.id, this.chBranchU.id).subscribe( valee => {
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
/*
  OnSaveAllUserBranch() {

    if (this.adminForm.controls['nick'].value.toString().trim().length < 3 ) {
      this.sError = 'Никнейм не должен быть короче 3 символов';
      return;
    }

    const strPosition = this.adminForm.controls['chPosition'].value.toString().trim();
    let id_position = 0;
    const elemPosition = this.positionList.find((curPos) => curPos.name === strPosition);
    if (elemPosition) {
      id_position = elemPosition.id;
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

    this.adminserv.getUniqueNick(id_user, nick).subscribe( countvalue => {
      // select count(id) as res  from tuser where id=1 and nick <> 'Администратор'
            if (countvalue[0].res > 0 ) {

              console.log('countvalue', countvalue);
              console.log('countvalue[0]', countvalue[0]);
              console.log('countvalue[0].res', countvalue[0].res);

                this.sError = 'Никнейм уже используется.';
                return;
            }
            this.adminserv.setUpdateNickNane(id_user, nick).subscribe( value => {
                if (chbranch.length === 0) {
                this.RouterReload();
                }

                if (chbranch.length > 0) {
                this.adminserv.setUpdateLinkBranchUser(id_user, chbranch, ip, checkIP, id_position).subscribe( res => {
                this.RouterReload();
                });
              }
            });
    });



  }
*/

}
