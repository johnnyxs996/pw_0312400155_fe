import { Pipe, PipeTransform } from '@angular/core';

import { InvestmentProductGet } from '../../../api';

@Pipe({
  name: 'investmentProductTypeName'
})
export class InvestmentProductTypeNamePipe implements PipeTransform {
  transform(investmentProductType: InvestmentProductGet.TypeEnum): string {
    switch (investmentProductType) {
      case InvestmentProductGet.TypeEnum.Action:
        return 'Azione';
      case InvestmentProductGet.TypeEnum.Bond:
        return 'Obbligazione';
      case InvestmentProductGet.TypeEnum.Crypto:
        return 'Criptovaluta';
      case InvestmentProductGet.TypeEnum.Etf:
        return 'ETF';
      case InvestmentProductGet.TypeEnum.Fund:
        return 'Fondo';
      case InvestmentProductGet.TypeEnum.RawMaterials:
        return 'Materia Prima';
      default:
        return 'N/A';
    }
  }
}
