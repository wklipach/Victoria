import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {CommentService} from '../services/comment.service';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-biblio-laundry',
  templateUrl: './biblio-laundry.component.html',
  styleUrls: ['./biblio-laundry.component.css']
})
export class BiblioLaundryComponent implements OnInit {


  id_user_vict = -1;
  id_branch_vict = -1;
  id_position_from = -1;
  arrLine = [];

  constructor(private router: Router,
              private cs: CommentService,
              private authService: AuthService) { }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
      this.id_branch_vict = Res.id_branch_vict;
    }

    this.cs.getPositionUser(this.id_user_vict, this.id_branch_vict).subscribe(value => {
      if (value[0]) {
        this.id_position_from = value[0].id_position;
        this.loadDateInstruction(this.id_user_vict, this.id_branch_vict, this.id_position_from);
      }
    });
  }


  loadDateInstruction(id_user, id_branch, id_position) {
    this.cs.getInstructionList(id_user, id_branch, id_position).subscribe((value: Array<any>) => {
      const arrLine = [];
      value[0].forEach((elem, ih) => {
        const dPipe = new DatePipe('ru'), date_from = dPipe.transform(elem.date_from, 'dd.MM.yyyy   HH.mm');
        const n = arrLine.push({id: elem.id, sFrom: elem.position_name, sDate: date_from,
          sSituationLittle: elem.little_situation, sSituationSumma: elem.summa, unread: elem.unread, InputOutput: elem.InputOutput});
      });

      this.arrLine = arrLine;

    });
  }


  createNewMessage() {
    this.router.navigate(['/biblio-new']);

  }
}
