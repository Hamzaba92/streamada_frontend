import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Video {
  id: number;
  title: string;
  description: string;
  genre: string;
  video_480p_url: string;
  video_720p_url: string;
  video_1080p_url: string;
  thumbnail_url: string;
  add_to_new_video_feed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  private selectedVideo: any;

  private apiUrl = `${environment.apiUrl}/api/videos/`;


  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  setSelectedVideo(video: any): void {
    this.selectedVideo = video;
  }

  getSelectedVideo(): any {
    return this.selectedVideo;
  }

}
