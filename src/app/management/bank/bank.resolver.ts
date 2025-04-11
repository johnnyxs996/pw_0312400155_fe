import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { BankService } from './bank.service';
import { BankGet } from '../../../api';

export const bankResolver: ResolveFn<BankGet | undefined> = (route, state) => {
  const bankService = inject(BankService);
  const bankId = route.params['bankId'];
  return bankService.getBank(bankId);
};

export const banksResolver: ResolveFn<BankGet[]> = (route, state) => {
  const bankService = inject(BankService);
  return bankService.getBanks(false);
};
