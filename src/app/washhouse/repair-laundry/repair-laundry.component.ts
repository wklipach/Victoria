import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ShiftService} from '../../services/shift.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Check} from '../../static/check';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-repair-laundry',
  templateUrl: './repair-laundry.component.html',
  styleUrls: ['./repair-laundry.component.css']
})
export class RepairLaundryComponent implements OnInit {
  repairForm: FormGroup;
  sError = '';
  id_user_vict = -1;
  public intAddress = 1;

  // Цвет вадидации, элемент, разрешенное из базы количество, показываемое на экране значение
  arrayFlag: [number, string, number, string][] = [[0, 'init', -1, 'init']];

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {
    this.repairForm  = new FormGroup({
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
      'massa': new FormControl('', [Validators.required, Check.massaValidator('massa')])
    });

    this.setColorArray();
    this.setAllFlagFromCicle();
  }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }

    if (!ShiftService.getShift()) {
      this.router.navigate(['/']);
    }
    if (Res.bVictConnected) {
      this.id_user_vict = Res.id_user_vict;
    }
  }


  getClassName(el): string {
    if (!this.repairForm.controls[el].touched) {
      return  'form-control';
    }

    if (this.repairForm.controls[el].value === '') {
      return 'form-control';
    }

    if (this.repairForm.controls[el].invalid) {
      return 'form-control is-invalid';
    }

    if (this.repairForm.controls[el].valid) {
      return  'form-control is-valid';
    }
  }


  getErrorAndText(el: string) {
    const arrRes = this.arrayFlag.find(element => element[1] === el);
    if (!this.repairForm.controls[el].errors) {
      if (arrRes[2] > 0) {
            return arrRes[2]; } else {
            return '';
      }
    }

    if (this.repairForm.controls[el].errors['victoriaValidator']) {
      return this.repairForm.controls[el].errors['victoriaValidator'];
    } else {
      if (arrRes[2] > 0) {
        return arrRes[2]; } else {
        return '';
      }
    }
  }

  getMassaText(el) {
    if (!this.repairForm.controls[el].errors) {
      return '';
    }

    if (this.repairForm.controls[el].errors['victoriaValidator']) {
       return this.repairForm.controls[el].errors['victoriaValidator'];
    } else {
      return '';
    }
  }

/*
  flagValidator(sname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const massaRgEx: RegExp = /^0*[1-9]\d*$/;

      if (!control.value) {
        return {};
      }

      const arrRes = this.arrayFlag.find(element => element[1] === sname);

      if (!massaRgEx.test(control.value)) {
        return {victoriaValidator: 'Введите целое положительное число, не более ' + arrRes[2]};
      }

      if (control.value) {
        if (arrRes[2] < control.value ) {
          return {victoriaValidator: 'В наличии ' + arrRes[2]};
        }
      }
      return null;
    };
  }
 */

/*
  massaValidator(sname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const massaRgEx: RegExp = /^0*[1-9]\d*$/;
      console.log('sname', sname);
      console.log('endsname');
      if (!control.value) {
        return {};
      }

      if (massaRgEx.test(control.value)) {
        return null;
      }

      if (!massaRgEx.test(control.value)) {
        return {victoriaValidator: 'Масса белья - целое положительное значение.'};
      }

    };
  }
*/
///// VALIDATORS

/// NEW


  checkAllValue(): boolean {
    let boolRes = true;
    this.arrayFlag.forEach(arr => {
      if (arr[1] !== 'massa') {
        if (this.repairForm.controls[arr[1]]) {
          const sVal = this.repairForm.controls[arr[1]].value.toString().trim();
          const numberVal = Check.stringToNumber(sVal);
          if (numberVal > arr[2]) {
            boolRes = false;
          }
        }
      }
    });

    return boolRes;
  }


// делаем недоступными элементы которых нет
  disableControlsUpdateValidators() {
    this.arrayFlag.forEach(arr => {
      if (arr[1] !== 'massa') {
        if (arr[2] === 0) {
          console.log('выключаем элемент', arr[1]);
          if (this.repairForm.controls[arr[1]]) {
            if (this.repairForm.controls[arr[1]].value === '') {
              this.repairForm.controls[arr[1]].disable();
            }
          }
        } else {
          console.log('включаем элемент', arr[1]);
          if (this.repairForm.controls[arr[1]]) {
            this.repairForm.controls[arr[1]].enable();
          }
        }
      }
      if (this.repairForm.controls[arr[1]]) {
        this.repairForm.controls[arr[1]].updateValueAndValidity();
      }
    });
  }

  setColorArray() {
    Object.keys(this.repairForm.controls).forEach(key => {
      this.arrayFlag.push([0, key, -1, '']);
    });
  }

  /// END NEW



  setCokorFlag(key, value) {
    const arrRes = this.arrayFlag.find(element => element[1] === key);

    if (arrRes !== undefined) {
      arrRes[0] = value;
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
    this.ls.getValidatorsRepair(this.intAddress, id_branch).subscribe(
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


  send_data() {

    this.sError = '';

    // проверка переданной формы на хоть какие-то введенные значения, кроме массы
    if (Check.getFormDirty(this.repairForm)) {
      this.sError = 'Найдены нецифровые значения.';
      return;
    }

    if (!Check.getFormPositive(this.repairForm)) {
      this.sError = 'Не найдено передаваемых значений.';
      return;
    }

    if (!Check.checkValueMassa(this.repairForm)) {
      this.sError = 'Вы не указали массу белья.';
      return;
    }

    // очистка старого массива с валидацией
    this.arrayFlag.forEach( arr => {
      arr[2] = 0;
      arr[3] = '';
    });

    // петегружаем данные в таблицу для валидации
    const id_branch = this.authService.getBranch(this.id_user_vict);
    this.ls.getValidatorsRepair(this.intAddress, id_branch).subscribe(
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

        // 1 обновляем все валидаторы, но даже обнуленные доступны, если в них что-то есть
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
                this.ls.setrepair(this.repairForm.value, shift[0].id, this.intAddress).subscribe( value => {
                  console.log('value', value);
                  if (value === true) {
                    this.router.navigate(['/repair_laundry_last']);
                  }
                });
              }
            }); // shift subscribe

        }); // all subscribe

  }

  clickPage($event: number) {
    console.log('intAddress=', $event);
    this.intAddress = $event;
    this.setAllFlagFromCicle();
  }

  globalOnClickMinus(el: string) {
    if (this.repairForm) {
      if (this.repairForm.controls[el]) {

        if (this.getClassName(el) === 'form-control is-invalid' ||
          this.repairForm.controls[el].disabled) {
          this.repairForm.controls[el].setValue('');
          return;
        }

        let sVal = this.repairForm.controls[el].value.toString().trim();
        if (Check.ZeroOrPositive(sVal)) {
          if (sVal === '0' || sVal === '1') {
            sVal = 1;
          } else {
            sVal = (Number(sVal) - 1).toString();
          }
        } else {
          sVal = 1;
        }

        this.repairForm.controls[el].setValue(sVal);
      }
    }
  }

  globalOnClickPlus(el: string) {
    if (this.repairForm) {
      if (this.repairForm.controls[el]) {

        if (this.getClassName(el) === 'form-control is-invalid' ||
          this.repairForm.controls[el].disabled) {
          this.repairForm.controls[el].setValue('');
          return;
        }

        let sVal = this.repairForm.controls[el].value.toString().trim();
        if (Check.ZeroOrPositive(sVal)) {
          if (sVal === '0') {
            sVal = 1;
          } else {
            sVal = (Number(sVal) + 1).toString();
          }
        } else {
          sVal = 1;
        }

        this.repairForm.controls[el].setValue(sVal);
      }
    }
  }
}
