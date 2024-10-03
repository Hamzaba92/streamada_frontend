import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { StartAnimationService } from '../services/start-animation.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-start-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-animation.component.html',
  styleUrl: './start-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  isVisible: boolean = true;

  constructor(
    public startAnimationService: StartAnimationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    if (this.startAnimationService.getAnimationStatus()) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.isVisible = false;
            this.startAnimationService.hideAnimation();
            this.cdr.detectChanges();
          });
        }, 4000);
      });
    } else {
      this.isVisible = false;
    }
  }
}

