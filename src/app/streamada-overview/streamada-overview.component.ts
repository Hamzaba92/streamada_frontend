import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-streamada-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streamada-overview.component.html',
  styleUrls: ['./streamada-overview.component.scss']
})
export class StreamadaOverviewComponent implements AfterViewInit, OnDestroy {

  @ViewChild('backgroundVideo') backgroundVideoRef: ElementRef<HTMLVideoElement> | undefined;

  currentVideoSrc: string = 'assets/videos/genre_abstract_dna_rose.mp4';

  selectedVideo: any = null;

  dropdownOpen = false;


  constructor(private router: Router, public authservice: AuthServiceService) { }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

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
      src: 'assets/videos/genre_abstract_dna_rose.mp4',
      thumbnail: 'assets/videos/test_video_thumbnail.png',
      description: 'Ein aufregendes Abenteuer durch die Wüste.',
      genre: 'Abenteuer'
    },
    {
      title: 'Ninja-Turtel under the sea',
      src: 'assets/videos/genre_newonstreamada_turtle.mp4',
      thumbnail: 'assets/videos/thumbnail.jpg',
      description: 'Eine Reise mit einer Schildkröte.',
      genre: 'Dokumentation'
    },
    {
      title: 'Cowboy escape from the Indians',
      src: 'assets/videos/genre_abstract_dna_rose.mp4',
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
      title: 'Soccer - Messis wonderkid',
      src: 'assets/videos/soccer_test.mp4',
      thumbnail: 'assets/videos/soccer_thumbnail.png',
      description: 'Common tThe procharacters who e and rugged idividualism',
      genre: 'Sport'
    }
  ];

  logoutUser() {
    this.authservice.removeToken();
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


  items = [1, 2, 3, 4, 5];

}
