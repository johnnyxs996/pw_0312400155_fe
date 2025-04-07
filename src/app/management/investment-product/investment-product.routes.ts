import { Routes } from '@angular/router';

import { investmentProductsResolver } from './investment-product.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./investment-product-list/investment-product-list.component').then(
        (c) => c.InvestmentProductListComponent
      ),
    resolve: {
      investmentProducts: investmentProductsResolver
    }
  }
];
