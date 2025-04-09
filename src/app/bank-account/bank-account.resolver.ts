import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { BankAccountService } from './bank-account.service';
import { LoggedUserProfileService } from '../auth/logged-user-profile.service';
import { BankAccountGet } from '../../api';
import { CurrencyService } from '../shared/services/currency.service';
import { tap } from 'rxjs';

export const bankAccountResolver: ResolveFn<BankAccountGet> = (route, state) => {
  const currencyService = inject(CurrencyService);
  const bankAccountService = inject(BankAccountService);
  const bankAccountId = route.paramMap.get('bankAccountId')!;
  return bankAccountService.getBankAccount(bankAccountId).pipe(
    tap((bankAccount) => {
      bankAccountService.currentBankAccountId.set(bankAccount.id);
      currencyService.defaultAccountCurrency = bankAccount.currency;
    })
  );
};

export const userBankAccountsResolver: ResolveFn<BankAccountGet[]> = (route, state) => {
  const bankAccountService = inject(BankAccountService);
  const loggedUserProfileService = inject(LoggedUserProfileService);
  // TODO: navigare se userid non presente
  const loggedUserProfileId = loggedUserProfileService.loggedUserProfileId!;
  return bankAccountService.getUserProfileBankAccounts(loggedUserProfileId);
};
