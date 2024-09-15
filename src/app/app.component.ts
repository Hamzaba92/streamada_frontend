import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingpageLoginComponent } from './landingpage-login/landingpage-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingpageLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'streamada';
}
