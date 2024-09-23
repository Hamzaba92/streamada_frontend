import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartAnimationService {

  private isAnimationVisible = true;

  constructor() {}

  showAnimation() {
    this.isAnimationVisible = true;
  }

  hideAnimation() {
    this.isAnimationVisible = false;
  }

  getAnimationStatus(): boolean {
    return this.isAnimationVisible;
  }
}
