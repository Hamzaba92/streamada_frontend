import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authTokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.loggedIn.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.authTokenKey);
    return token;
  }

  isLoggedIn(): boolean {
    const status = this.loggedIn.value;
    return status;
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['login']);
  }

  hasToken(): boolean {
    const has = !!this.getToken();
    return has;
  }

}
