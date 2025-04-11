import { Routes } from '@angular/router';

import { insurancePolicyProductResolver, insurancePolicyProductsResolver } from './insurance-policy-product.resolver';

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
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./insurance-policy-product-new/insurance-policy-product-new.component').then(
        (c) => c.InsurancePolicyProductNewComponent
      )
  },
  {
    path: ':insurancePolicyProductId',
    loadComponent: () =>
      import('./insurance-policy-product-detail/insurance-policy-product-detail.component').then(
        (c) => c.InsurancePolicyProductDetailComponent
      ),
    resolve: {
      insurancePolicyProduct: insurancePolicyProductResolver
    }
  }
];
