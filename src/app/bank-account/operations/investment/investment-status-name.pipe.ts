import { Pipe, PipeTransform } from '@angular/core';

import { InvestmentGet } from '../../../../api';

@Pipe({
  name: 'investmentStatusName'
})
export class InvestmentStatusNamePipe implements PipeTransform {
  transform(investmentStatus: InvestmentGet.StatusEnum): string {
    switch (investmentStatus) {
      case InvestmentGet.StatusEnum.Closed:
        return 'Chiuso';
      case InvestmentGet.StatusEnum.Active:
      default:
        return 'Attivo';
    }
  }
}
