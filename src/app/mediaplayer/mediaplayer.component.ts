import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mediaplayer',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './mediaplayer.component.html',
  styleUrl: './mediaplayer.component.scss'
})
export class MediaplayerComponent {

  constructor(private router: Router){}

  currentVideoSrc: string = 'assets/videos/test_video.mp4';

  backToOverview() {
    this.router.navigate(['streamada-overview']);
  }

}
