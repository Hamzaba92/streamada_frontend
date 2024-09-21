import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streamada-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streamada-overview.component.html',
  styleUrls: ['./streamada-overview.component.scss']
})
export class StreamadaOverviewComponent implements AfterViewInit, OnDestroy {

  @ViewChild('backgroundVideo') backgroundVideoRef: ElementRef<HTMLVideoElement> | undefined;

  currentVideoSrc: string = 'assets/videos/test_video.mp4';

  constructor(private router: Router) { }

  ngAfterViewInit() {
    if (this.backgroundVideoRef?.nativeElement) {
      const backgroundVideo = this.backgroundVideoRef.nativeElement;
      backgroundVideo.addEventListener('error', this.handleVideoError);
    }
  }

  ngOnDestroy() {
    if (this.backgroundVideoRef?.nativeElement) {
      const backgroundVideo = this.backgroundVideoRef.nativeElement;
      backgroundVideo.removeEventListener('error', this.handleVideoError);
    }
  }

  playPreview(event: Event, videoSrc: string): void {
    event.stopPropagation(); 
  
    this.currentVideoSrc = videoSrc;
  }

  playVideo(event: Event, videoSrc: string): void {
    if (!this.backgroundVideoRef?.nativeElement) {
      console.error('Background video element not found');
      return;
    }
    
    const backgroundVideo = this.backgroundVideoRef.nativeElement;
    
    try {
      this.currentVideoSrc = videoSrc;
      backgroundVideo.src = videoSrc;
      backgroundVideo.load();
      backgroundVideo.addEventListener('canplay', this.handleCanPlay, { once: true });
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }

  handleCanPlay = (event: Event) => {
    const video = event.target as HTMLVideoElement;

    if (video) {
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
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
   
  openMediaPlayer(){
    this.router.navigate(['mediaplayer']);
  }

}
