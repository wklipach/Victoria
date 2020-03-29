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
import { LaundryComponent } from './laundry/laundry.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FootComponent } from './foot/foot.component';
import { HeadComponent } from './head/head.component';

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: SmainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'parlor', component: ParlorComponent},
  {path: 'laundry', component: LaundryComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'head', component: HeadComponent},
  {path: 'foot', component: FootComponent},
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
    HeadComponent
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
