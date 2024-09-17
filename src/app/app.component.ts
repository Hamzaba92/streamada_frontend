import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartAnimationComponent } from './start-animation/start-animation.component';
import { StartAnimationService } from './services/start-animation.service';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartAnimationComponent, LandingpageComponent, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'streamada';
  constructor(public startAnimationService: StartAnimationService){}
}
