import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { LoanGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import {
  CardConfig,
  DetailCardComponent,
  PipeName
} from '../../../../shared/components/detail-card/detail-card.component';

@Component({
  selector: 'app-loan-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './loan-detail.component.html',
  styleUrl: './loan-detail.component.css'
})
export class LoanDetailComponent {
  private route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected loan = toSignal<LoanGet>(this.route.data.pipe(map((data) => data['loan'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const loan = this.loan();
    if (!loan) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Tipologia',
            description: loan.loanProductId
          },
          {
            title: 'Stato',
            description: loan.status,
            pipe: PipeName.LoanStatusName
          }
        ],
        [
          {
            title: 'Data inizio',
            description: loan.startDate,
            pipe: PipeName.Date
          },
          {
            title: 'Data fine',
            description: loan.endDate,
            pipe: PipeName.Date
          }
        ],
        [
          {
            title: 'Ammontare',
            description: `${loan.amount} ${this.currencyService.defaultAccountCurrency}`,
            pipe: PipeName.Date
          }
        ]
      ]
    };
  });
}
