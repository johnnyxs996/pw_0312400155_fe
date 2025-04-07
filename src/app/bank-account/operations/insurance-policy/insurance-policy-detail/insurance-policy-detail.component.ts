import { DatePipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { InsurancePolicyGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { InsurancePolicyStatusNamePipe } from '../insurance-policy-status-name.pipe';

@Component({
  selector: 'app-insurance-policy-detail',
  imports: [MatCardModule, PageHeaderComponent, DetailCardComponent],
  templateUrl: './insurance-policy-detail.component.html',
  styleUrl: './insurance-policy-detail.component.css'
})
export class InsurancePolicyDetailComponent {
  private route = inject(ActivatedRoute);
  protected datePipe = inject(DatePipe);
  protected currencyService = inject(CurrencyService);

  protected insurancePolicy = toSignal<InsurancePolicyGet>(
    this.route.data.pipe(map((data) => data['insurancePolicy']))
  );

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const insurancePolicy = this.insurancePolicy();
    if (!insurancePolicy) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Tipologia',
            description: insurancePolicy.insurancePolicyProductId
          },
          {
            title: 'Stato',
            description: new InsurancePolicyStatusNamePipe().transform(insurancePolicy.status!)
          }
        ],
        [
          {
            title: 'Data inizio',
            description: this.datePipe.transform(insurancePolicy.startDate)
          },
          {
            title: 'Data fine',
            description: this.datePipe.transform(insurancePolicy.endDate)
          }
        ],
        [
          {
            title: 'Tipologia',
            description: insurancePolicy.insurancePolicyProductId
          }
        ]
      ]
    } as CardConfig;
  });
}
