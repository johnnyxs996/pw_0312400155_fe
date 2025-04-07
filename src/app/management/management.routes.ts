import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bank',
    pathMatch: 'full'
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.routes').then((r) => r.routes)
  },
  {
    path: 'insurance-policy-product',
    loadChildren: () => import('./insurance-policy-product/insurance-policy-product.routes').then((r) => r.routes)
  },
  {
    path: 'investment-product',
    loadChildren: () => import('./investment-product/investment-product.routes').then((r) => r.routes)
  },
  {
    path: 'loan-product',
    loadChildren: () => import('./loan-product/loan-product.routes').then((r) => r.routes)
  }
];
