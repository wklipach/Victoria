import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {GlobalRef} from '../../services/globalref';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  @Input() numberPage = 0;
  id_user_vict = -1;
  public sAvatarPath  = '';
  sUserName = 'Фото';

  constructor(private authService: AuthService, private gr: GlobalRef) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }

    this.onLoadFromBaseAvatar();

    if (Res.victUserName !== '') {
      this.sUserName = Res.victUserName;
    }

  }

  getStyleName(el) {
    // style="font-weight:bold; color: #ff623d;"
    let Res = '';
    if (el.toString() === this.numberPage.toString()) { Res = 'font-weight:bold; color: red;'; }
    return Res;
  }

  onLoadFromBaseAvatar() {
    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {
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

}
