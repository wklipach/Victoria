import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LaundryService} from '../../washhouse/services/laundry.service';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css']
})
export class CustomerAddressComponent implements OnInit {

  @Input() titleString = '';
  @Input() beginString = '';
  @Input() endString = '';
  @Output() ChangedPage = new EventEmitter<number>();


  addressList: any;
  selectedID = 1;

  constructor(private authService: AuthService,  private ls: LaundryService) {

    const Res = this.authService.loginStorage();
    let id_user_vict = -1;
    if (Res.bVictConnected) {
      id_user_vict = Res.id_user_vict;
    }

    const id_br = this.authService.getBranch(id_user_vict);
    // получаем список адресов и их идентификаторов
    this.ls.getWashHouseAddress(id_br).subscribe( value => {
      this.addressList = value;
    });

    const i_addr = this.authService.getAddressShipment();
    if (i_addr > 0) {
      this.onElem(i_addr);
    }


  }

  ngOnInit(): void {

  }

  onElem(i: number) {
    this.selectedID = i;
    this.authService.setAddressShipment (this.selectedID);
    this.ChangedPage.emit(i);
    }
}
