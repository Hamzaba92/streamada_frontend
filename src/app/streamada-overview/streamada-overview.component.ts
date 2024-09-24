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

  selectedVideo: any = null;

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
    this.selectedVideo = videoSrc;
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
      title: 'An unbelievable adventure trough the Canyons',
      src: 'assets/videos/test_video.mp4',
      thumbnail: 'assets/videos/test_video_thumbnail.png',
      description: 'Ein aufregendes Abenteuer durch die Wüste.',
      genre: 'Abenteuer'
    },
    {
      title: 'Turtel',
      src: 'assets/videos/test2.mp4',
      thumbnail: 'assets/videos/thumbnail.jpg',
      description: 'Eine Reise mit einer Schildkröte.',
      genre: 'Dokumentation'
    },
    {
      title: 'Cowboy escape from the Indians',
      src: 'assets/videos/cowboy_test.mp4',
      thumbnail: 'assets/videos/cowboy_thumbnail.png',
      description: 'Common tThe procharacters who e and rugged idividualism',
      genre: 'Western'
    },
    {
      title: 'HongKong the futuristic city of Asia',
      src: 'assets/videos/hongkong_test.mp4',
      thumbnail: 'assets/videos/hongkong_thumbnail.png',
      description: 'Common tThe procharacters who e and rugged idividualism',
      genre: 'Adventure'
    },
    {
      title: 'Soccer',
      src: 'assets/videos/soccer_test.mp4',
      thumbnail: 'assets/videos/soccer_thumbnail.png',
      description: 'Common tThe procharacters who e and rugged idividualism',
      genre: 'Sport'
    }
  ];

  logoutUser() {
    this.router.navigate(['landingpage']);
  }

  openMediaPlayer() {
    this.router.navigate(['mediaplayer']);
  }

  openPrivacyPolicy() {
    window.open('privacypolicy', '_blank');
  }

  openImprint() {
    window.open('imprint', '_blank');
  }

  onHoverDialogClick(event: Event) {
    event.stopPropagation();
  }

  positionHoverDialog(event: MouseEvent, videoElement: HTMLElement) {
    const hoverDialog = document.querySelector('.hover-dialog') as HTMLElement;
  
    if (hoverDialog) {
      const rect = videoElement.getBoundingClientRect();
      
      hoverDialog.style.left = `${rect.left}px`;
      hoverDialog.style.top = `${rect.bottom}px`; 
      hoverDialog.style.position = 'absolute';
      hoverDialog.style.visibility = 'visible';
    }
  }

  items = [1, 2, 3, 4, 5];

}
