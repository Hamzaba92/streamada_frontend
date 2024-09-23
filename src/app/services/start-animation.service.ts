import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartAnimationService {

  private isAnimationVisible = true;

  constructor() {}

  showAnimation() {
    if (!this.isAnimationVisible) {
      this.isAnimationVisible = true;
    }
  }

  hideAnimation() {
    this.isAnimationVisible = false;
  }

  getAnimationStatus() {
    return this.isAnimationVisible;
  }
}
