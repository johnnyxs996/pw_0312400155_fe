import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { InvestmentProductGet } from '../../../api';
import { InvestmentProductService } from './investment-product.service';

export const investmentProductResolver: ResolveFn<InvestmentProductGet | undefined> = (route, state) => {
  const investmentProductService = inject(InvestmentProductService);
  const investmentProductId = route.params['investmentProductId'];
  return investmentProductService.getInvestmentProduct(investmentProductId);
};

export const investmentProductsResolver: ResolveFn<InvestmentProductGet[]> = (route, state) => {
  const investmentProductService = inject(InvestmentProductService);
  return investmentProductService.getInvestmentProducts(false);
};
