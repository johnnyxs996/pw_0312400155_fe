import { Routes } from '@angular/router';

import { transactionResolver, transactionsByBankAccountResolver } from './transaction.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./transaction-list/transaction-list.component').then((c) => c.TransactionListComponent),
    resolve: {
      transactions: transactionsByBankAccountResolver
    }
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () => import('./transaction-new/transaction-new.component').then((c) => c.TransactionNewComponent)
  },
  {
    path: ':transactionId',
    loadComponent: () =>
      import('./transaction-detail/transaction-detail.component').then((c) => c.TransactionDetailComponent),
    resolve: {
      transaction: transactionResolver
    }
  }
];
