import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { InsurancePolicyProductGet } from '../../../../api';
import { InsurancePolicyProductTypeNamePipe } from '../insurance-policy-product-type-name.pipe';
import { CurrencyService } from '../../../shared/services/currency.service';

@Component({
  selector: 'app-insurance-policy-product-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './insurance-policy-product-detail.component.html',
  styleUrl: './insurance-policy-product-detail.component.css'
})
export class InsurancePolicyProductDetailComponent {
  private route = inject(ActivatedRoute);
  private currencyService = inject(CurrencyService);

  protected insurancePolicyProduct = toSignal<InsurancePolicyProductGet>(
    this.route.data.pipe(map((data) => data['insurancePolicyProduct']))
  );

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const insurancePolicyProduct = this.insurancePolicyProduct();
    if (!insurancePolicyProduct) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Nome',
            description: insurancePolicyProduct.name
          },
          {
            title: 'Premio annuale',
            description: `${insurancePolicyProduct.annualPremium} ${this.currencyService.defaultAccountCurrency}`
          }
        ],
        [
          {
            title: 'Tipologia',
            description: new InsurancePolicyProductTypeNamePipe().transform(insurancePolicyProduct.type)
          },
          {
            title: 'Massimale',
            description: `${insurancePolicyProduct.coverageCap} ${this.currencyService.defaultAccountCurrency}`
          }
        ]
      ]
    } as CardConfig;
  });
}
