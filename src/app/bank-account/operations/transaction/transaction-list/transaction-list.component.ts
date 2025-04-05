import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map, tap } from 'rxjs';

import { TransactionGet } from '../../../../../api';
import { TransactionTypeNamePipe } from '../transaction-type-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';

@Component({
  selector: 'app-transaction-list',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    TransactionTypeNamePipe,
    MatIconModule
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnDestroy, OnInit {
  private route = inject(ActivatedRoute);
  protected bankAccountDetailService = inject(BankAccountDetailService);
  protected currencyService = inject(CurrencyService);

  bankAccountId: Signal<string> = toSignal(
    this.route.parent!.parent!.params.pipe(
      map((params) => params['bankAccountId'])
    )
  );
  protected transactions = toSignal<TransactionGet[]>(this.route.data.pipe(map((data) => data['transactions'])));

  tableColumns: string[] = ['description', 'amount', 'createdAt', 'type', 'actions'];

  ngOnInit() {
    this.bankAccountDetailService.bankAccountRootVisible.set(true);
  }

  ngOnDestroy() {
    this.bankAccountDetailService.bankAccountRootVisible.set(false);
  }
}
