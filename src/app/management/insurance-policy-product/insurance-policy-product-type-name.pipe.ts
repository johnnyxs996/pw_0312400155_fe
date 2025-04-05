import { Pipe, PipeTransform } from '@angular/core';

import { InsurancePolicyProductGet } from '../../../api';

@Pipe({
  name: 'insurancePolicyProductTypeName'
})
export class InsurancePolicyProductTypeNamePipe implements PipeTransform {
  transform(insurancePolicyProductType: InsurancePolicyProductGet.TypeEnum): string {
    switch (insurancePolicyProductType) {
      case InsurancePolicyProductGet.TypeEnum.Car:
        return 'Auto';
      case InsurancePolicyProductGet.TypeEnum.Home:
        return 'Casa';
      case InsurancePolicyProductGet.TypeEnum.Life:
        return 'Vita';
      default:
        return 'N/A';
    }
  }
}
