import { Routes } from '@angular/router';

import { loanResolver, loansByBankAccountResolver } from './loan.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./loan-list/loan-list.component').then((c) => c.LoanListComponent),
    resolve: {
      loans: loansByBankAccountResolver
    }
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () => import('./loan-new/loan-new.component').then((c) => c.LoanNewComponent)
  },
  {
    path: ':loanId',
    loadComponent: () =>
      import('./loan-detail/loan-detail.component').then((c) => c.LoanDetailComponent),
    resolve: {
      loan: loanResolver
    }
  }
];
