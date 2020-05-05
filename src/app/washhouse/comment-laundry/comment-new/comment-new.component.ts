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

  constructor(private cs: CommentService,
              private router: Router,
              private authService: AuthService) {

    this.commentnewForm  = new FormGroup({
      'situation': new FormControl(''),
      'textPosition': new FormControl(''),
      'data_situation': new FormControl(''),
      'summa': new FormControl('')
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

  changePosition(chPosition: any, elem: HTMLInputElement) {
    this.commentnewForm.controls[elem.id].setValue(chPosition.name);
  }


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
              console.log('приняли с картинками');
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

    if (!Number(this.commentnewForm.controls['summa'].value)) {
      this.sError = 'Внесите сумму.';
      return;
    }

    const curPosition =  this.positionList.find( el => el.name === this.commentnewForm.controls['textPosition'].value);

    if (!curPosition) {
      this.sError = 'Должность не найдена.';
      return;
    }

    this.cs.setNewMessage(this.id_user_vict, curPosition.id, this.id_branch_vict,
                          this.commentnewForm.controls['situation'].value,
                          this.commentnewForm.controls['data_situation'].value,
                          this.commentnewForm.controls['summa'].value).subscribe( value => {

      if (this.indexImg > 0) {
        this.onPostImageAvatar(value['insertId']);
      } else {
          console.log('приняли без картинок');
      }

      });

  }
}
