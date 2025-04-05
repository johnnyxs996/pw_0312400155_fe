import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ResourcePostResponse, LoanApiService, LoanGet, LoansPost } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loanApiService = inject(LoanApiService);

  public getBankAccountLoans(bankAccountId: string): Observable<LoanGet[]> {
    return this.loanApiService.loansGet(bankAccountId);
  }

  getLoan(loanId: string): Observable<LoanGet> {
    return this.loanApiService.loansIdGet(loanId);
  }

  public createLoan(loanData: LoansPost): Observable<ResourcePostResponse> {
    return this.loanApiService.loansPost(loanData);
  }
}
