import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { InsurancePolicyService } from './insurance-policy.service';
import { InsurancePolicyGet } from '../../../../api';

export const insurancePolicyResolver: ResolveFn<InsurancePolicyGet> = (route, state) => {
  const insurancePolicyService = inject(InsurancePolicyService);
  const insurancePolicyId = route.paramMap.get('insurancePolicyId')!;
  return insurancePolicyService.getInsurancePolicy(insurancePolicyId);
};

export const insurancePoliciesByBankAccountResolver: ResolveFn<InsurancePolicyGet[]> = (route, state) => {
  const insurancePolicyService = inject(InsurancePolicyService);
  const bankAccountId = route.parent!.parent!.paramMap.get('bankAccountId')!;
  return insurancePolicyService.getBankAccountInsurancePolicies(bankAccountId);
};
