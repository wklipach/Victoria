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

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: SmainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'parlor', component: ParlorComponent},
  {path: '**', component: NotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SmainComponent,
    ParlorComponent
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
