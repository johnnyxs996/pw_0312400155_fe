import { DatePipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { InvestmentGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { InvestmentStatusNamePipe } from '../investment-status-name.pipe';
import { InvestmentProductTypeNamePipe } from '../../../../management/investment-product/investment-product-type-name.pipe';
import { InvestmentProductService } from '../../../../management/investment-product/investment-product.service';

@Component({
  selector: 'app-investment-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css'
})
export class InvestmentDetailComponent {
  private route = inject(ActivatedRoute);
  protected datePipe = inject(DatePipe);
  protected currencyService = inject(CurrencyService);
  protected investmentProductService = inject(InvestmentProductService);

  protected investment = toSignal<InvestmentGet>(this.route.data.pipe(map((data) => data['investment'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const investment = this.investment();
    if (!investment) {
      return undefined;
    }
    const investmentProduct = this.investmentProductService.getInvestmentProduct(investment.investmentProductId);
    return {
      rows: [
        [
          {
            title: 'Tipologia',
            description: new InvestmentProductTypeNamePipe().transform(investmentProduct?.type!)
          },
          {
            title: 'Stato',
            description: new InvestmentStatusNamePipe().transform(investment.status!)
          }
        ],
        [
          {
            title: 'Data inizio',
            description: this.datePipe.transform(investment.startDate)
          },
          {
            title: 'Data fine',
            description: this.datePipe.transform(investment.endDate)
          }
        ],
        [
          {
            title: 'Investimento',
            description: `${investment.amount} ${this.currencyService.defaultAccountCurrency}`
          },
          {
            title: 'Tasso',
            description: `${investmentProduct?.rate}%`
          }
        ]
      ]
    } as CardConfig;
  });
}
