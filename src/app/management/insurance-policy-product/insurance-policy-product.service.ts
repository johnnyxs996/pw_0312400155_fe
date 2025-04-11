import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { InsurancePolicyProductApiService, InsurancePolicyProductGet, InsurancePolicyProductsPost } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyProductService {
  protected insurancePolicyProductApiService = inject(InsurancePolicyProductApiService);

  private insurancePolicyProductsCache = new Map<string, InsurancePolicyProductGet>();

  getInsurancePolicyProducts(forceCache: boolean = true): Observable<InsurancePolicyProductGet[]> {
    if (forceCache && this.insurancePolicyProductsCache.size) {
      return of(Array.from(this.insurancePolicyProductsCache.values()));
    }
    return this.insurancePolicyProductApiService
      .insurancePolicyProductsGet()
      .pipe(
        tap((insurancePolicyProducts: InsurancePolicyProductGet[]) =>
          this.addInsurancePolicyProductsToCache(insurancePolicyProducts)
        )
      );
  }

  getInsurancePolicyProduct(insurancePolicyProductId: string): InsurancePolicyProductGet | undefined {
    return this.getInsurancePolicyProductFromCache(insurancePolicyProductId);
  }

  createInsurancePolicyProduct(insurancePolicyProductsPost: InsurancePolicyProductsPost) {
    return this.insurancePolicyProductApiService.insurancePolicyProductsPost(insurancePolicyProductsPost);
  }

  private addInsurancePolicyProductsToCache(insurancePolicyProducts: InsurancePolicyProductGet[]): void {
    insurancePolicyProducts.forEach((insurancePolicyProduct) => {
      this.insurancePolicyProductsCache.set(insurancePolicyProduct.id, insurancePolicyProduct);
    });
  }

  private getInsurancePolicyProductFromCache(insurancePolicyProductId: string): InsurancePolicyProductGet | undefined {
    return this.insurancePolicyProductsCache.get(insurancePolicyProductId);
  }
}
