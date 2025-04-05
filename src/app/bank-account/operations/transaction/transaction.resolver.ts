import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { TransactionService } from './transaction.service';
import { TransactionGet } from '../../../../api';

export const transactionResolver: ResolveFn<TransactionGet> = (route, state) => {
  const transactionService = inject(TransactionService);
  const transactionId = route.paramMap.get('transactionId')!;
  return transactionService.getTransaction(transactionId);
};

export const transactionsByBankAccountResolver: ResolveFn<TransactionGet[]> = (route, state) => {
  const transactionService = inject(TransactionService);
  const bankAccountId = route.parent!.parent!.paramMap.get('bankAccountId')!;
  return transactionService.getBankAccountTransactions(bankAccountId);
};
