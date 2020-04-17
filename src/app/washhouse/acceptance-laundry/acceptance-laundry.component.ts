import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ShiftService} from '../../services/shift.service';
import {Check} from '../../static/check';

@Component({
  selector: 'app-acceptance-laundry',
  templateUrl: './acceptance-laundry.component.html',
  styleUrls: ['./acceptance-laundry.component.css']
})
export class AcceptanceLaundryComponent implements OnInit {

  public acclaundform: FormGroup;
  sError = '';
  bItIsAdmin = false;
  id_user_vict = -1;
  public intAddress = 1;

  // Цвет вадидации, элемент, разрешенное из базыколичество, показываемое на экране значение
  arrayFlag: [number, string, number, string][] = [[0, 'init', -1, 'init']];

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {

    this.acclaundform  = new FormGroup({
      'n1': new FormControl('', [Validators.required, this.flagValidator('n1')]),
      'n2': new FormControl('', [Validators.required, this.flagValidator('n2')]),
      'n3': new FormControl('', [Validators.required, this.flagValidator('n3')]),
      'n4': new FormControl('', [Validators.required, this.flagValidator('n4')]),
      'n5': new FormControl('', [Validators.required, this.flagValidator('n5')]),
      'n6': new FormControl('', [Validators.required, this.flagValidator('n6')]),
      'n7': new FormControl('', [Validators.required, this.flagValidator('n7')]),
      'n8': new FormControl('', [Validators.required, this.flagValidator('n8')]),
      'n9': new FormControl('', [Validators.required, this.flagValidator('n9')]),
      'n10': new FormControl('', [Validators.required, this.flagValidator('n10')]),
      'n11': new FormControl('', [Validators.required, this.flagValidator('n11')]),
      'n12': new FormControl('', [Validators.required, this.flagValidator('n12')]),
      'n13': new FormControl('', [Validators.required, this.flagValidator('n13')]),
      'n14': new FormControl('', [Validators.required, this.flagValidator('n14')]),
      'n15': new FormControl('', [Validators.required, this.flagValidator('n15')]),
      'n16': new FormControl('', [Validators.required, this.flagValidator('n16')]),
      'n17': new FormControl('', [Validators.required, this.flagValidator('n17')]),
      'n18': new FormControl('', [Validators.required, this.flagValidator('n18')]),
      'n19': new FormControl('', [Validators.required, this.flagValidator('n19')]),
      'n1_spoiled': new FormControl('', [Validators.required, this.flagValidator('n1_spoiled')]),
      'n2_spoiled': new FormControl('', [Validators.required, this.flagValidator('n2_spoiled')]),
      'n3_spoiled': new FormControl('', [Validators.required, this.flagValidator('n3_spoiled')]),
      'n4_spoiled': new FormControl('', [Validators.required, this.flagValidator('n4_spoiled')]),
      'n5_spoiled': new FormControl('', [Validators.required, this.flagValidator('n5_spoiled')]),
      'n6_spoiled': new FormControl('', [Validators.required, this.flagValidator('n6_spoiled')]),
      'n7_spoiled': new FormControl('', [Validators.required, this.flagValidator('n7_spoiled')]),
      'n8_spoiled': new FormControl('', [Validators.required, this.flagValidator('n8_spoiled')]),
      'n9_spoiled': new FormControl('', [Validators.required, this.flagValidator('n9_spoiled')]),
      'n10_spoiled': new FormControl('', [Validators.required, this.flagValidator('n10_spoiled')]),
      'n11_spoiled': new FormControl('', [Validators.required, this.flagValidator('n11_spoiled')]),
      'n12_spoiled': new FormControl('', [Validators.required, this.flagValidator('n12_spoiled')]),
      'n13_spoiled': new FormControl('', [Validators.required, this.flagValidator('n13_spoiled')]),
      'n14_spoiled': new FormControl('', [Validators.required, this.flagValidator('n14_spoiled')]),
      'n15_spoiled': new FormControl('', [Validators.required, this.flagValidator('n15_spoiled')]),
      'n16_spoiled': new FormControl('', [Validators.required, this.flagValidator('n16_spoiled')]),
      'n17_spoiled': new FormControl('', [Validators.required, this.flagValidator('n17_spoiled')]),
      'n18_spoiled': new FormControl('', [Validators.required, this.flagValidator('n18_spoiled')]),
      'n19_spoiled': new FormControl('', [Validators.required, this.flagValidator('n19_spoiled')]),
      'massa': new FormControl('', [Validators.required, this.flagValidator('massa')])
    });

    this.setColorArray();

  }

///// VALIDATORS

  flagValidator(sname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const flagRgEx: RegExp = /^0*[1-9]\d*$/;
      if (!control.value) {
        return {};
      }

      if (flagRgEx.test(control.value)) {
        return null;
      }

      if (!flagRgEx.test(control.value)) {
        return {victoriaValidator: 'Введите целое положительное значение.'};
      }

    };
  }

  getErrorText(el) {
    if (!this.acclaundform.controls[el].errors) {
      return '';
    }

    if (this.acclaundform.controls[el].errors['victoriaValidator']) {
      return this.acclaundform.controls[el].errors['victoriaValidator'];
    } else {
      return '';
    }
  }

  getClassName(el): string {
    if (!this.acclaundform.controls[el].touched) {
      return  'form-control';
    }

    if (this.acclaundform.controls[el].value === '') {
      return 'form-control';
    }

    if (this.acclaundform.controls[el].invalid) {
      return 'form-control is-invalid';
    }

    if (this.acclaundform.controls[el].valid) {
      return  'form-control is-valid';
    }
  }

  clickPage($event: number) {
    console.log('intAddress=', $event);
    this.intAddress = $event;
  }

  setColorArray() {
    Object.keys(this.acclaundform.controls).forEach(key => {
      this.arrayFlag.push([0, key, -1, '']);
    });
  }

///// END VALIDATORS

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }


    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
      this.authService.getItIsAdmin(Res.id_user_vict).subscribe( value => {
        if (value === true) {
          this.bItIsAdmin = true;
        }
    });
    }
    if (!ShiftService.getShift()) {
      this.router.navigate(['/']);
    }

 }


  send_data() {

    this.sError = '';

    // проверка переданной формы на хоть какие-то введенные значения, кроме массы
    if (Check.getFormDirty(this.acclaundform)) {
      this.sError = 'Найдены нецифровые значения.';
      return;
    }

    if (!Check.getFormPositive(this.acclaundform)) {
      this.sError = 'Не найдено передаваемых значений.';
      return;
    }

    if (!Check.checkValueMassa(this.acclaundform)) {
      this.sError = 'Вы не указали массу белья.';
      return;
    }

    const res_user = this.authService.loginStorage();
    const id_branch = this.authService.getBranch(res_user.id_user_vict);
    this.shiftservice.get_shiftuserbranch(res_user.id_user_vict, id_branch).subscribe( shift => {

      if (shift[0]) {
        // прием белья в проводку в базе применительно к смене
        this.ls.setacceptance(this.acclaundform.value, shift[0].id, this.intAddress).subscribe( value => {
          console.log('value', value);
          if (value === true) {

            this.router.navigate(['/acceptance_laundry_last']);
          }
        });
      }
      });

  }

}
