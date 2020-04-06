import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {



  constructor() { }

  generateExcel(detailList: any) {

    const title = 'Car Sell Report';
    const header = ['Year', 'Month', 'Make', 'Model', 'Quantity', 'Pct'];
    const data_excel = [
      [2007, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
      [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5],
      [2007, 1, 'Toyota ', 'Toyota Avensis', 787, 6.2],
      [2007, 1, 'Volkswagen ', 'Volkswagen Golf', 720, 5.7],
      [2007, 1, 'Toyota ', 'Toyota Corolla', 691, 5.4]
    ];

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Car Data');

        const titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
        const subTitleRow = worksheet.addRow(['Date : ' + new Date().getDate().toString()]);

        console.log('data_excel');
        console.log(data_excel);

    console.log('detailList');
    console.log(detailList);

        data_excel.forEach(d => {
            const row = worksheet.addRow(d);
            const qty = row.getCell(5);
            let color = 'FF99FF99';
            if (+qty.value < 500) {
              color = 'FF9999';
            }
            qty.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: color }
            };
          }
        );




        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'CarData.xlsx');
        });

        return true;
  }

  excelAcceptanceLaundryLast(alTitle, detailList, sTitle, sOper) {


    const title = sTitle;
    // this.excel.generateExcel();
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Laundry');
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // const subTitleRow = worksheet.addRow(['Date : ' + '01-01-2010']);

    const dPipe = new DatePipe('ru');

    worksheet.addRow([dPipe.transform(new Date(), 'dd.MM.yyyy   HH.mm')]);

    const tArray = [];
    tArray.push(['Псевдоним:', alTitle.nick]);
    tArray.push(['Фамилия:', alTitle.surname]);
    tArray.push(['Имя:', alTitle.usernane]);
    tArray.push(['Отчество:', alTitle.patronymic]);
    tArray.push(['Филиал:', alTitle.branchname]);
    tArray.push(['Смена от:', dPipe.transform(alTitle.shiftdate, 'dd.MM.yyyy   HH.mm')]);
    tArray.push(['Дата передачи:', dPipe.transform(alTitle.date_oper, 'dd.MM.yyyy   HH.mm')]);
    tArray.push(['Масса переданнного:', alTitle.massa + ' ' + 'кг.']);
    if (alTitle.address) {
      tArray.push(['Адрес передачи:', alTitle.address]);
    }

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
    const tT = worksheet.addRow(['наимнование', 'количество', sOper]);
    tT.font = {bold: true };


    detailList.forEach(d => {
      let sLine = '';

      if ('bitspoiled' in d) {
        sLine = 'прямое';
        if (d.bitspoiled === 1) {
          sLine = 'поврежденное';
        }
      }

      if ('bitadd' in d) {
        sLine = 'приход';
        if (d.bitadd === 0) {
          sLine = 'расход';
        }
      }

      const arr = [d.name + ' ' + d.type, d.quant, sLine];
      const row = worksheet.addRow(arr);

    });


    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'LaundryLast.xlsx');
    });

  }

}
