import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PDFComponent } from './components/pdf/pdf.component';
import { ExcelComponent } from './components/excel/excel.component';
import { ImportComponent } from './components/import/import.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FileComponent } from './components/file/file.component';
import {EditComponent} from './components/edit/edit.component';
import {DevelopmentComponent} from './components/development/development.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {SimpleNotificationsModule} from 'angular2-notifications';

import {CookieService} from 'angular2-cookie/services/cookies.service';
import {AuthenticateService} from './services/authenticate.service';
import {ValidateService} from './services/validate.service';
import { InsertService } from './services/insert.service';
import {AnalysisService} from './services/analysis.service';
import {AuthGuard} from './guards/auth.guard';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';

const appRoutes : Routes = [
  {path : '' , component : HomeComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'import' , component : ImportComponent,canActivate:[AuthGuard]},
  {path : 'menu' , component : MenuComponent,canActivate:[AuthGuard]},
  {path : 'pdf' , component : PDFComponent,canActivate:[AuthGuard]},
  {path : 'excel' , component : ExcelComponent,canActivate:[AuthGuard]},
  {path : 'file' , component : FileComponent,canActivate:[AuthGuard]},
  {path : 'usermanagement',component:UsermanagementComponent,canActivate:[AuthGuard]},
  {path : 'edit',component:EditComponent,canActivate:[AuthGuard]},
  {path : 'development',component:DevelopmentComponent,canActivate:[AuthGuard]},

]

@Component({
	selector: 'app-root',
	template: `<sheetjs></sheetjs>`
})

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PDFComponent,
    ExcelComponent,
    ImportComponent,
    MenuComponent,
    NavbarComponent,
    FileComponent,
    UsermanagementComponent,
    EditComponent,
    DevelopmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    InsertService,
    ValidateService,
    CookieService,
    AuthenticateService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
