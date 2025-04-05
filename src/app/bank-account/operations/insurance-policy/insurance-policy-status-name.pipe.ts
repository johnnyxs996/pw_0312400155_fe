import { Pipe, PipeTransform } from '@angular/core';

import { InsurancePolicyGet } from '../../../../api';

@Pipe({
  name: 'insurancePolicyStatusName'
})
export class InsurancePolicyStatusNamePipe implements PipeTransform {
  transform(insurancePolicyStatus: InsurancePolicyGet.StatusEnum): string {
    switch (insurancePolicyStatus) {
      case InsurancePolicyGet.StatusEnum.Terminated:
        return 'Terminata';
      case InsurancePolicyGet.StatusEnum.Suspended:
        return 'Sospesa';
      case InsurancePolicyGet.StatusEnum.Active:
      default:
        return 'Attiva';
    }
  }
}
