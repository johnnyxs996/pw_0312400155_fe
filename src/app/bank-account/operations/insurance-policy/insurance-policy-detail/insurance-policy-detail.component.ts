import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { InsurancePolicyGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import {
  CardConfig,
  DetailCardComponent,
  PipeName
} from '../../../../shared/components/detail-card/detail-card.component';

@Component({
  selector: 'app-insurance-policy-detail',
  imports: [MatCardModule, PageHeaderComponent, DetailCardComponent],
  templateUrl: './insurance-policy-detail.component.html',
  styleUrl: './insurance-policy-detail.component.css'
})
export class InsurancePolicyDetailComponent {
  private route = inject(ActivatedRoute);
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
            description: insurancePolicy.status,
            pipe: PipeName.InsurancePolicyStatusName
          }
        ],
        [
          {
            title: 'Data inizio',
            description: insurancePolicy.startDate,
            pipe: PipeName.Date
          },
          {
            title: 'Data fine',
            description: insurancePolicy.endDate,
            pipe: PipeName.Date
          }
        ],
        [
          {
            title: 'Ammontare',
            description: insurancePolicy.insurancePolicyProductId,
            pipe: PipeName.InsurancePolicyProductAmount
          }
        ]
      ]
    };
  });
}
