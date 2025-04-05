import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { InvestmentProductApiService, InvestmentProductGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProductService {
  protected investmentProductApiService = inject(InvestmentProductApiService);

  getInvestmentProducts(): Observable<InvestmentProductGet[]> {
    return this.investmentProductApiService.investmentProductsGet();
  }
}
