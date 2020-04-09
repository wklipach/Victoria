import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services/shift.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-washing-laundry',
  templateUrl: './washing-laundry.component.html',
  styleUrls: ['./washing-laundry.component.css']
})
export class WashingLaundryComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (!ShiftService.getShift()) {
      this.router.navigate(['/']);
    }

  }

}
