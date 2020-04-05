import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ShiftService} from '../../services/shift.service';

@Component({
  selector: 'app-shipment-laundry',
  templateUrl: './shipment-laundry.component.html',
  styleUrls: ['./shipment-laundry.component.css']
})
export class ShipmentLaundryComponent implements OnInit {

  public intAddress = 1;
  shipmentForm: FormGroup;
  sError = '';

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private shiftservice: ShiftService) {
    this.shipmentForm  = new FormGroup({
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

  }

  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }
  }

  onElem(intCurTab: number) {
   console.log('intAddress=', intCurTab);
    this.intAddress = intCurTab;
  }
  checkValueMassa() {
    let bRes = true;
    let sVal = this.shipmentForm.controls['massa'].value.toString().trim();
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
    Object.keys(this.shipmentForm.controls).forEach(key => {
      sVal = this.shipmentForm.controls[key].value.toString().trim();
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
        // отправка белья по адресам применительно к смене
        this.ls.setshipment(this.shipmentForm.value, shift[0].id, this.intAddress).subscribe( value => {
          console.log('value', value);
          if (value === true) {
            this.router.navigate(['/shipment_laundry_last']);
          }
        });
      }
    });

  }
}
