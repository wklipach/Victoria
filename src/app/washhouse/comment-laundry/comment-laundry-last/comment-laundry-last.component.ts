import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth-service.service';
import {ExcelService} from '../../../services/excel.service';
import {DatePipe} from '@angular/common';
import {GlobalRef} from '../../../services/globalref';

@Component({
  selector: 'app-comment-laundry-last',
  templateUrl: './comment-laundry-last.component.html',
  styleUrls: ['./comment-laundry-last.component.css']
})
export class CommentLaundryLastComponent implements OnInit {

  id_user_vict = -1;
  id_branch_vict = -1;
  nick = '';
  branch_name = '';
  position_name = '';
  date_from = '';
  situation = '';
  data_situation = '';
  summa = '0';
  res: any;
  imageResGlobal = [];

  constructor(private cs: CommentService,
              private router: Router,
              private excel: ExcelService,
              private gr: GlobalRef,
              private authService: AuthService) { }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
      this.id_branch_vict = Res.id_branch_vict;
      this.nick = Res.victUserName;
    }

    this.cs.getGetLastMessage(this.id_user_vict, this.id_branch_vict).subscribe( value => {

      if (value[0]) {
        const dPipe = new DatePipe('ru');
        this.date_from =  dPipe.transform(value[0].date_from, 'dd.MM.yyyy   HH.mm');
        this.branch_name = value[0].branch_name;
        this.position_name = value[0].position_name;
        this.situation = value[0].situation;
        this.data_situation = value[0].data_situation;
        this.summa = value[0].summa;
        this.loadImageFromBase(value[0].id);
        this.res = value[0];
      }
    });
  }


  loadImageFromBase(id_message) {
    const imageRes = [];
    this.cs.getMessageImageList(id_message).subscribe((aRes: Array<any>) => {
      if (aRes[0]) {

        aRes.forEach((element, ih) => {
            imageRes.push(this.gr.sUrlImageGlobal + element.name);
        });
        this.imageResGlobal = imageRes;
      }
    });
  }

  back() {
    this.router.navigate(['/laundry']);
  }

  toExcel() {
      this.excel.excelMessageLaundryLast(this.nick, this.res);
    }
}
