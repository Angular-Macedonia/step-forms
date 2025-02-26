import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      {
        path: '',
        redirectTo: 'first-step',
        pathMatch: 'full'
      },
      {
        path: 'first-step',
        loadComponent: () => import('./app/first-step.component').then(m => m.FirstStepComponent)
      },
      {
        path: 'second-step',
        loadComponent: () => import('./app/second-step.component').then(m => m.SecondStepComponent)
      },
      {
        path: '**',
        redirectTo: 'first-step'
      }
    ],
      withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()]
})
  .catch((err) => console.error(err));
