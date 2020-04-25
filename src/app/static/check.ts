import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export class Check {

  public static getShift() {
    let bShiftBegin = false;
    if (window.localStorage.getItem('bShiftBegin')) {
      bShiftBegin = JSON.parse(window.localStorage.getItem('bShiftBegin'));
    }
    return bShiftBegin;
  }


  // проверка переданной формы нецифровые, кроме массы
  public static getFormDirty(form: FormGroup): boolean {
    let boolDirty = false;
    Object.keys(form.controls).forEach(key => {
      const  sVal = form.controls[key].value.toString().trim();
      if (key.toString() !== 'massa' ) {
        if (Check.checkNotNumber(sVal)) {
          boolDirty = true;
        }
      }
    });
    return boolDirty;
  }


  public static  isEmpty(obj) {
    for ( const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  // проверка переданной формы на хотя бы одно целое положительные, кроме массы
  public static getFormPositive(form: FormGroup): boolean {
    let boolPositive = false;
    Object.keys(form.controls).forEach(key => {
      const  sVal = form.controls[key].value.toString().trim();
      if (key.toString() !== 'massa' ) {
        if (Check.checkPositiveNumber(sVal)) {
          boolPositive = true;
        }
      }
    });
    return boolPositive;
  }

  // проверка введенной массы
  public static checkValueMassa(form: FormGroup) {

    if (!form.controls['massa']) {
      return false;
    }

    const sVal = form.controls['massa'].value.toString().trim();
    if (!Check.checkPositiveNumber(sVal)) {
      return false;
    }

    return true;
  }


  // проверка на целый неотрицательный
  public static checkPositiveNumber(s: string) {


    if (Check.isEmpty(s)) {
      return false;
    }

    if (s === '') {
      return false;
    }

    if (!Number(s)) {
      return false;
    }

    if (Number(s) <= 0) {
      return false;
    }
    return true;
  }

  // процерка на нецифпц
  public static checkNotNumber(s: string) {

    if (Check.isEmpty(s)) {
      return false;
    }

    if (s === '0') {
      return false;
    }

    if (s === '') {
      return false;
    }

     if (!Number(s)) {
      return true;
    }
    return false;
  }

  public static stringToNumber(s: string): number {
    if (Check.isEmpty(s)) {
      return 0;
    }
    if (s === '') {
      return 0;
    }

    if (s === '0') {
      return 0;
    }

    if (Number(s)) {
      return Number(s);
    }

    return 0;
  }

  public static flagValidator(sname: string, arrayFlag: [number, string, number, string][]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const massaRgEx: RegExp = /^0*[1-9]\d*$/;

      const arrRes = arrayFlag.find(element => element[1] === sname);

      if (!control.value) {
        if (arrRes) {
          if (arrRes[2] === 0) {
            if (!control.disabled) {
              control.disable();
            }
          }
        }

        return {};
      }

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

  public static massaValidator(sname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const massaRgEx: RegExp = /^0*[1-9]\d*$/;
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

  public static victNullValidator(sname: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} | null => {
      const massaRgEx: RegExp = /^0*[0-9]\d*$/;
      if (!control.value) {
        return {};
      }

      if (massaRgEx.test(control.value)) {
        return null;
      }

      if (!massaRgEx.test(control.value)) {
        return {victoriaValidator: 'Количество - целое положительное значение.'};
      }

    };
  }


}
