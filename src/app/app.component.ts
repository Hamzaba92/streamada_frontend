import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StartAnimationComponent } from './start-animation/start-animation.component';
import { StartAnimationService } from './services/start-animation.service';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartAnimationComponent, LandingpageComponent, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'streamada';
  constructor(public startAnimationService: StartAnimationService, private router: Router){}

  ngOnInit() {
    // Überwache die Route nur einmal nach dem ersten vollständigen Laden
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        first() // Nur einmal ausführen, um den Performance-Einfluss zu minimieren
      )
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;

        // Prüfe, ob die Route NICHT zu PrivacyPolicy oder Imprint gehört
        if (url !== '/privacypolicy' && url !== '/imprint') {
          // Animation anzeigen
          this.startAnimationService.showAnimation();
        } else {
          // Animation nicht anzeigen
          this.startAnimationService.hideAnimation();
        }
      });
  }
}
