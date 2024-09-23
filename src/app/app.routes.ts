import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StreamadaOverviewComponent } from './streamada-overview/streamada-overview.component';
import { MediaplayerComponent } from './mediaplayer/mediaplayer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImprintComponent } from './imprint/imprint.component';


export const routes: Routes = [

    { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forget-password', component: ForgetPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'streamada-overview', component: StreamadaOverviewComponent},
    { path: 'mediaplayer', component: MediaplayerComponent},
    { path: 'privacypolicy', component: PrivacyPolicyComponent},
    { path: 'imprint', component: ImprintComponent},
];
