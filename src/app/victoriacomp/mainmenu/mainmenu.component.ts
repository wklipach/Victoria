import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {GlobalRef} from '../../services/globalref';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  @Input() numberPage = 0;

  constructor(private authService: AuthService, private gr: GlobalRef) { }

  ngOnInit(): void {

  }

  getStyleName(el) {
    // style="font-weight:bold; color: #ff623d;"
    let Res = '';
    if (el.toString() === this.numberPage.toString()) { Res = 'font-weight:bold; color: #FF7F41;'; }
    return Res;
  }


}
