import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf/dist/jspdf.min';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'

})
export class PdfService {

  constructor() { }


  setFirstLine(): number {
    return 10;
  }

  setNextLine(y): number {
    return y + 5;
  }

  getColumnOne(): number {
    return 10;
  }

  getColumnTwo(): number {
    return 50;
  }


  savepdf(alTitle, detailList, sTitle, sOper) {

    const doc = new jsPDF();
    // doc.text(200, 299, 'Hello world!');
    //    doc.setFontStyle("bold");
    //     doc.setFontSize("10");
    //

    let curLine = this.setFirstLine();

    // время в заголовке
    const dPipe = new DatePipe('ru');
    doc.setFontSize(8);
    doc.text(this.getColumnOne(), curLine, dPipe.transform(new Date(), 'dd.MM.yyyy   HH.mm'));


    // псевдоним
    curLine = this.setNextLine(curLine);
    doc.setFontSize(8);
    doc.setFontStyle('bold');
    doc.text('Псевдоним:', this.getColumnOne(), curLine);
    doc.setFontSize(10);
    doc.setFontStyle('normal');
    doc.text(alTitle.nick, this.getColumnTwo(), curLine);



    doc.save('washing-laundry.pdf');



/*
    'Псевдоним:'+ alTitle.nick;
    'Фамилия:'+ alTitle.surname;
    'Имя:'+ alTitle.usernane;
    'Отчество:'+ alTitle.patronymic;
    'Филиал:'+ alTitle.branchname;
    'Смена от:'+ dPipe.transform(alTitle.shiftdate, 'dd.MM.yyyy   HH.mm');
    'Дата передачи:'+ dPipe.transform(alTitle.date_oper, 'dd.MM.yyyy   HH.mm';
    'Масса переданнного:'+ alTitle.massa + ' ' + 'кг.';
    if (alTitle.address) {
      tArray.push(['Адрес передачи:', alTitle.address]);
    }

//    doc.text(30, 20, 'Hello world!');
//    doc.addPage('1800', '900');


//    doc.text(120, 20, 'BOOKINGS');
 doc.setFontStyle("bold");
*/

  }


}
