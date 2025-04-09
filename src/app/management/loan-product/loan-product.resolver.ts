import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { LoanProductGet } from '../../../api';
import { LoanProductService } from './loan-product.service';

export const loanProductsResolver: ResolveFn<LoanProductGet[]> = (route, state) => {
  const loanProductService = inject(LoanProductService);
  return loanProductService.getLoanProducts(false);
};
