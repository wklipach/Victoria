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
  private detailList: any;

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private excel: ExcelService
  ) { }

  ngOnInit(): void {

    console.log('a2');

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
       this.alTitle = value[0];

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

    this.excel.excelAcceptanceLaundryLast(this.alTitle, this.detailList)

/*

    const title = 'Передача белья';
    // this.excel.generateExcel();
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Acceptance Laundry');
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // const subTitleRow = worksheet.addRow(['Date : ' + '01-01-2010']);

    const dPipe = new DatePipe('ru');

    worksheet.addRow([dPipe.transform(new Date(), 'dd.MM.yyyy   HH.mm')]);

    const tArray = [];
    tArray.push(['Псевдоним:', this.alTitle.nick]);
    tArray.push(['Фамилия:', this.alTitle.surname]);
    tArray.push(['Имя:', this.alTitle.usernane]);
    tArray.push(['Отчество:', this.alTitle.patronymic]);
    tArray.push(['Филиал:', this.alTitle.branchname]);
    tArray.push(['Смена от:', dPipe.transform(this.alTitle.shiftdate, 'dd.MM.yyyy   HH.mm')]);
    tArray.push(['Дата передачи:', dPipe.transform(this.alTitle.date_oper, 'dd.MM.yyyy   HH.mm')]);
    tArray.push(['Масса переданнного:', this.alTitle.massa + ' ' + 'кг.']);
    tArray.push([]);
    tArray.forEach(d => {
      const row = worksheet.addRow(d);
    });

    const col1 = worksheet.getColumn(1);
    col1.width = 20;
    const col2 = worksheet.getColumn(2);
    col2.width = 20;
    col2.alignment = { horizontal: 'left'};
    const col3 = worksheet.getColumn(3);
    col3.width = 20;

// передача массива отчета для отчета
    const tT = worksheet.addRow(['наимнование', 'количество', 'поврежденность']);
    tT.font = {bold: true };
    this.detailList.forEach(d => {
      // const arr = Object.keys(d).map(key => d[key]);

      let sLine = 'прямое';
      if (d.bitspoiled === 1) {
        sLine = 'поврежденное';
      }
      const arr = [d.name + ' ' + d.type, d.quant, sLine];
      const row = worksheet.addRow(arr);

    });


    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AcceptanceLaundryLast.xlsx');
    });
*/
  }
}
