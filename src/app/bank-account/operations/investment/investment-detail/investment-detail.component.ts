import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { InvestmentGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import {
  CardConfig,
  DetailCardComponent,
  PipeName
} from '../../../../shared/components/detail-card/detail-card.component';

@Component({
  selector: 'app-investment-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css'
})
export class InvestmentDetailComponent {
  private route = inject(ActivatedRoute);
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
            description: investment.status,
            pipe: PipeName.InvestmentStatusName
          }
        ],
        [
          {
            title: 'Data inizio',
            description: investment.startDate,
            pipe: PipeName.Date
          },
          {
            title: 'Data fine',
            description: investment.endDate,
            pipe: PipeName.Date
          }
        ],
        [
          {
            title: 'Ammontare',
            description: `${investment.amount} ${this.currencyService.defaultAccountCurrency}`,
            pipe: PipeName.Date
          }
        ]
      ]
    };
  });
}
