import { inject, Pipe, PipeTransform } from '@angular/core';

import { map, Observable } from 'rxjs';

import { BankService } from './bank.service';

@Pipe({
  name: 'bankName'
})
export class BankNamePipe implements PipeTransform {
  private bankService = inject(BankService);

  transform(bankId: string): Observable<string> {
    return this.bankService.getBank(bankId).pipe(map((bank) => bank.name));
  }
}
