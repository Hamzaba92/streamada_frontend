import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

private apiUrl = `${environment.apiUrl}/api/password-reset/`;  

  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email });
  }
}