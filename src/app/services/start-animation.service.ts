import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartAnimationService {

  constructor() { }

  private isAnimationVisible = true;

  showAnimation() {
    this.isAnimationVisible = true;
  }

  hideAnimation() {
    this.isAnimationVisible = false;
  }

  getAnimationStatus() {
    return this.isAnimationVisible;
  }
}
