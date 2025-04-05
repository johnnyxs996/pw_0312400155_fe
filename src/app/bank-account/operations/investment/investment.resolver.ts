import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { InvestmentService } from './investment.service';
import { InvestmentGet } from '../../../../api';

export const investmentResolver: ResolveFn<InvestmentGet> = (route, state) => {
  const investmentService = inject(InvestmentService);
  const investmentId = route.paramMap.get('investmentId')!;
  return investmentService.getInvestment(investmentId);
};

export const investmentsByBankAccountResolver: ResolveFn<InvestmentGet[]> = (route, state) => {
  const investmentService = inject(InvestmentService);
  const bankAccountId = route.parent!.parent!.paramMap.get('bankAccountId')!;
  return investmentService.getBankAccountInvestments(bankAccountId);
};
