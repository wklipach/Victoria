import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  BranchName = '';
  id_user_vict = -1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }


    this.authService.getBranchName(Res.id_branch_vict).subscribe(
      value => {
        this.BranchName = value[0].name;
      });
  }

}
