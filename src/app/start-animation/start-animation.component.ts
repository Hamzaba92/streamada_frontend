import { Component } from '@angular/core';
import { StartAnimationService } from '../services/start-animation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-animation.component.html',
  styleUrl: './start-animation.component.scss'
})
export class StartAnimationComponent {

  isVisible = true;

  constructor(public startAnimationService: StartAnimationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false;
      this.startAnimationService.hideAnimation();
    }, 3850); 
  }
}

