import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ShiftService} from '../../services/shift.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-repair-laundry',
  templateUrl: './repair-laundry.component.html',
  styleUrls: ['./repair-laundry.component.css']
})
export class RepairLaundryComponent implements OnInit {
  repairForm: FormGroup;
  sError = '';
  id_user_vict = -1;
  // Цвет вадидации, элемент, разрешенное из базы количество, показываемое на экране значение
  arrayFlag: [number, string, number, string][] = [[0, 'init', -1, 'init']];

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {
    this.repairForm  = new FormGroup({
      'n1': new FormControl('', [Validators.required]),
      'n2': new FormControl('', [Validators.required]),
      'n3': new FormControl('', [Validators.required]),
      'n4': new FormControl('', [Validators.required]),
      'n5': new FormControl('', [Validators.required]),
      'n6': new FormControl('', [Validators.required]),
      'n7': new FormControl('', [Validators.required]),
      'n8': new FormControl('', [Validators.required]),
      'n9': new FormControl('', [Validators.required]),
      'n10': new FormControl('', [Validators.required]),
      'n11': new FormControl('', [Validators.required]),
      'n12': new FormControl('', [Validators.required]),
      'n13': new FormControl('', [Validators.required]),
      'n14': new FormControl('', [Validators.required]),
      'n15': new FormControl('', [Validators.required]),
      'n16': new FormControl('', [Validators.required]),
      'n17': new FormControl('', [Validators.required]),
      'n18': new FormControl('', [Validators.required]),
      'n19': new FormControl('', [Validators.required]),
      'massa': new FormControl('', [Validators.required])
    });

    this.setColorArray();
    this.setAllFlagFromCicle();
  }

  ///// VALIDATORS
  setColorArray() {
    Object.keys(this.repairForm.controls).forEach(key => {
      this.arrayFlag.push([0, key, -1, '']);
    });
  }

  getCokorFlag(key): [number, string] {
    const arrRes = this.arrayFlag.find(element => element[1] === key);

    if (arrRes === undefined) {
      return [0, ''];
    } else {
      return [arrRes[0], arrRes[3]];
    }
  }

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
    this.ls.getValidatorsRepair(id_branch).subscribe(
      resultSet => {
        // tslint:disable-next-line:forin
        for (const resultSetKey in resultSet) {
          const quant = resultSet[resultSetKey].quant;
          if (quant > 0) {
            const sElem =   'n' + resultSet[resultSetKey].id_nom.toString();
            const arrFlag = this.arrayFlag.find(element => element[1] === sElem);
            if (arrFlag) {
              arrFlag[2] = quant;
              arrFlag[3] = 'В наличии ' + quant.toString();
            }
          }
        }

        // делаем недоступными элементы которых нет
        this.arrayFlag.forEach( arr => {
          if (arr[1] !== 'massa') {
            if (arr[2] === 0) {
              if (this.repairForm.controls[arr[1]]) {
                arr[3] = 'Нет в наличии';
                this.repairForm.controls[arr[1]].disable();
              }
            }
          }
        });



        this.send_data_with_refresh();

      });

    return false;

  }
  // проверка массива на введенные значения
  getAllFlagFromCicle(): boolean {
    // тут мои присваивания элементам правильных значений
    let resBoolean = true;
    Object.keys(this.repairForm.controls).forEach(key => {

      if (!this.checkValue(this.repairForm.controls[key], key)) {
        resBoolean = false;
      }
    });

    return resBoolean;
  }


  // проверка массива на хоть какие-то введенные значения
  getAllFlagNotEmpty(): boolean {
    // тут мои присваивания элементам правильных значений
    let resBoolean = false;
    Object.keys(this.repairForm.controls).forEach(key => {

      const  sVal = this.repairForm.controls[key].value.toString().trim();
      if (sVal !== '' && sVal !== '0'.toString() && key.toString() !== 'massa' ) {
        resBoolean = true;
      }
    });

    return resBoolean;
  }



  onChandeValid(elName: string) {
    const formControl   = this.repairForm.controls[elName];
    if (formControl) {
      const res = this.checkValue(formControl, elName);
    }
  }


  checkValue(formControl, key): boolean {
    let resBoolean = true;
    const sVal = formControl.value.toString().trim();
    const arrRes = this.arrayFlag.find(element => element[1] === key);

    if (arrRes !== undefined) {

      // особый случай не введена масса белья
    if (key.toString() === 'massa') {
        if (isNaN(Number(sVal))) {
          arrRes[0] = 1;
          arrRes[3] = 'Введите массу белья, кг';
          resBoolean = false;
        } else {
          if (Number(sVal) <= 0) {
          arrRes[0] = 1;
          arrRes[3] = 'Введите массу белья, кг';
          resBoolean = false;
        } else {
          arrRes[0] = 2;
          arrRes[3] = '';
          resBoolean = true;
        }
        return resBoolean;
      }
    }


      // если это любой другой элемент
        if (this.isMyNumber(arrRes, sVal)) {
          console.log('truekey', key);
          return true;
        } else {
          console.log('falsekey', key, arrRes);
          return false;
        }
      }
      return resBoolean;
  }


   isMyNumber(arrRes, sVal): boolean {



     if (sVal !== '') {
      if (isNaN(Number(sVal))) {
          arrRes[0] = 1;
          arrRes[3] = 'Введите цифровое значение. Максимум ' + arrRes[2].toString();
          return false;
      } else {
        if (Number(sVal) <= 0) {
            arrRes[0] = 1;
            arrRes[3] = 'Введите положительное значение. Максимум ' + arrRes[2].toString();
            return false;
        } else {
           if (Number(sVal) > arrRes[2]) {
             arrRes[0] = 1;
             arrRes[3] = 'Вы не можете ввести столько. Максимум ' + arrRes[2].toString();
             return false;
           } else {
             arrRes[0] = 2;
             arrRes[3] = 'В наличии ' + arrRes[2].toString();
             return true;
           }
        }
      }
    }

     arrRes[0] = 0;
     if (arrRes[2] > 0) {
       arrRes[3] = 'В наличии ' + arrRes[2].toString();
     } else {
       arrRes[3] = '';
     }
     return true;
   }

///// END VALIDATORS


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


  checkValueMassa() {
    let bRes = true;
    let sVal = this.repairForm.controls['massa'].value.toString().trim();
    if (sVal === '') {
      sVal = '0';
    }
    if (Number(sVal) <= 0) {bRes = false; }
    return bRes;
  }

  checkValueInt() {
    // tslint:disable-next-line:no-unused-expression
    let sVal = '';
    let bRes = true;
    Object.keys(this.repairForm.controls).forEach(key => {
      sVal = this.repairForm.controls[key].value.toString().trim();
      if (sVal === '') {
        sVal = '0';
      }
      if (isNaN(Number(sVal))) {
        bRes = false;
      }
    });
    return bRes;
  }

  send_data() {

    this.setAllFlagFromCicle();

}


send_data_with_refresh () {

  if (this.getAllFlagFromCicle() === false) {
    this.sError = 'Найдены неправильные значения. Измените их на правильные пользуясь подсказкой.';
    return;
  }

  if (!this.getAllFlagNotEmpty()) {
    this.sError = 'Вы не вели ни одного значения для передачи.';
    return;
  }



  this.sError = '';
  // если какие-то данные с формы не преобразуются в int сообщаем об этом
  if (!this.checkValueInt()) {
    this.sError = 'В одном из полей нецифровые данные. Измените их на цифровые.';
    return;
  }

  if (!this.checkValueMassa()) {
    this.sError = 'Вы не указали массу белья.';
    return;
  }

  const res_user = this.authService.loginStorage();
  const id_branch = this.authService.getBranch(res_user.id_user_vict);

  this.shiftservice.get_shiftuserbranch(res_user.id_user_vict, id_branch).subscribe( shift => {


    if (shift[0]) {
      // прием белья в складскую проводку в базе применительно к смене
      // console.log('shift[0]', shift[0]);
      this.ls.setrepair(this.repairForm.value, shift[0].id).subscribe( value => {
        console.log('value', value);
        if (value === true) {
          this.router.navigate(['/repair_laundry_last']);
        }
      });
    }
  });
  //
}


}
