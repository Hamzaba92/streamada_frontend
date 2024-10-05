import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiUrl = `${environment.apiUrl}/api/password-reset/`;

  constructor(private http: HttpClient) { }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email });
  }

  resetPassword(uid: string, token: string, newPassword: string): Observable<any> {
    const url = `httconfirm-new-pw/`;
    const body = { uid, token, new_password: newPassword };
    return this.http.post<any>(url, body);
  }


}