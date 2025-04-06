import { inject, Injectable } from '@angular/core';

import { BankService } from './bank/bank.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private bankService = inject(BankService);

  bootstrapBanksAndProducts() {
    this.bankService.getBanks().subscribe();
  }
}
