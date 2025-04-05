import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { BASE_PATH } from '../api';
import { environment } from '../environments/environment';
import { unauthorizedInterceptor } from './shared/interceptors/unauthorized.interceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.host],
          disallowedRoutes: [
            `${environment.apiHost}/login`,
            `${environment.apiHost}/refresh`,
            `${environment.apiHost}/logout`
          ]
        }
      })
    ),
    provideHttpClient(withInterceptors([unauthorizedInterceptor]), withInterceptorsFromDi()),
    provideNativeDateAdapter(),
    { provide: BASE_PATH, useValue: environment.apiHost },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MM/yyyy HH:mm' } },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }
  ]
};
