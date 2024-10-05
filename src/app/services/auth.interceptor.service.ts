import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthServiceService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const openEndpoints = ['/api/login/', '/api/register/'];

    const isOpenEndpoint = openEndpoints.some(url => req.url.includes(url));

    if (!isOpenEndpoint) {
      const authToken = this.authService.getToken();
      if (authToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Token ${authToken}`
          }
        });
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}