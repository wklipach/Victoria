import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-smain',
  templateUrl: './smain.component.html',
  styleUrls: ['./smain.component.css']
})
export class SmainComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/laundry']);
    }
  }

}
