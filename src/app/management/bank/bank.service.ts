import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { BankApiService, BankGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private bankApiService = inject(BankApiService);

  private banksCache = new Map<string, BankGet>();

  public getBanks(): Observable<BankGet[]> {
    return this.bankApiService.banksGet().pipe(tap((banks: BankGet[]) => this.addBanksToCache(banks)));
  }

  public getBank(bankId: string): Observable<BankGet> {
    if (this.banksCache.has(bankId)) {
      return of(this.getBankFromCache(bankId)!);
    }
    return this.bankApiService.banksIdGet(bankId).pipe(tap((bank) => this.addBanksToCache([bank])));
  }

  private addBanksToCache(banks: BankGet[]): void {
    banks.forEach((bank) => {
      this.banksCache.set(bank.id, bank);
    });
  }

  private getBankFromCache(bankId: string): BankGet | undefined {
    return this.banksCache.get(bankId);
  }
}
