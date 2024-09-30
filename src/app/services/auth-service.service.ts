import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private firstNameKey = 'first_name';
  private lastNameKey = 'last_name';
  private authTokenKey = 'auth_token';

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.loggedIn.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.firstNameKey);
    localStorage.removeItem(this.lastNameKey);
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

  setUserDetails(firstName: string, lastName: string): void {
    localStorage.setItem(this.firstNameKey, firstName);
    localStorage.setItem(this.lastNameKey, lastName);
  }

  getUserFirstName() {
    return localStorage.getItem(this.firstNameKey);
  }

  getUserLastName() {
    return localStorage.getItem(this.lastNameKey);
  }

}
