
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class logoutService {
  
  private apiUrl = `${environment.apiUrl}/api/logout/`;

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token){
      return throwError('No auth token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post(this.apiUrl, {}, { headers })
      .pipe(
          catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'not known error occured';
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
    return throwError(errorMessage);
  }
}
