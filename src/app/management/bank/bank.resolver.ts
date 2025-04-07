import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { BankService } from './bank.service';
import { BankGet } from '../../../api';

export const banksResolver: ResolveFn<BankGet[]> = (route, state) => {
  const bankService = inject(BankService);
  return bankService.getBanks();
};
