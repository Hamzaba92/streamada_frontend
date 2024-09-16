import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingpageLoginComponent } from './landingpage-login/landingpage-login.component';
import { StartAnimationComponent } from './start-animation/start-animation.component';
import { StartAnimationService } from './services/start-animation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartAnimationComponent, LandingpageLoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'streamada';
  constructor(public startAnimationService: StartAnimationService){}
}
