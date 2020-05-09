import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  @Input() id_branch = 1;
  sError = '';
  public adminFormUser: FormGroup;
  public selectedUser: any;
  branchList = [];
  positionList = [];
  usersList = [];

  constructor(private adminserv: AdminService, private router: Router)  {
    this.adminFormUser = new FormGroup({
    'nick': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.LoadUser(this.id_branch);
    this.LoadPositionList(this.id_branch);
  }


  LoadUser(id_branch) {

    this.adminserv.getAllUsers().subscribe( (value: Array<any>) =>  {

      // получаем всех пользователей
      this.usersList = [];
      value.forEach((element, ih) => {
        this.usersList.push(element);
      });

      // после получения списка польз. получаем филиалы и строим компонент
      this.createBranchControls();
    });
  }

  muUser(uElem) {
    this.selectedUser = uElem;
    this.showInfo(uElem.id, uElem.nick);
  }


  showInfo(id_user, nick) {
    this.adminFormUser.controls['nick'].setValue(nick);

    this.adminserv.getBranchUser(id_user).subscribe((value: Array<any>) => {
      this.branchList = value;
      value.forEach((element, ih) => {
        this.adminFormUser.controls['checkBranch' + element.id].setValue(Boolean(element.branch_check));
        this.adminFormUser.controls['checkIP' + element.id].setValue(Boolean(element.check_ip));
        this.adminFormUser.controls['ip' + element.id].setValue(element.ip);
        this.adminFormUser.controls['textPosition' + element.id].setValue(element.position_name);
      });

    });

  }


  createBranchControls() {
    Object.keys(this.adminFormUser.controls).forEach(key => {

      if (this.adminFormUser.controls[key] !== this.adminFormUser.controls['nick']) {
        this.adminFormUser.removeControl(key);
      }
    });

    this.adminserv.getBranch(1).subscribe( (value: Array<any>) => {
      value.forEach((element, ih) => {
        this.branchList.push(element);
        this.adminFormUser.addControl('checkBranch' + element.id, new FormControl(''));
        this.adminFormUser.addControl('checkIP' + element.id, new FormControl(''));
        this.adminFormUser.addControl('ip' + element.id, new FormControl(''));
         this.adminFormUser.addControl('textPosition' + element.id, new FormControl({value: '', disabled: true}));
        // this.adminFormUser.addControl('textPosition' + element.id, new FormControl({value: ''}));
      });

      // показываем инфу про первого пользователя
      if (this.usersList.length > 0) {
        this.selectedUser = this.usersList[0];
        this.showInfo(this.usersList[0].id, this.usersList[0].nick);
      }
    });
  }

  LoadPositionList(id_branch) {
    this.adminserv.getPosition().subscribe((value: Array<any>) => {
      value.forEach((element, ih) => {
        this.positionList.push(element);
      });
    });
  }

  RouterReload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigated = false;

    this.router.navigate([this.router.url]);
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

  OnSaveAllUserBranch() {

    if (!this.selectedUser) {
      this.sError = 'Не выбран пользователь для сохранения';
      return;
    }

    const id_user = this.selectedUser.id;

    let sNick = '';
    if (this.adminFormUser.controls['nick'].value.toString().trim().length < 3 ) {
      this.sError = 'Никнейм не должен быть короче 3 символов';
      return;
    }
    sNick = this.adminFormUser.controls['nick'].value.toString().trim();

    const mas_res = [];

    this.branchList.forEach((element, ih) => {

      let sPosition = '';
      if (this.adminFormUser.controls['textPosition' + element.id].value.toString().trim() !== '') {
        sPosition = this.adminFormUser.controls['textPosition' + element.id].value.toString().trim();
      }


      let id_position = 0;
      const position = this.positionList.find(elem => elem.name === sPosition);
      if (position) {
        id_position = position.id;
      }

      let sIP = '';
      if (this.adminFormUser.controls['ip' + element.id].value.toString().trim() !== '') {
        sIP = this.adminFormUser.controls['ip' + element.id].value.toString().trim();
      }

      const checkBranch = Boolean(this.adminFormUser.controls['checkBranch' + element.id].value);
      const checkIP = Boolean(this.adminFormUser.controls['checkIP' + element.id].value);
      const id_branch = element.id;

      mas_res.push({id_branch: id_branch, checkBranch: checkBranch, checkIP: checkIP, IP: sIP, id_position: id_position});
    });

    console.log(mas_res);


    this.adminserv.getUniqueNick(id_user, sNick).subscribe( countvalue => {
      if (countvalue[0].res > 0 ) {

        this.sError = 'Никнейм уже используется.';
        return;
      }

      this.adminserv.setUpdateNickNane(id_user, sNick).subscribe( value => {
          this.adminserv.setUpdateLinkBranchUser(id_user, mas_res).subscribe( res => {
            this.RouterReload();
          });

      });
    });


  }

  changePosition(chPosition: any, elem: HTMLInputElement) {
            this.adminFormUser.controls[elem.id].setValue(chPosition.name);
  }

}
