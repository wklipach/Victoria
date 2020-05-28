import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {GlobalRef} from '../../services/globalref';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.css']
})
export class PersonalMenuComponent implements OnInit {

  @Input() numberPage = 0;
  id_user_vict = -1;
  editor = -1;
  public sAvatarPath  = '';
  sUserName = 'Фото';

  constructor(private authService: AuthService, private gr: GlobalRef, private router: Router) { }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }

     this.editor = this.authService.getEditorStorage();

    this.onLoadFromBaseAvatar();

    if (Res.victUserName !== '') {
      this.sUserName = Res.victUserName;
    }

    console.log('this.id_user_vict =', this.id_user_vict);

  }

  getStyleName(el) {
    // style="font-weight:bold; color: #ff623d;"
    let Res = '';
    if (el.toString() === this.numberPage.toString()) { Res = 'font-weight:bold; color: #FF7F41;'; }
    return Res;
  }

  onLoadFromBaseAvatar() {

    console.log('personal-menu', 'onLoadFromBaseAvatar');

    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {

      console.log('personal-menu', 'onLoadFromBaseAvatar', 'aRes=', aRes);

      if (!aRes) {
        return;
      }


      if (!aRes[0]) {
           return;
      }

      if (!aRes[0].avatar_name) {
        return;
      }

      const S = aRes[0].avatar_name;
      if (S !== '""' && (S)) {
        if (typeof S !== 'undefined') {
          if (S.length > 0) {
            this.sAvatarPath = this.gr.sUrlAvatarGlobal + S;
          }
        }
      }
    });
  }

  logout() {
    this.authService.clearStorage();
    this.router.navigate(['/login']);
  }


}
