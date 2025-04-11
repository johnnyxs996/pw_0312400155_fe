import { Routes } from '@angular/router';

import { investmentProductResolver, investmentProductsResolver } from './investment-product.resolver';

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
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./investment-product-new/investment-product-new.component').then((c) => c.InvestmentProductNewComponent)
  },
  {
    path: ':investmentProductId',
    loadComponent: () =>
      import('./investment-product-detail/investment-product-detail.component').then(
        (c) => c.InvestmentProductDetailComponent
      ),
    resolve: {
      investmentProduct: investmentProductResolver
    }
  }
];
