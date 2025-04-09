import { inject, Injectable, signal } from '@angular/core';

import { finalize, Observable } from 'rxjs';

import { GlobalSpinnerService } from '../shared/services/global-spinner.service';
import {
  BankAccountApiService,
  BankAccountGet,
  BankAccountsPost,
  ResourcePostResponse,
  UserBankAccountApiService
} from '../../api';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private bankAccountApiService = inject(BankAccountApiService);
  private userBankAccountApiService = inject(UserBankAccountApiService);
  private globalSpinnerService = inject(GlobalSpinnerService);

  currentBankAccountId = signal<string | undefined>(undefined);

  public getBankAccounts(): Observable<BankAccountGet[]> {
    return this.bankAccountApiService.bankAccountsGet();
  }

  public getUserProfileBankAccounts(userProfileId: string): Observable<BankAccountGet[]> {
    return this.userBankAccountApiService.userProfilesIdBankAccountsGet(userProfileId);
  }

  public createBankAccountForUserProfile(
    userProfileId: string,
    bankAccountData: BankAccountsPost
  ): Observable<ResourcePostResponse> {
    this.globalSpinnerService.startSpinner();
    return this.userBankAccountApiService
      .userProfilesIdBankAccountsPost(userProfileId, bankAccountData)
      .pipe(finalize(() => this.globalSpinnerService.stopSpinner()));
  }

  getBankAccount(bankAccountId: string): Observable<BankAccountGet> {
    return this.bankAccountApiService.bankAccountsIdGet(bankAccountId);
  }
}
