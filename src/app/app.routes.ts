import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const routes: Routes = [

    { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forget-password', component: ForgetPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
];
