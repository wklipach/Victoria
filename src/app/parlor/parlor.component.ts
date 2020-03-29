import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-parlor',
  templateUrl: './parlor.component.html',
  styleUrls: ['./parlor.component.css']
})
export class ParlorComponent implements OnInit {

  public nick = '';
  public id_user_vict = -1;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    console.log('parlor1');
      const Res = this.authService.loginStorage();
    console.log('parlor2', Res);
      if (!Res.bVictConnected) {
        this.router.navigate(['/login']);
      }

    console.log('parlor3');

    if (Res.bVictConnected) {

      console.log('parlor4');

      this.nick = Res.victUserName;
      this.id_user_vict = Res.id_user_vict;
    }

  }

}
