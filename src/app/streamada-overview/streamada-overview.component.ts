import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Video, VideoService } from '../services/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-streamada-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streamada-overview.component.html',
  styleUrls: ['./streamada-overview.component.scss']
})
export class StreamadaOverviewComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('backgroundVideo') backgroundVideoRef: ElementRef<HTMLVideoElement> | undefined;

  currentVideoSrc: string = '';
  selectedVideo: Video | null = null;
  dropdownOpen = false;
  genres: string[] = [];
  videos: Video[] = [];
  videosByGenre: { [key: string]: Video[] } = {};
  private videoSubscription: Subscription | undefined;


  constructor(
    private router: Router,
    public authservice: AuthServiceService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.loadVideos();
  }

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
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
  }

  updateBackgroundVideo() {
    if (!this.backgroundVideoRef?.nativeElement) {
      console.error('Background video element not found');
      return;
    }

    const backgroundVideo = this.backgroundVideoRef.nativeElement;
    backgroundVideo.src = this.currentVideoSrc;
    backgroundVideo.load();
    backgroundVideo.play().catch(error => {
      console.error('Error playing video:', error);
    });
  }

    playPreview(event: Event, video: Video): void {
      event.stopPropagation();
      this.selectedVideo = video;
      this.currentVideoSrc = video.video_1080p_url;
      this.updateBackgroundVideo();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    playVideo(event: Event, video: Video): void {
      event.stopPropagation();
      this.selectedVideo = video;
      this.currentVideoSrc = video.video_1080p_url; 
      this.updateBackgroundVideo();
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

  loadVideos() {
    this.videoSubscription = this.videoService.getVideos().subscribe(
      (data: Video[]) => {
        this.videos = data;
        this.groupVideosByGenre();
        if (this.videos.length > 0) {
          this.currentVideoSrc = this.videos[0].video_1080p_url;
        }
      },
      (error) => {
        console.error('error loading video:', error);
      }
    );
  }

  groupVideosByGenre() {
    this.videosByGenre = {};
    this.genres = [];

    this.videos.forEach(video => {
      if (!this.videosByGenre[video.genre]) {
        this.videosByGenre[video.genre] = [];
        this.genres.push(video.genre);
      }
      this.videosByGenre[video.genre].push(video);
    });
  }

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



}
