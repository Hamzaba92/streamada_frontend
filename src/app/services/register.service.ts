import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterData, RegisterResponse } from '../register/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  private apiUrl = `${environment.apiUrl}/api/register/`;

  register(userData: RegisterData): Observable<RegisterResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<RegisterResponse>(this.apiUrl, userData, { headers });
  }

}
