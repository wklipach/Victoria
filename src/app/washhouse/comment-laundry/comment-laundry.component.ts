import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services/shift.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';

@Component({
  selector: 'app-comment-laundry',
  templateUrl: './comment-laundry.component.html',
  styleUrls: ['./comment-laundry.component.css']
})
export class CommentLaundryComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) { }

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
