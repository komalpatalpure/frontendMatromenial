
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SubcriptionComponent } from './subcription/subcription.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomemediatorComponent } from './welcomemediator/welcomemediator.component';
import { UserrequestComponent } from './userrequest/userrequest.component';

import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
         RegistrationComponent,
         LoginComponent,
         SubcriptionComponent,
         WelcomeadminComponent,
         WelcomeComponent,
         WelcomemediatorComponent,
         UserrequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
