import { Routes } from '@angular/router';

import { bankResolver, banksResolver } from './bank.resolver';

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
  },
  {
    path: 'new',
    loadComponent: () => import('./bank-new/bank-new.component').then((c) => c.BankNewComponent)
  },
  {
    path: ':bankId',
    loadComponent: () => import('./bank-detail/bank-detail.component').then((c) => c.BankDetailComponent),
    resolve: {
      bank: bankResolver
    }
  }
];
