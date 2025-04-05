import { Pipe, PipeTransform } from '@angular/core';

import { TransactionGet } from '../../../../api';

@Pipe({
  name: 'transactionTypeName'
})
export class TransactionTypeNamePipe implements PipeTransform {
  transform(transactionType: TransactionGet.TypeEnum): string {
    switch (transactionType) {
      case 'Deposit':
        return 'Deposito';
      case 'Transfer':
        return 'Bonifico';
      case 'Withdraw':
        return 'Prelievo';
    }
  }
}
