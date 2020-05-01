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
import { AcceptanceLaundryLastComponent } from './washhouse/acceptance-laundry-last/acceptance-laundry-last.component';
import {ExcelService} from './services/excel.service';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { WarehouseLaundryLastComponent } from './washhouse/warehouse-laundry-last/warehouse-laundry-last.component';
import { RepairLaundryLastComponent } from './washhouse/repair-laundry-last/repair-laundry-last.component';
import { ShipmentLaundryLastComponent } from './washhouse/shipment-laundry-last/shipment-laundry-last.component';
import { CustomerAddressComponent } from './victoriacomp/customer-address/customer-address.component';
import { TestComponent } from './test/test.component';
import { MainmenuComponent } from './victoriacomp/mainmenu/mainmenu.component';
import {Check} from './static/check';
import { WashingLaundryLastComponent } from './washhouse/washing-laundry-last/washing-laundry-last.component';
import { AddWorkComponent } from './washhouse/add-work/add-work.component';
import { AddworkLaundryLastComponent } from './washhouse/addwork-laundry-last/addwork-laundry-last.component';
import { AddworkAdminComponent } from './admin/addwork-admin/addwork-admin.component';
import { AddressAdminComponent } from './admin/address-admin/address-admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { ReportAcceptanceComponent } from './washhouse/reports/report-acceptance/report-acceptance.component';
import { ReportWarehouseComponent } from './washhouse/reports/report-warehouse/report-warehouse.component';
import { ReportWashingComponent } from './washhouse/reports/report-washing/report-washing.component';
import { ReportRepairComponent } from './washhouse/reports/report-repair/report-repair.component';
import { PositionComponent } from './admin/position/position.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { SummaryLaundryComponent } from './washhouse/summary-laundry/summary-laundry.component';
import { SummaryWeekComponent } from './washhouse/summary-laundry/summary-week/summary-week.component';
import { PaymentLaundryComponent } from './washhouse/payment-laundry/payment-laundry.component';
import { GraphComponent } from './washhouse/graph/graph.component';
import { BranchSelectionComponent } from './entrance/branch-selection/branch-selection.component';
import { ReportShipmentComponent } from './washhouse/reports/report-shipment/report-shipment.component';

registerLocaleData(localeRu);

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: SmainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'parlor', component: ParlorComponent},
  {path: 'laundry', component: LaundryComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
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
  {path: 'acceptance_laundry_last', component: AcceptanceLaundryLastComponent},
  {path: 'warehouse_laundry_last', component: WarehouseLaundryLastComponent},
  {path: 'repair_laundry_last', component: RepairLaundryLastComponent},
  {path: 'shipment_laundry_last', component: ShipmentLaundryLastComponent},
  {path: 'washing_laundry_last', component: WashingLaundryLastComponent},
  {path: 'add-work', component: AddWorkComponent},
  {path: 'addwork_laundry_last', component: AddworkLaundryLastComponent},
  {path: 'summary-laundry', component: SummaryLaundryComponent},
  {path: 'payment-laundry', component: PaymentLaundryComponent},
  {path: 'graph-laundry', component: GraphComponent},
  {path: 'test', component: TestComponent},
  {path: 'branch-selection', component: BranchSelectionComponent},
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
    CommentLaundryComponent,
    AcceptanceLaundryLastComponent,
    WarehouseLaundryLastComponent,
    RepairLaundryLastComponent,
    ShipmentLaundryLastComponent,
    CustomerAddressComponent,
    TestComponent,
    MainmenuComponent,
    WashingLaundryLastComponent,
    AddWorkComponent,
    AddworkLaundryLastComponent,
    AddworkAdminComponent,
    AddressAdminComponent,
    UsersAdminComponent,
    ReportAcceptanceComponent,
    ReportWarehouseComponent,
    ReportWashingComponent,
    ReportRepairComponent,
    PositionComponent,
    SummaryLaundryComponent,
    SummaryWeekComponent,
    PaymentLaundryComponent,
    GraphComponent,
    BranchSelectionComponent,
    ReportShipmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GlobalRef, AuthService, ForgotpasswordService, ExcelService, Check],
  bootstrap: [AppComponent]
})
export class AppModule { }
