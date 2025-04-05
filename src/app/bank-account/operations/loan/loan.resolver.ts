import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { LoanService } from './loan.service';
import { LoanGet } from '../../../../api';

export const loanResolver: ResolveFn<LoanGet> = (route, state) => {
  const loanService = inject(LoanService);
  const loanId = route.paramMap.get('loanId')!;
  return loanService.getLoan(loanId);
};

export const loansByBankAccountResolver: ResolveFn<LoanGet[]> = (route, state) => {
  const loanService = inject(LoanService);
  const bankAccountId = route.parent!.parent!.paramMap.get('bankAccountId')!;
  return loanService.getBankAccountLoans(bankAccountId);
};
