import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken && !req.headers.has('X-CSRFToken')) {
      req = req.clone({
        headers: req.headers.set('X-CSRFToken', csrfToken),
      });
    }
    return next.handle(req);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}