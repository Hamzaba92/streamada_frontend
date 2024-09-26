import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  private apiUrl = `${environment.apiUrl}/api/register/`;

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData, {withCredentials: true});
  }

}
