import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {LaundryService} from '../services/laundry.service';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-shipment-laundry-last',
  templateUrl: './shipment-laundry-last.component.html',
  styleUrls: ['./shipment-laundry-last.component.css']
})
export class ShipmentLaundryLastComponent implements OnInit {

  public id_user_vict = -1;
  public alTitle: any;
  private detailList: any;

  constructor(private router: Router,
              private authService: AuthService,
              private ls: LaundryService,
              private excel: ExcelService
  ) { }


  ngOnInit(): void {
    const Res = this.authService.loginStorage();
    if (!Res.bVictConnected) {
      this.router.navigate(['/login']);
    }
    this.id_user_vict = Res.id_user_vict;
    this.LoadInfo(this.id_user_vict);
  }

  LoadInfo(id_user) {
    console.log('загружаем данные');
    this.ls.getLastShipment(id_user, this.authService.getBranch(id_user)).subscribe( value => {
      if (value[0]) {
        this.alTitle = value[0];
      } else {
        return;
      }

      // shipment - этооттдача со склада, поэтому детализация та же что и для склада
      this.ls.getDetailWarehouse(value[0].id).subscribe( detail => {
        // console.log(detail);
        this.detailList = detail;
      });

    });
  }

  back() {
    this.router.navigate(['/laundry']);
  }

  toExcel() {
    if (this.detailList) {
      this.excel.excelAcceptanceLaundryLast(this.alTitle, this.detailList, 'Отправка со склада', '');
    }
  }

}
