import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ShiftService} from '../../services/shift.service';

@Component({
  selector: 'app-acceptance-laundry',
  templateUrl: './acceptance-laundry.component.html',
  styleUrls: ['./acceptance-laundry.component.css']
})
export class AcceptanceLaundryComponent implements OnInit {

  public acclaundform: FormGroup;
  sError = '';
  bItIsAdmin = false;

  // Цвет вадидации, элемент, разрешенное из базыколичество, показываемое на экране значение
  arrayFlag: [number, string, number, string][] = [[0, 'init', -1, 'init']];

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {

    this.acclaundform  = new FormGroup({
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
      'n1_spoiled': new FormControl('', [Validators.required]),
      'n2_spoiled': new FormControl('', [Validators.required]),
      'n3_spoiled': new FormControl('', [Validators.required]),
      'n4_spoiled': new FormControl('', [Validators.required]),
      'n5_spoiled': new FormControl('', [Validators.required]),
      'n6_spoiled': new FormControl('', [Validators.required]),
      'n7_spoiled': new FormControl('', [Validators.required]),
      'n8_spoiled': new FormControl('', [Validators.required]),
      'n9_spoiled': new FormControl('', [Validators.required]),
      'n10_spoiled': new FormControl('', [Validators.required]),
      'n11_spoiled': new FormControl('', [Validators.required]),
      'n12_spoiled': new FormControl('', [Validators.required]),
      'n13_spoiled': new FormControl('', [Validators.required]),
      'n14_spoiled': new FormControl('', [Validators.required]),
      'n15_spoiled': new FormControl('', [Validators.required]),
      'n16_spoiled': new FormControl('', [Validators.required]),
      'n17_spoiled': new FormControl('', [Validators.required]),
      'n18_spoiled': new FormControl('', [Validators.required]),
      'n19_spoiled': new FormControl('', [Validators.required]),
      'massa': new FormControl('', [Validators.required])
    });

    this.setColorArray();
    this.setAllFlagFromCicle();
  }

///// VALIDATORS
  setColorArray() {
    Object.keys(this.acclaundform.controls).forEach(key => {
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
 setAllFlagFromCicle() {
   // тут ничего нет потому что разрешены любые значения
 }

  // проверка массива на введенные значения
  getAllFlagFromCicle(): boolean {
    // тут мои присваивания элементам правильных значений
    let resBoolean = true;
    Object.keys(this.acclaundform.controls).forEach(key => {

      resBoolean = this.checkValue(this.acclaundform.controls[key], key);

    });

    return resBoolean;
  }

  onChandeValid(elName: string) {
    const formControl   = this.acclaundform.controls[elName];
    if (formControl) {
      this.checkValue(formControl, elName);
    }
  }


checkValue(formControl, key): boolean {
  let resBoolean = true;
  const sVal = formControl.value.toString().trim();
  const arrRes = this.arrayFlag.find(element => element[1] === key);
  if (arrRes !== undefined) {
    arrRes[0] = 2;
    arrRes[3] = '';
  }

  if (sVal === '') {
    arrRes[0] = 0;
  }

  if (sVal !== '') {
    if (isNaN(Number(sVal))) {
      if (arrRes !== undefined) {
        arrRes[0] = 1;
        arrRes[3] = 'Введите цифровое значение';
        resBoolean = false;
      }
    } else {
      if (Number(sVal) <= 0) {
        if (arrRes !== undefined) {
          arrRes[0] = 1;
          arrRes[3] = 'Введите положительное значение';
          resBoolean = false;
        }
      }

    }
  }

  // особый случай не введена масса белья
  if ((sVal === '') &&  (key.toString() === 'massa')) {
    if (arrRes !== undefined) {
      arrRes[0] = 1;
      arrRes[3] = 'Введите массу белья, кг';
      resBoolean = false;
    }
  }

  return resBoolean;
}


///// END VALIDATORS

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }


    if (Res.bVictConnected) {
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


  checkValueMassa() {
    let bRes = true;
    let sVal = this.acclaundform.controls['massa'].value.toString().trim();
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
    Object.keys(this.acclaundform.controls).forEach(key => {
      sVal = this.acclaundform.controls[key].value.toString().trim();
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
    if (this.getAllFlagFromCicle() === false) {
      this.sError = 'Найдены неправильные значения. Измените их на правильные пользуясь подсказкой.';
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
        // прием белья в проводку в базе применительно к смене
        // console.log('shift[0]', shift[0]);
        this.ls.setacceptance(this.acclaundform.value, shift[0].id).subscribe( value => {
          console.log('value', value);
          if (value === true) {

            this.router.navigate(['/acceptance_laundry_last']);
          }
        });
      }
      });

  }


}
