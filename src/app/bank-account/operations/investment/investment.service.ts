import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ResourcePostResponse, InvestmentApiService, InvestmentGet, InvestmentsPost } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private investmentApiService = inject(InvestmentApiService);

  public getBankAccountInvestments(bankAccountId: string): Observable<InvestmentGet[]> {
    return this.investmentApiService.investmentsGet(bankAccountId);
  }

  getInvestment(investmentId: string): Observable<InvestmentGet> {
    return this.investmentApiService.investmentsIdGet(investmentId);
  }

  public createInvestment(investmentData: InvestmentsPost): Observable<ResourcePostResponse> {
    return this.investmentApiService.investmentsPost(investmentData);
  }
}
