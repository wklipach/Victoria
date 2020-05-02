import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ExcelService} from '../../services/excel.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Check} from '../../static/check';
import {ShiftService} from '../../services/shift.service';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {

  public detailList: any;
  public id_user_vict = -1;
  addworkForm: FormGroup;
  sError = '';

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService,
              private excel: ExcelService) {
    this.addworkForm  = new FormGroup({});
  }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }
    this.id_user_vict = Res.id_user_vict;
    // this.LoadInfo(this.id_user_vict);

    this.ls.getAddWork().subscribe( (value: Array<any>) => {
      this.detailList = value;
      console.log(value);

      value.forEach(d => {
        this.addworkForm.addControl(d.id, new FormControl('',
                                  [Validators.required, Check.victNullValidator(d.id)]));

      });
//      this.addworkForm.addControl('1', new FormControl('', Validators.required));
    });
  }


  getClassName(el): string {
    if (!this.addworkForm.controls[el].touched) {
      return  'form-control w-25';
    }

    if (this.addworkForm.controls[el].value === '') {
      return 'form-control w-25';
    }

    if (this.addworkForm.controls[el].invalid) {
      return 'form-control is-invalid w-25';
    }

    if (this.addworkForm.controls[el].valid) {
      return  'form-control is-valid w-25';
    }
  }

  getAddWorkText(el) {
    if (!this.addworkForm.controls[el].errors) {
      return '';
    }

    if (this.addworkForm.controls[el].errors['victoriaValidator']) {
      return this.addworkForm.controls[el].errors['victoriaValidator'];
    } else {
      return '';
    }
  }

  send_data() {
    this.sError = '';
    const mas_res = [];
    let boolPositive = false;
    Object.keys(this.addworkForm.controls).forEach(key => {
      const  sVal = Boolean(this.addworkForm.controls[key].value);
          if (sVal === true) {
            boolPositive = true;
            mas_res.push( {id: key});
          }
    });

    if (!boolPositive) {
      this.sError = 'Не найдено передаваемых значений.';
      return;
    }

    console.log('mas_res', mas_res);

        const id_branch = this.authService.getBranch(this.id_user_vict);
        this.shiftservice.get_shiftuserbranch(this.id_user_vict, id_branch).subscribe( shift => {
          if (shift[0]) {

            // прием доп. работ  в проводку в базе применительно к смене
            // console.log('shift[0]', shift[0]);
            this.ls.setAddWork(mas_res, shift[0].id).subscribe( value => {
              console.log('value', value);
               if (value === true) {
                this.router.navigate(['/addwork_laundry_last']);
               }
            });
      }
    }); // shift subscribe

  }
}
