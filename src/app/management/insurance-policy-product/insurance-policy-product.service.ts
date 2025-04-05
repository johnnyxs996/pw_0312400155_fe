import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { InsurancePolicyProductApiService, InsurancePolicyProductGet } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyProductService {
  protected insurancePolicyProductApiService = inject(InsurancePolicyProductApiService);

  getInsurancePolicyProducts(): Observable<InsurancePolicyProductGet[]> {
    return this.insurancePolicyProductApiService.insurancePolicyProductsGet();
  }
}
