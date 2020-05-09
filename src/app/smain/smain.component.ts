import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-smain',
  templateUrl: './smain.component.html',
  styleUrls: ['./smain.component.css']
})
export class SmainComponent implements OnInit {

  sErrorPageAccess = '';

  constructor(private router: Router, private authService: AuthService) {

    if (this.router.getCurrentNavigation()) {
      if (this.router.getCurrentNavigation().extras) {
        if (this.router.getCurrentNavigation().extras.state) {
          if (this.router.getCurrentNavigation().extras.state['errorPageAccess']) {
            this.sErrorPageAccess = this.router.getCurrentNavigation().extras.state['errorPageAccess'];
          }
        }
      }
    }
  }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    } else {
      if (this.sErrorPageAccess !== '') {
      this.router.navigate(['/laundry'], { state: { errorPageAccess : '1' }});
      } else {
        this.router.navigate(['/laundry']);
      }

    }
  }

}
