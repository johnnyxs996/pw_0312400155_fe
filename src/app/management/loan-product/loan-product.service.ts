import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { LoanProductApiService, LoanProductGet, LoanProductsPost } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class LoanProductService {
  protected loanProductApiService = inject(LoanProductApiService);

  private loanProductsCache = new Map<string, LoanProductGet>();

  getLoanProducts(forceCache: boolean = true): Observable<LoanProductGet[]> {
    if (forceCache && this.loanProductsCache.size) {
      return of(Array.from(this.loanProductsCache.values()));
    }
    return this.loanProductApiService
      .loanProductsGet()
      .pipe(tap((loanProducts: LoanProductGet[]) => this.addLoanProductsToCache(loanProducts)));
  }

  getLoanProduct(loanProductId: string): LoanProductGet | undefined {
    return this.getLoanProductFromCache(loanProductId);
  }

  createLoanProduct(loanProductPost: LoanProductsPost) {
    return this.loanProductApiService.loanProductsPost(loanProductPost);
  }

  private addLoanProductsToCache(loanProducts: LoanProductGet[]): void {
    loanProducts.forEach((loanProduct) => {
      this.loanProductsCache.set(loanProduct.id, loanProduct);
    });
  }

  private getLoanProductFromCache(loanProductId: string): LoanProductGet | undefined {
    return this.loanProductsCache.get(loanProductId);
  }
}
