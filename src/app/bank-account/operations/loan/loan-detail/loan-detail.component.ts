import { DatePipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { LoanGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { LoanStatusNamePipe } from '../loan-status-name.pipe';
import { LoanProductService } from '../../../../management/loan-product/loan-product.service';
import { LoanProductTypeNamePipe } from '../../../../management/loan-product/loan-product-type-name.pipe';

@Component({
  selector: 'app-loan-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './loan-detail.component.html',
  styleUrl: './loan-detail.component.css'
})
export class LoanDetailComponent {
  private route = inject(ActivatedRoute);
  protected datePipe = inject(DatePipe);
  protected currencyService = inject(CurrencyService);
  protected loanProductService = inject(LoanProductService);

  protected loan = toSignal<LoanGet>(this.route.data.pipe(map((data) => data['loan'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const loan = this.loan();
    if (!loan) {
      return undefined;
    }
    const loanProduct = this.loanProductService.getLoanProduct(loan.loanProductId);
    return {
      rows: [
        [
          {
            title: 'Tipologia',
            description: new LoanProductTypeNamePipe().transform(loanProduct!.type!)
          },
          {
            title: 'Stato',
            description: new LoanStatusNamePipe().transform(loan.status!)
          }
        ],
        [
          {
            title: 'Data inizio',
            description: this.datePipe.transform(loan.startDate)
          },
          {
            title: 'Data fine',
            description: this.datePipe.transform(loan.endDate)
          }
        ],
        [
          {
            title: 'Ammontare',
            description: `${loan.amount} ${this.currencyService.defaultAccountCurrency}`
          },
          {
            title: 'Tasso',
            description: `${loanProduct?.rate}%`
          }
        ]
      ]
    } as CardConfig;
  });
}
