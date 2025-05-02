import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { handleNavigationError } from './navigation-error-handler';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withNavigationErrorHandler(handleNavigationError)),
    provideClientHydration(),
    provideHttpClient(withFetch(),
    withInterceptors([authInterceptor])
  )]
};
