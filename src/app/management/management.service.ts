import { inject, Injectable } from '@angular/core';

import { combineLatest } from 'rxjs';

import { BankService } from './bank/bank.service';
import { InsurancePolicyProductService } from './insurance-policy-product/insurance-policy-product.service';
import { InvestmentProductService } from './investment-product/investment-product.service';
import { LoanProductService } from './loan-product/loan-product.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private bankService = inject(BankService);
  private insurancePolicyProductService = inject(InsurancePolicyProductService);
  private investmentProductService = inject(InvestmentProductService);
  private loanProductService = inject(LoanProductService);

  bootstrapBanksAndProducts() {
    return combineLatest([
      this.bankService.getBanks(false),
      this.insurancePolicyProductService.getInsurancePolicyProducts(false),
      this.investmentProductService.getInvestmentProducts(false),
      this.loanProductService.getLoanProducts(false)
    ]).subscribe();
  }
}
