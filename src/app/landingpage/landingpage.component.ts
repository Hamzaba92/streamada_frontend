import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  constructor(private router: Router){}

  openLoginComp(){
    this.router.navigate(['/login']);
  }

  openSignUpComp(){
    this.router.navigate(['/register']);
  }

  openPP(){
    window.open('privacypolicy', '_blank');
  }

  openImprint(){
    window.open('imprint', '_blank');
  }

}
