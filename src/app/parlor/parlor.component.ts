import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalRef} from '../services/globalref';

@Component({
  selector: 'app-parlor',
  templateUrl: './parlor.component.html',
  styleUrls: ['./parlor.component.css']
})
export class ParlorComponent implements OnInit {

  form: FormGroup;
  loading = false;
  public sAvatarPath  = '';

  public nick = '';
  public id_user_vict = -1;



  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private gr: GlobalRef) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: ''
    });
  }

  ngOnInit(): void {

    console.log('parlor1');
      const Res = this.authService.loginStorage();
    console.log('parlor2', Res);
      if (!Res.bVictConnected) {
        this.router.navigate(['/login']);
      }

    console.log('parlor3');

    if (Res.bVictConnected) {

      console.log('parlor4');

      this.nick = Res.victUserName;
      this.id_user_vict = Res.id_user_vict;
      this.onLoadFromBaseAvatar();
    }

  }


  onFileChange(event) {
    console.log('работаем с картинками');
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {

      const file: File = event.target.files[0];
      // todo 164
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const tempImg = new Image();
        if (typeof reader.result === 'string') {
          tempImg.src = reader.result;
        }

        tempImg.onload = () => {
          const dataURL = this.ResizeImage(tempImg);
          this.form.get('avatar').setValue({
            value: dataURL.split(',')[1]
          });

          this.form.get('name').setValue(file.name);

          this.onPostImageAvatar();
        };
      };
    }
  } // onFileChange(event)

  onPostImageAvatar() {
    console.log('onPostImageAvatar');
    const formModel = this.prepareSave();
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.authService.updateAvatarUserTable( {'Avatar': formModel.get('avatar'), 'Name': formModel.get('name') }, this.id_user_vict).subscribe(() => {
      this.loading = false;
      this.onLoadFromBaseAvatar();
    });
  }

  onClearImageAvatar() {
    const formModel = this.prepareSave();
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.authService.clearAvatarUserTable(this.id_user_vict).subscribe(() => {
      this.loading = false;
      this.onLoadFromBaseAvatar();
    });
  }

  onLoadFromBaseAvatar() {
    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {
      console.log('aRes', aRes);
      const S = aRes[0].avatar_name;
      if (S !== '""' && (S)) {
        if (typeof S !== 'undefined') {
          if (S.length > 0) {
            this.sAvatarPath = this.gr.sUrlAvatarGlobal + S;
          }
        }
      }
    });

  }

  private prepareSave(): FormData {
    const input: FormData = new FormData();
    // tslint:disable-next-line:max-line-length
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    // input.
    input.append('name', this.form.get('name').value);
    input.append('avatar', JSON.stringify(this.form.get('avatar').value));
    return input;
  }

  ResizeImage(tempImg: HTMLImageElement): string {
    const MAX_WIDTH = 200;
    const MAX_HEIGHT = 200;
    let tempW = tempImg.width;
    let tempH = tempImg.height;
    if (tempW > tempH) {
      if (tempW > MAX_WIDTH) {
        tempH *= MAX_WIDTH / tempW;
        tempW = MAX_WIDTH;
      }
    } else {
      if (tempH > MAX_HEIGHT) {
        tempW *= MAX_HEIGHT / tempH;
        tempH = MAX_HEIGHT;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = tempW;
    canvas.height = tempH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(tempImg, 0, 0, tempW, tempH);
    const dataURL = canvas.toDataURL('image/png');

    return dataURL;
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.form.get('name').setValue(null);
    this.sAvatarPath = '';
    this.onClearImageAvatar();
  }

}
