import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { BankApiService, BankGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private bankApiService = inject(BankApiService);

  private banksCache = new Map<string, BankGet>();

  getBanks(forceCache: boolean = true): Observable<BankGet[]> {
    if (forceCache && this.banksCache.size) {
      return of(Array.from(this.banksCache.values()));
    }
    return this.bankApiService.banksGet().pipe(tap((banks: BankGet[]) => this.addBanksToCache(banks)));
  }

  getBank(bankId: string): BankGet | undefined {
    return this.getBankFromCache(bankId);
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
