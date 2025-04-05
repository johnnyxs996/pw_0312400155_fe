import { Routes } from '@angular/router';

import { insurancePoliciesByBankAccountResolver, insurancePolicyResolver } from './insurance-policy.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./insurance-policy-list/insurance-policy-list.component').then((c) => c.InsurancePolicyListComponent),
    resolve: {
      insurancePolicies: insurancePoliciesByBankAccountResolver
    }
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./insurance-policy-new/insurance-policy-new.component').then((c) => c.InsurancePolicyNewComponent)
  },
  {
    path: ':insurancePolicyId',
    loadComponent: () =>
      import('./insurance-policy-detail/insurance-policy-detail.component').then(
        (c) => c.InsurancePolicyDetailComponent
      ),
    resolve: {
      insurancePolicy: insurancePolicyResolver
    }
  }
];
