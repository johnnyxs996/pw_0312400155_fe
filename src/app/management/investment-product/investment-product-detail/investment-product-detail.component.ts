import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { InvestmentProductGet } from '../../../../api';
import { InvestmentProductTypeNamePipe } from '../investment-product-type-name.pipe';

@Component({
  selector: 'app-investment-product-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './investment-product-detail.component.html',
  styleUrl: './investment-product-detail.component.css'
})
export class InvestmentProductDetailComponent {
  private route = inject(ActivatedRoute);

  protected investmentProduct = toSignal<InvestmentProductGet>(
    this.route.data.pipe(map((data) => data['investmentProduct']))
  );

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const investmentProduct = this.investmentProduct();
    if (!investmentProduct) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Nome',
            description: investmentProduct.name
          }
        ],
        [
          {
            title: 'Tasso',
            description: `${investmentProduct.rate}%`
          },
          {
            title: 'Tipologia',
            description: new InvestmentProductTypeNamePipe().transform(investmentProduct.type)
          }
        ]
      ]
    } as CardConfig;
  });
}
