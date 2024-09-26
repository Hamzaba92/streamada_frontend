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
  imports: [RouterOutlet, StartAnimationComponent, LandingpageComponent, CommonModule,
    LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'streamada';
  constructor(public startAnimationService: StartAnimationService, private router: Router){}

  ngOnInit() {
    
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        first() 
      )
      .subscribe((event: NavigationEnd) => {
        const urlPath = event.urlAfterRedirects.split('?')[0];
        const excludedRoutes = ['/privacypolicy', '/imprint'];
  
        if (!excludedRoutes.includes(urlPath)) {
          this.startAnimationService.showAnimation();
        } else {
          this.startAnimationService.hideAnimation();
        }
      });
  }
  
  
}
