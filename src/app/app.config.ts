import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { manufacturersReducer, ManufacturersEffects } from './features/brands';
import { brandDetailReducer, BrandDetailEffects } from './features/brand-detail';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    // NgRx Store configuration
    provideStore({
      manufacturers: manufacturersReducer,
      brandDetail: brandDetailReducer,
    }),
    // NgRx Effects configuration
    provideEffects([ManufacturersEffects, BrandDetailEffects]),
    // NgRx DevTools for development
    provideStoreDevtools({
      maxAge: 25, // Retain last 25 states
      logOnly: false, // Allow state modification in devtools
      trace: false, // Enable stack traces
      traceLimit: 75, // Maximum stack trace frames
    }),
  ],
};
