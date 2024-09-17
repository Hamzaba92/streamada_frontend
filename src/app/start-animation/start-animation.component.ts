import { Component } from '@angular/core';
import { StartAnimationService } from '../services/start-animation.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-start-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-animation.component.html',
  styleUrl: './start-animation.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class StartAnimationComponent {

  isVisible = true;

  constructor(public startAnimationService: StartAnimationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false;
      this.startAnimationService.hideAnimation();
    }, 4000); 
  }
}

