import { Routes } from '@angular/router';

import { investmentResolver, investmentsByBankAccountResolver } from './investment.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./investment-list/investment-list.component').then((c) => c.InvestmentListComponent),
    resolve: {
      investments: investmentsByBankAccountResolver
    }
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () => import('./investment-new/investment-new.component').then((c) => c.InvestmentNewComponent)
  },
  {
    path: ':investmentId',
    loadComponent: () =>
      import('./investment-detail/investment-detail.component').then((c) => c.InvestmentDetailComponent),
    resolve: {
      investment: investmentResolver
    }
  }
];
