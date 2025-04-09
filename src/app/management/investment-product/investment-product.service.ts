import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { InvestmentProductApiService, InvestmentProductGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProductService {
  protected investmentProductApiService = inject(InvestmentProductApiService);

  private investmentProductsCache = new Map<string, InvestmentProductGet>();

  getInvestmentProducts(forceCache: boolean = true): Observable<InvestmentProductGet[]> {
    if (forceCache && this.investmentProductsCache.size) {
      return of(Array.from(this.investmentProductsCache.values()));
    }
    return this.investmentProductApiService
      .investmentProductsGet()
      .pipe(tap((investmentProducts: InvestmentProductGet[]) => this.addInvestmentProductsToCache(investmentProducts)));
  }

  getInvestmentProduct(investmentProductId: string): InvestmentProductGet | undefined {
    return this.getInvestmentProductFromCache(investmentProductId);
  }

  private addInvestmentProductsToCache(investmentProducts: InvestmentProductGet[]): void {
    investmentProducts.forEach((investmentProduct) => {
      this.investmentProductsCache.set(investmentProduct.id, investmentProduct);
    });
  }

  private getInvestmentProductFromCache(investmentProductId: string): InvestmentProductGet | undefined {
    return this.investmentProductsCache.get(investmentProductId);
  }
}
