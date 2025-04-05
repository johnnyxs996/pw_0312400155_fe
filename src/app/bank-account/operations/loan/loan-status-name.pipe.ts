import { Pipe, PipeTransform } from '@angular/core';

import { LoanGet } from '../../../../api';

@Pipe({
  name: 'loanStatusName'
})
export class LoanStatusNamePipe implements PipeTransform {
  transform(loanStatus: LoanGet.StatusEnum): string {
    switch (loanStatus) {
      case LoanGet.StatusEnum.Closed:
        return 'Chiuso';
      case LoanGet.StatusEnum.Active:
      default:
        return 'Attivo';
    }
  }
}
