import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { TransactionGet } from '../../../../../api';
import { TransactionTypeNamePipe } from '../transaction-type-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumns, TableRows } from '../../../../shared/components/table/table.model';

@Component({
  selector: 'app-transaction-list',
  imports: [TableComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnDestroy, OnInit {
  private route = inject(ActivatedRoute);
  protected bankAccountDetailService = inject(BankAccountDetailService);
  protected currencyService = inject(CurrencyService);
  protected datePipe = inject(DatePipe);

  bankAccountId: Signal<string> = toSignal(
    this.route.parent!.parent!.params.pipe(map((params) => params['bankAccountId']))
  );
  protected transactions = toSignal<TransactionGet[]>(this.route.data.pipe(map((data) => data['transactions'])));

  tableColumns: TableColumns = [
    {
      name: 'description',
      label: 'Descrizione'
    },
    {
      name: 'amount',
      label: 'Importo'
    },
    {
      name: 'createdAt',
      label: 'Data'
    },
    {
      name: 'type',
      label: 'Tipologia'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const transactions = this.transactions();
    const bankAccountId = this.bankAccountId();
    if (!transactions || !bankAccountId) {
      return [];
    }
    return transactions.map((transaction: TransactionGet) => ({
      description: {
        label: transaction.description
      },
      amount: {
        label: `${transaction.sourceAccountId === bankAccountId ? '-' : '+'}${transaction.amount} ${this.currencyService.defaultAccountCurrency}`
      },
      createdAt: {
        label: this.datePipe.transform(transaction.createdAt)
      },
      type: {
        label: new TransactionTypeNamePipe().transform(transaction.type)
      },
      actions: {
        label: 'Dettaglio',
        route: `/bank-account/${bankAccountId}/transaction/${transaction.id}`
      }
    })) as TableRows;
  });

  ngOnInit() {
    this.bankAccountDetailService.bankAccountRootVisible.set(true);
  }

  ngOnDestroy() {
    this.bankAccountDetailService.bankAccountRootVisible.set(false);
  }
}
