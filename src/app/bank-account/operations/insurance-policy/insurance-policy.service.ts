import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  ResourcePostResponse,
  InsurancePolicyApiService,
  InsurancePolicyGet,
  InsurancePoliciesPost
} from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  private insurancePolicyApiService = inject(InsurancePolicyApiService);

  public getBankAccountInsurancePolicies(bankAccountId: string): Observable<InsurancePolicyGet[]> {
    return this.insurancePolicyApiService.insurancePoliciesGet(bankAccountId);
  }

  getInsurancePolicy(insurancePolicyId: string): Observable<InsurancePolicyGet> {
    return this.insurancePolicyApiService.insurancePoliciesIdGet(insurancePolicyId);
  }

  public createInsurancePolicy(insurancePolicyData: InsurancePoliciesPost): Observable<ResourcePostResponse> {
    return this.insurancePolicyApiService.insurancePoliciesPost(insurancePolicyData);
  }
}
