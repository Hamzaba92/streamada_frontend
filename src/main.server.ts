
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './app/services/auth.interceptor.service';
import { bootstrapApplication } from '@angular/platform-browser';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
  });
}




