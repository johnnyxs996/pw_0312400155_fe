import { Routes } from '@angular/router';

import { loanProductResolver, loanProductsResolver } from './loan-product.resolver';

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
  },
  {
    path: 'new',
    loadComponent: () => import('./loan-product-new/loan-product-new.component').then((c) => c.LoanProductNewComponent)
  },
  {
    path: ':loanProductId',
    loadComponent: () =>
      import('./loan-product-detail/loan-product-detail.component').then((c) => c.LoanProductDetailComponent),
    resolve: {
      loanProduct: loanProductResolver
    }
  }
];
