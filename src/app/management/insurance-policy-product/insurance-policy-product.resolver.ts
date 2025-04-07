import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { InsurancePolicyProductGet } from '../../../api';
import { InsurancePolicyProductService } from './insurance-policy-product.service';

export const insurancePolicyProductsResolver: ResolveFn<InsurancePolicyProductGet[]> = (route, state) => {
  const insurancePolicyProductService = inject(InsurancePolicyProductService);
  return insurancePolicyProductService.getInsurancePolicyProducts();
};
