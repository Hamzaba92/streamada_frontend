import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';


export const routes: Routes = [

    { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'app-login', component: LoginComponent},
];
