import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'first-step',
    pathMatch: 'full'
  },
  {
    path: 'first-step',
    loadComponent: () => import('./first-step/first-step.component').then(m => m.FirstStepComponent)
  },
  {
    path: 'second-step',
    loadComponent: () => import('./second-step/second-step.component').then(m => m.SecondStepComponent)
  },
  {
    path: '**',
    redirectTo: 'first-step'
  }
];
