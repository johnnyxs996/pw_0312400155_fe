import { Routes } from '@angular/router';

import { insurancePolicyProductsResolver } from './insurance-policy-product.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./insurance-policy-product-list/insurance-policy-product-list.component').then(
        (c) => c.InsurancePolicyProductListComponent
      ),
    resolve: {
      insurancePolicyProducts: insurancePolicyProductsResolver
    }
  }
];
