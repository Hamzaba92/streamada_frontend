import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { appConfig } from './app.config';
import { mergeApplicationConfig } from '@angular/core';

// Server-spezifische Konfiguration
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
