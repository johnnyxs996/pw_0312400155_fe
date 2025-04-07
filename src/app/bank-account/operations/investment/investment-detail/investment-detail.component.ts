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

  protected investment = toSignal<InvestmentGet>(this.route.data.pipe(map((data) => data['investment'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const investment = this.investment();
    if (!investment) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Tipologia',
            description: investment.investmentProductId
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
            title: 'Ammontare',
            description: `${investment.amount} ${this.currencyService.defaultAccountCurrency}`
          }
        ]
      ]
    } as CardConfig;
  });
}
