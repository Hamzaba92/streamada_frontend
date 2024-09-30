import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmNewPasswordService {

  constructor(private http: HttpClient) {}



  private apiUrl = `${environment.apiUrl}/api/confirm-new-pw/`; 

  resetPassword(uid: string, token: string, newPassword: string): Observable<any> {
    const body = { uid, token, new_password: newPassword };
    return this.http.post<any>(this.apiUrl, body);
  }





}
