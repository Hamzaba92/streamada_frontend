import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StartAnimationService } from '../services/start-animation.service';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  email: string = '';

  constructor(private router: Router, private startAnimationService: StartAnimationService, private emailService: EmailService){}

  ngOnInit(): void {
    this.startAnimationService.showAnimation();
  }

  openLoginComp(){
    this.router.navigate(['/login']);
  }

  openSignUpComp(){
    this.emailService.setEmail(this.email);
    this.router.navigate(['/register']);
  }

  openPP(){
    window.open('privacypolicy', '_blank');
  }

  openImprint(){
    window.open('imprint', '_blank');
  }

}
