import { Component, OnInit } from '@angular/core';
import {ShiftService} from '../../services/shift.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LaundryService} from '../services/laundry.service';
import {Check} from '../../static/check';

@Component({
  selector: 'app-washing-laundry',
  templateUrl: './washing-laundry.component.html',
  styleUrls: ['./washing-laundry.component.css']
})
export class WashingLaundryComponent implements OnInit {
  washingForm: FormGroup;
  sError = '';
  id_user_vict = -1;
  public intAddress = 1;

  // Цвет вадидации, элемент, разрешенное из базы количество, показываемое на экране значение
  arrayFlag: [number, string, number, string][] = [[0, 'init', -1, 'init']];
  boolMassa = false;

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {
    this.washingForm  = new FormGroup({
      'n1': new FormControl('', [Validators.required, Check.flagValidator('n1', this.arrayFlag)]),
      'n2': new FormControl('', [Validators.required, Check.flagValidator('n2', this.arrayFlag)]),
      'n3': new FormControl('', [Validators.required, Check.flagValidator('n3', this.arrayFlag)]),
      'n4': new FormControl('', [Validators.required, Check.flagValidator('n4', this.arrayFlag)]),
      'n5': new FormControl('', [Validators.required, Check.flagValidator('n5', this.arrayFlag)]),
      'n6': new FormControl('', [Validators.required, Check.flagValidator('n6', this.arrayFlag)]),
      'n7': new FormControl('', [Validators.required, Check.flagValidator('n7', this.arrayFlag)]),
      'n8': new FormControl('', [Validators.required, Check.flagValidator('n8', this.arrayFlag)]),
      'n9': new FormControl('', [Validators.required, Check.flagValidator('n9', this.arrayFlag)]),
      'n10': new FormControl('', [Validators.required, Check.flagValidator('n10', this.arrayFlag)]),
      'n11': new FormControl('', [Validators.required, Check.flagValidator('n11', this.arrayFlag)]),
      'n12': new FormControl('', [Validators.required, Check.flagValidator('n12', this.arrayFlag)]),
      'n13': new FormControl('', [Validators.required, Check.flagValidator('n13', this.arrayFlag)]),
      'n14': new FormControl('', [Validators.required, Check.flagValidator('n14', this.arrayFlag)]),
      'n15': new FormControl('', [Validators.required, Check.flagValidator('n15', this.arrayFlag)]),
      'n16': new FormControl('', [Validators.required, Check.flagValidator('n16', this.arrayFlag)]),
      'n17': new FormControl('', [Validators.required, Check.flagValidator('n17', this.arrayFlag)]),
      'n18': new FormControl('', [Validators.required, Check.flagValidator('n18', this.arrayFlag)]),
      'n19': new FormControl('', [Validators.required, Check.flagValidator('n19', this.arrayFlag)]),
      'n20': new FormControl('', [Validators.required, Check.flagValidator('n20', this.arrayFlag)]),
      'massa': new FormControl('', [Validators.required, Check.massaValidator('massa')])
    });

     const i_addr = this.authService.getAddressShipment();
     if (i_addr > 0) {
         this.intAddress = i_addr;
     }



    this.setColorArray();
    this.setAllFlagFromCicle();
  }

  ngOnInit(): void {

    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (!ShiftService.getShift()) {
      this.router.navigate(['/'], { state: { errorPageAccess : '1' }});
    }

    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }

  }

  setColorArray() {
    Object.keys(this.washingForm.controls).forEach(key => {
      this.arrayFlag.push([0, key, -1, '']);
    });
  }

  getClassName(el): string {
    if (!this.washingForm.controls[el].touched) {
      return  'form-control';
    }

    if (this.washingForm.controls[el].value === '') {
      return 'form-control';
    }

    if (this.washingForm.controls[el].invalid) {
      return 'form-control is-invalid';
    }

    if (this.washingForm.controls[el].valid) {
      return  'form-control is-valid';
    }
  }

  getMassaText(el) {
    if (!this.washingForm.controls[el].errors) {
      return '';
    }

    if (this.washingForm.controls[el].errors['victoriaValidator']) {
      return this.washingForm.controls[el].errors['victoriaValidator'];
    } else {
      return '';
    }
  }


  getErrorAndText2(el: string) {
    const resS = {n: '', e: ''};

    const arrRes = this.arrayFlag.find(element => element[1] === el);
    if (!this.washingForm.controls[el].errors) {
      if (arrRes[2] > 0) {
        resS.n = arrRes[2].toString();
        resS.e = '';
        return resS;
      } else {
        return resS;
      }
    }

    if (this.washingForm.controls[el].errors['victoriaValidator']) {
      resS.n = arrRes[2].toString();
      resS.e = this.washingForm.controls[el].errors['victoriaValidator'];
      return resS;
    } else {
      if (arrRes[2] > 0) {
        resS.n = arrRes[2].toString();
        resS.e = '';
        return resS;
      } else {
        return resS;
      }
    }
  }

  getErrorAndText(el: string) {
    const arrRes = this.arrayFlag.find(element => element[1] === el);
    if (!this.washingForm.controls[el].errors) {
      if (arrRes[2] > 0) {
        return arrRes[2]; } else {
        return '';
      }
    }

    if (this.washingForm.controls[el].errors['victoriaValidator']) {
      return this.washingForm.controls[el].errors['victoriaValidator'];
    } else {
      if (arrRes[2] > 0) {
        return arrRes[2]; } else {
        return '';
      }
    }
  }

  // обход массива с присвоение переменным разрешенных значений из базы
  setAllFlagFromCicle(): boolean {
    const res_user = this.authService.loginStorage();
    const id_branch = this.authService.getBranch(res_user.id_user_vict);
    // везде устанавливаем ноль разрешенного
    this.arrayFlag.forEach( arr => {
      arr[2] = 0;
      arr[3] = '';
    });
    // тут ничего нет потому что разрешены любые значения
    this.ls.getValidatorsWashing(this.intAddress, id_branch).subscribe(
      resultSet => {

        for (const resultSetKey of Object.keys(resultSet)) {
          const quant = resultSet[resultSetKey].quant;
          if (quant > 0) {
            const sElem =   'n' + resultSet[resultSetKey].id_nom.toString();
            const arrFlag = this.arrayFlag.find(element => element[1] === sElem);
            if (arrFlag) {
              arrFlag[2] = quant;
            }
          }
        }

        // делаем недоступными элементы которых нет
        this.disableControlsUpdateValidators();

      });

    return false;
  }

// делаем недоступными элементы которых нет
  disableControlsUpdateValidators() {
    this.arrayFlag.forEach(arr => {
      if (arr[1] !== 'massa') {
        if (arr[2] === 0) {
          if (this.washingForm.controls[arr[1]]) {
            if (this.washingForm.controls[arr[1]].value === '') {
              this.washingForm.controls[arr[1]].disable();
            }
          }
        } else {
          if (this.washingForm.controls[arr[1]]) {
            this.washingForm.controls[arr[1]].enable();
          }
        }
      }
      if (this.washingForm.controls[arr[1]]) {
        this.washingForm.controls[arr[1]].updateValueAndValidity();
      }
    });
  }


  checkAllValue(): boolean {
    let boolRes = true;
    this.arrayFlag.forEach(arr => {
      if (arr[1] !== 'massa') {
        if (this.washingForm.controls[arr[1]]) {
          const sVal = this.washingForm.controls[arr[1]].value.toString().trim();
          const numberVal = Check.stringToNumber(sVal);
          if (numberVal > arr[2]) {
            boolRes = false;
          }
        }
      }
    });

    return boolRes;
  }

  send_data() {

    this.sError = '';

    // проверка переданной формы на хоть какие-то введенные значения, кроме массы
    if (Check.getFormDirty(this.washingForm)) {
      this.sError = 'Найдены нецифровые значения.';
      return;
    }

    if (!Check.getFormPositive(this.washingForm)) {
      this.sError = 'Не найдено передаваемых значений.';
      return;
    }

/*
    if (!Check.checkValueMassa(this.washingForm)) {
      this.sError = 'Вы не указали массу белья.';
      return;
    }
 */

    // очистка старого массива с валидацией
    this.arrayFlag.forEach( arr => {
      arr[2] = 0;
      arr[3] = '';
    });

    // петегружаем данные в таблицу для валидации
    const id_branch = this.authService.getBranch(this.id_user_vict);
    this.ls.getValidatorsWashing(this.intAddress, id_branch).subscribe(
      resultSet => {

        for (const key of Object.keys(resultSet)) {
          const quant = resultSet[key].quant;
          if (quant > 0) {
            const sElem =   'n' + resultSet[key].id_nom.toString();
            const arrFlag = this.arrayFlag.find(element => element[1] === sElem);
            if (arrFlag) {
              arrFlag[2] = quant;
            }
          }
        }

        // 1 шаг делаем недоступными элементы которых нет и обновляем все валидаторы
        this.disableControlsUpdateValidators();

        // 2 шаг если новые значения изменились сравниваем их с введенными значениями
        // и прерываем выполнение если не сошлось
        if (!this.checkAllValue()) {
          this.sError = 'Найдены неверные значения. Проверьте форму повторно.';
          return;
        }

        this.shiftservice.get_shiftuserbranch(this.id_user_vict, id_branch).subscribe( shift => {
          if (shift[0]) {
            // прием белья в складскую проводку в базе применительно к смене
            // console.log('shift[0]', shift[0]);
            this.ls.setwashing(this.washingForm.value, shift[0].id, this.intAddress).subscribe( value => {
              console.log('value', value);
              if (value === true) {
                this.router.navigate(['/washing_laundry_last']);
              }
            });
          }
        }); // shift subscribe

      }); // all subscribe

  }

  clickPage($event: number) {
    console.log('--intAddress=', $event);
    this.intAddress = $event;
    this.setAllFlagFromCicle();
  }


  globalOnClickMinus(el: string) {
    if (this.washingForm) {
      if (this.washingForm.controls[el]) {

        if (this.getClassName(el) === 'form-control is-invalid' ||
          this.washingForm.controls[el].disabled) {
          this.washingForm.controls[el].setValue('');
          return;
        }

        let sVal = this.washingForm.controls[el].value.toString().trim();
        if (Check.ZeroOrPositive(sVal)) {
          if (sVal === '0' || sVal === '1') {
            sVal = '';
          } else {
            sVal = (Number(sVal) - 1).toString();
          }
        } else {
          sVal = '';
        }

        this.washingForm.controls[el].setValue(sVal);
      }
    }
  }

  globalOnClickPlus(el: string) {
    if (this.washingForm) {
      if (this.washingForm.controls[el]) {

        if (this.getClassName(el) === 'form-control is-invalid' ||
          this.washingForm.controls[el].disabled) {
          this.washingForm.controls[el].setValue('');
          return;
        }

        let sVal = this.washingForm.controls[el].value.toString().trim();
        if (Check.ZeroOrPositive(sVal)) {
          if (sVal === '0') {
            sVal = 1;
          } else {
            sVal = (Number(sVal) + 1).toString();
          }
        } else {
          sVal = 1;
        }

        this.washingForm.controls[el].markAsTouched();
        this.washingForm.controls[el].setValue(sVal);
      }
    }
  }

}
