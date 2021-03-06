import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ExcelService} from '../../services/excel.service';

import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-acceptance-laundry-last',
  templateUrl: './acceptance-laundry-last.component.html',
  styleUrls: ['./acceptance-laundry-last.component.css']
})
export class AcceptanceLaundryLastComponent implements OnInit {

  public id_user_vict = -1;
  public alTitle: any;
  public detailList: any;

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private excel: ExcelService
  ) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }
    this.id_user_vict = Res.id_user_vict;
    this.LoadInfo(this.id_user_vict);

  }


  LoadInfo(id_user) {
    console.log('загружаем данные');
     this.ls.getLastAcceptance(id_user, this.authService.getBranch(id_user)).subscribe( value => {
       if (value[0]) {
         this.alTitle = value[0];
       } else {
         return;
       }

       this.ls.getDetailAcceptance(value[0].id).subscribe( detail => {
          // console.log(detail);
         this.detailList = detail;
       });



     });
  }

  back() {
    this.router.navigate(['/laundry']);
 }

  toExcel() {
    if (this.detailList) {
      this.excel.excelAcceptanceLaundryLast(this.alTitle, this.detailList, 'Принято в прачечную', 'поврежденность');
    }
  }
}
