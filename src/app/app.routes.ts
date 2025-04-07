import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bank-account',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes)
  },
  {
    path: 'bank-account',
    loadComponent: () => import('./bank-account/bank-account.component').then((c) => c.BankAccountComponent),
    loadChildren: () => import('./bank-account/bank-account.routes').then((r) => r.routes)
  },
  {
    path: 'management',
    loadComponent: () => import('./management/management.component').then((c) => c.ManagementComponent),
    loadChildren: () => import('./management/management.routes').then((r) => r.routes)
  }
  // {
  //   path: '**',
  //   redirectTo: 'errors/404'
  // }
];
