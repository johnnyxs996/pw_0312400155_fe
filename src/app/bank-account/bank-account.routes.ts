import { Routes } from '@angular/router';

import { bankAccountResolver, userBankAccountsResolver } from './bank-account.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./bank-account-list/bank-account-list.component').then((c) => c.BankAccountListComponent),
    resolve: {
      userBankAccounts: userBankAccountsResolver
    }
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () => import('./bank-account-new/bank-account-new.component').then((c) => c.BankAccountNewComponent)
  },
  {
    path: ':bankAccountId',
    loadComponent: () =>
      import('./bank-account-detail/bank-account-detail.component').then((c) => c.BankAccountDetailComponent),
    resolve: {
      bankAccount: bankAccountResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction'
      },
      {
        path: 'transaction',
        loadChildren: () => import('./operations/transaction/transaction.routes').then((r) => r.routes)
      },
      {
        path: 'investment',
        loadChildren: () => import('./operations/investment/investment.routes').then((r) => r.routes)
      },
      {
        path: 'loan',
        loadChildren: () => import('./operations/loan/loan.routes').then((r) => r.routes)
      },
      {
        path: 'insurance-policy',
        loadChildren: () => import('./operations/insurance-policy/insurance-policy.routes').then((r) => r.routes)
      }
    ]
  }
];
