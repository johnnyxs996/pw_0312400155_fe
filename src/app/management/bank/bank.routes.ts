import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./bank-list/bank-list.component').then((c) => c.BankListComponent)
  }
];
