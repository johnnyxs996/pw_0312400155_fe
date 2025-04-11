import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { LoanProductGet } from '../../../../api';
import { LoanProductTypeNamePipe } from '../loan-product-type-name.pipe';

@Component({
  selector: 'app-loan-product-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './loan-product-detail.component.html',
  styleUrl: './loan-product-detail.component.css'
})
export class LoanProductDetailComponent {
  private route = inject(ActivatedRoute);

  protected loanProduct = toSignal<LoanProductGet>(this.route.data.pipe(map((data) => data['loanProduct'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const loanProduct = this.loanProduct();
    if (!loanProduct) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Nome',
            description: loanProduct.name
          }
        ],
        [
          {
            title: 'Tasso',
            description: `${loanProduct.rate}%`
          },
          {
            title: 'Tipologia',
            description: new LoanProductTypeNamePipe().transform(loanProduct.type)
          }
        ]
      ]
    } as CardConfig;
  });
}
