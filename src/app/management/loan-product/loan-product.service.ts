import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoanProductApiService, LoanProductGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class LoanProductService {
  protected loanProductApiService = inject(LoanProductApiService);

  getLoanProducts(): Observable<LoanProductGet[]> {
    return this.loanProductApiService.loanProductsGet();
  }
}
