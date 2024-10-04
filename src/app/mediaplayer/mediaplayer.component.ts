import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-mediaplayer',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './mediaplayer.component.html',
  styleUrl: './mediaplayer.component.scss'
})
export class MediaplayerComponent {
  currentVideoSrc: string;
  video: any;

  constructor(private router: Router, private videoService: VideoService) {
    this.video = this.videoService.getSelectedVideo();
  
    if (this.video) {
      this.currentVideoSrc = this.video.video_1080p_url;
    } else {
      this.currentVideoSrc = 'assets/videos/genre_abstract_dna_rose.mp4';//fallback video
    }
  }

  backToOverview() {
    this.router.navigate(['streamada-overview']);
  }

  selectQuality(quality: string): void {
    if (this.video) {
      switch (quality) {
        case '480p':
          this.currentVideoSrc = this.video.video_480p_url;
          break;
        case '720p':
          this.currentVideoSrc = this.video.video_720p_url;
          break;
        case '1080p':
          this.currentVideoSrc = this.video.video_1080p_url;
          break;
        default:
          this.currentVideoSrc = this.video.video_1080p_url; // default
          break;
      }
    }
  }

}
