import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubcriptionComponent } from './subcription/subcription.component';
import { UserrequestComponent } from './userrequest/userrequest.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';
import { WelcomemediatorComponent } from './welcomemediator/welcomemediator.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'subcription',  component: SubcriptionComponent},
  { path: '',  component: HomeComponent,pathMatch:'full'},
  { path: 'welcome',  component: WelcomeComponent},
  { path: 'welcomeAdmin',  component: WelcomeadminComponent},
  { path: 'welcomemediator',  component: WelcomemediatorComponent},
  { path: 'userrequest',  component: UserrequestComponent},
  
  { path: 'new',  component: RegistrationComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
