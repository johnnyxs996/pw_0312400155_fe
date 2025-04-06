import { inject, Pipe, PipeTransform } from '@angular/core';

import { BankService } from './bank.service';

@Pipe({
  name: 'bankName'
})
export class BankNamePipe implements PipeTransform {
  private bankService = inject(BankService);

  transform(bankId: string | undefined): string {
    if (!bankId) {
      return 'N/A';
    }
    return this.bankService.getBank(bankId)?.name || 'N/A';
  }
}
