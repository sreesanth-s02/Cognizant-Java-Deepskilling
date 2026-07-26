import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideRouter } from '@angular/router';

import {
  provideStore,
  provideState
} from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { authInterceptor } from './interceptors/auth-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideStore(),

    provideState(
      'course',
      courseReducer
    ),

    provideEffects([
      CourseEffects
    ]),

    provideStoreDevtools({
      maxAge: 25
    }),

    provideHttpClient(

      withInterceptors([

        authInterceptor,

        errorInterceptor,

        loadingInterceptor

      ])

    )

  ]

};