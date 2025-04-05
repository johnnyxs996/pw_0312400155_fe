import { Pipe, PipeTransform } from '@angular/core';

import { LoanProductGet } from '../../../api';

@Pipe({
  name: 'loanProductTypeName'
})
export class LoanProductTypeNamePipe implements PipeTransform {
  transform(loanProductType: LoanProductGet.TypeEnum): string {
    switch (loanProductType) {
      case LoanProductGet.TypeEnum.CreditCard:
        return 'Carta di Credito';
      case LoanProductGet.TypeEnum.HomeMortgage:
        return 'Mutuo Casa';
      case LoanProductGet.TypeEnum.PersonalLoan:
        return 'Prestito Personale';
      default:
        return 'N/A';
    }
  }
}
