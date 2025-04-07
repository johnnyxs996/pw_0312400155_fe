import { Routes } from '@angular/router';

import { loanProductsResolver } from './loan-product.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./loan-product-list/loan-product-list.component').then((c) => c.LoanProductListComponent),
    resolve: {
      loanProducts: loanProductsResolver
    }
  }
];
