import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streamada-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streamada-overview.component.html',
  styleUrls: ['./streamada-overview.component.scss']
})
export class StreamadaOverviewComponent implements AfterViewInit {

  @ViewChild('backgroundVideo') backgroundVideoRef: ElementRef<HTMLVideoElement> | undefined;

  currentVideoSrc: string = 'assets/videos/test_video.mp4';

  constructor(private router: Router) { }

  ngAfterViewInit() {
    if (this.backgroundVideoRef) {
      const backgroundVideo = this.backgroundVideoRef.nativeElement;
      backgroundVideo.addEventListener('error', this.handleVideoError);
    }
  }

  playVideo(videoSrc: string) {
    try {
      this.currentVideoSrc = videoSrc;
      
      if (this.backgroundVideoRef) {
        const backgroundVideo = this.backgroundVideoRef.nativeElement;
        backgroundVideo.src = videoSrc;
        backgroundVideo.load();

        backgroundVideo.addEventListener('canplay', () => {
          backgroundVideo.play().catch(error => {
            console.error('Error playing video:', error);
          });
        }, { once: true }); 
      }
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }

  handleVideoError(event: Event) {
    console.error('Video failed to load:', event);
  }

  
  videos = [
    {
      title: 'Wüsten Video',
      src: 'assets/videos/test_video.mp4',
      thumbnail: 'assets/videos/test_video_thumbnail.png'
    },
    {
      title: 'Turtel',
      src: 'assets/videos/test2.mp4',
      thumbnail: 'assets/videos/thumbnail.jpg'
    }
  ];

  logoutUser() {
    this.router.navigate(['landingpage']);
  }
}
