import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CardConfig, DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { BankGet } from '../../../../api';

@Component({
  selector: 'app-bank-detail',
  imports: [PageHeaderComponent, DetailCardComponent],
  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.css'
})
export class BankDetailComponent {
  private route = inject(ActivatedRoute);

  protected bank = toSignal<BankGet>(this.route.data.pipe(map((data) => data['bank'])));

  cardDetail: Signal<CardConfig | undefined> = computed(() => {
    const bank = this.bank();
    if (!bank) {
      return undefined;
    }
    return {
      rows: [
        [
          {
            title: 'Filiale',
            description: bank.name
          },
          {
            title: 'Codice Swift',
            description: bank.swiftCode
          }
        ],
        [
          {
            title: 'Indirizzo',
            description: bank.address
          },
          {
            title: 'Numero di telefono',
            description: bank.phone
          }
        ]
      ]
    } as CardConfig;
  });
}
