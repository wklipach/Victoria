import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SmainComponent } from './smain/smain.component';
import { AuthService } from './services/auth-service.service';
import {LoginComponent} from './entrance/login/login.component';
import {ForgotpasswordService} from './services/forgotpassword.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GlobalRef} from './services/globalref';
import { ParlorComponent } from './parlor/parlor.component';
import { LaundryComponent } from './washhouse/laundry/laundry.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FootComponent } from './foot/foot.component';
import { HeadComponent } from './head/head.component';
import { RegisterComponent } from './entrance/register/register.component';
import {ForgotPasswordComponent} from './entrance/forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { HomeLaundryComponent } from './washhouse/home-laundry/home-laundry.component';
import { AcceptanceLaundryComponent } from './washhouse/acceptance-laundry/acceptance-laundry.component';
import { RepairLaundryComponent } from './washhouse/repair-laundry/repair-laundry.component';
import { WashingLaundryComponent } from './washhouse/washing-laundry/washing-laundry.component';
import { WarehouseLaundryComponent } from './washhouse/warehouse-laundry/warehouse-laundry.component';
import { ShipmentLaundryComponent } from './washhouse/shipment-laundry/shipment-laundry.component';
import { CommentLaundryComponent } from './washhouse/comment-laundry/comment-laundry.component';

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: SmainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'parlor', component: ParlorComponent},
  {path: 'laundry', component: LaundryComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'head', component: HeadComponent},
  {path: 'foot', component: FootComponent},
  {path: 'home-laundry', component: HomeLaundryComponent},
  {path: 'acceptance-laundry', component: AcceptanceLaundryComponent},
  {path: 'repair-laundry', component: RepairLaundryComponent},
  {path: 'washing-laundry', component: WashingLaundryComponent},
  {path: 'warehouse-laundry', component: WarehouseLaundryComponent},
  {path: 'shipment-laundry', component: ShipmentLaundryComponent},
  {path: 'comment-laundry', component: CommentLaundryComponent},
  {path: '**', component: NotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SmainComponent,
    ParlorComponent,
    LaundryComponent,
    ContactsComponent,
    FootComponent,
    HeadComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminComponent,
    HomeLaundryComponent,
    AcceptanceLaundryComponent,
    RepairLaundryComponent,
    WashingLaundryComponent,
    WarehouseLaundryComponent,
    ShipmentLaundryComponent,
    CommentLaundryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GlobalRef, AuthService, ForgotpasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
