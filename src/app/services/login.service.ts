// src/app/services/login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginData, LoginResponse } from '../login/model.login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}/api/login/`;

  constructor(private http: HttpClient) { }


  login(credentials: LoginData): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<LoginResponse>(this.apiUrl, credentials, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-seitiger Fehler
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-error
      if (error.status === 400) {
        
        if (error.error && typeof error.error === 'object') {
          const messages = [];
          for (const key in error.error) {
            if (error.error.hasOwnProperty(key)) {
              messages.push(error.error[key]);
            }
          }
          errorMessage = messages.join(' ');
        } else if (typeof error.error === 'string') {
          errorMessage = error.error;
        }
      } else if (error.status === 0) {
        errorMessage = 'Server offline';
      } else {
        console.log(errorMessage = `${error.status}, ${error.error}`)
      }
    }
    return throwError(errorMessage);
  }
}
