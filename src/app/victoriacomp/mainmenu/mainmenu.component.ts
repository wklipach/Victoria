import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  id_user_vict = -1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }

  }

}
