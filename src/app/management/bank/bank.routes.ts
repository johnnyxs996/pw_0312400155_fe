import { Routes } from '@angular/router';

import { banksResolver } from './bank.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () => import('./bank-list/bank-list.component').then((c) => c.BankListComponent),
    resolve: {
      banks: banksResolver
    }
  }
];
