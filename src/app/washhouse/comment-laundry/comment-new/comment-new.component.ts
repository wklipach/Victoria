import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {

  commentnewForm: FormGroup;
  id_user_vict = -1;
  id_branch_vict = -1;
  fromDate: Date;
  nick = '';
  BranchName = '';
  positionList = [];
  indexImg = 0;
  loading = false;
  sError = '';
  id_position_from = 0;
  intCheckInstructuion = 0;

  constructor(private cs: CommentService,
              private router: Router,
              private authService: AuthService) {

    this.commentnewForm  = new FormGroup({
      'situation': new FormControl(''),
      'textPosition': new FormControl(''),
      'data_situation': new FormControl(''),
      'summa': new FormControl(''),
      'checkInstructuion': new FormControl('')
    });

  }

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

    this.fromDate = new Date();

    // this.id_position_from
    this.cs.getPositionUser(this.id_user_vict, this.id_branch_vict).subscribe(value => {
        if (value[0]) {
          this.id_position_from = value[0].id_position;
        }
      });

    this.authService.getBranchName(this.id_branch_vict).subscribe(
      value => {
        this.BranchName = value[0].name;
      });


    this.cs.getCheckpositionBranch(this.id_branch_vict).subscribe((value: Array<any>) => {
      value.forEach((element, ih) => {
        this.positionList.push(element);
      });
    });

  }

//  changePosition(event) {
//    const id_position =  this.commentnewForm.controls['dropdawnPosition'].value;
//    const pos =  this.positionList.find(elem => elem.id === id_position);
//    this.commentnewForm.controls['textPosition'].setValue(pos.name);
//  }


  /* РАБОТА С ИЗОБРАЖЕНИЯМИ */

  clearFile() {
    if (this.indexImg === 0) {
      return;
    }
    this.deleteImgElemet(this.indexImg);
    this.indexImg = this.indexImg - 1;
  }

  deleteImgElemet(id) {
    const image = <HTMLImageElement>document.getElementById('img' + id.toString());
    console.log('image.src', image.src);
    if (image !== undefined) {
      image.remove();
    } else {
      console.log('Image is undefined');
    }

  }


  onFileChange(fileInput)  {
    const files = fileInput.target.files;
    if (files.length === 0) {
      console.log('No files selected');
      return;
    }
    this.indexImg = this.indexImg + 1;
    const indexImg = this.indexImg;
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.id = 'img' + indexImg.toString();

      let ext = '';
      const  parts = files[0].name.split('.');
      if (parts.length > 1) {
        ext = parts.pop();
      }
      img.title = ext;
      console.log(files[0].name, ext);
      img.height = 200;
      img.onload = function() {
        document.body.appendChild(img);
      };
      img.src = <string>event.target.result;
    };
    reader.readAsDataURL(files[0]);
  }

  onPostImageAvatar(id_message) {
    console.log('onPostImageAvatar');
    this.loading = true;
    // tslint:disable-next-line:max-line-length

    for (let i = 1;  i <= this.indexImg; i++) {
      const image = <HTMLImageElement>document.getElementById('img' + i.toString());
      console.log('image', image);
      console.log('image.src', image.src);
      if (image !== undefined) {
        this.authService.updateImageMessageTable(image.src, image.title, id_message, i).subscribe(() => {
          this.loading = false;

          if (i === this.indexImg) {
            this.router.navigate(['/comment_laundry_last']);
          }

        });
      }
    }
  } // onPostImageAvatar() {
  /* КОНЕЦ РАБОТЫ С ИЗОБРАЖЕНИЯМИ */

  saveMassage() {

    this.sError = '';

    if (this.commentnewForm.controls['situation'].value === '') {
      this.sError = 'Опишите ситуцию.';
      return;
    }

    if (this.commentnewForm.controls['data_situation'].value === '') {
      this.sError = 'Добавьте данные по ситуации.';
      return;
    }

    if (this.commentnewForm.controls['textPosition'].value === '') {
      this.sError = 'Выберите должность получателя.';
      return;
    }

    // если это не инструкция проверяем внесена ли сумма
    if (this.intCheckInstructuion === 0) {
      if (!Number(this.commentnewForm.controls['summa'].value)) {
        this.sError = 'Внесите сумму.';
        return;
      }
    }

    // если это инструкция проверяем вносим сумму 0
    if (this.intCheckInstructuion === 1) {
      this.commentnewForm.controls['summa'].setValue('0');
    }


    const curPosition =  this.positionList.find( el => el.id.toString() === this.commentnewForm.controls['textPosition'].value);

    if (!curPosition) {
      this.sError = 'Должность не найдена.';
      return;
    }

    this.cs.setNewMessage(this.id_user_vict, this.id_position_from, curPosition.id, this.id_branch_vict,
                          this.commentnewForm.controls['situation'].value,
                          this.commentnewForm.controls['data_situation'].value,
                          this.commentnewForm.controls['summa'].value,
                          this.intCheckInstructuion).subscribe( value => {

      if (this.indexImg > 0) {
        this.onPostImageAvatar(value['insertId']);
      } else {
        this.router.navigate(['/comment_laundry_last']);
      }

      });

  }

  OnCheckInstructuion() {
    console.log('checkInstructuion', this.commentnewForm.controls['checkInstructuion'].value);
    if (Boolean(this.commentnewForm.controls['checkInstructuion'].value) === true) {
      this.intCheckInstructuion = 1;
      this.commentnewForm.controls['summa'].setValue('0');
      this.commentnewForm.controls['summa'].disable();
    } else {
      this.intCheckInstructuion = 0;
      this.commentnewForm.controls['summa'].enable();
    }

  }
}
