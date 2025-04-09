import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { LoanGet } from '../../../../../api';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';
import { TableColumns, TableRows } from '../../../../shared/components/table/table.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { LoanStatusNamePipe } from '../loan-status-name.pipe';
import { LoanProductService } from '../../../../management/loan-product/loan-product.service';
import { LoanProductTypeNamePipe } from '../../../../management/loan-product/loan-product-type-name.pipe';
import { BankAccountService } from '../../../bank-account.service';

@Component({
  selector: 'app-loan-list',
  imports: [TableComponent],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent implements OnDestroy, OnInit {
  protected route = inject(ActivatedRoute);
  protected datePipe = inject(DatePipe);
  protected loanProductService = inject(LoanProductService);
  protected bankAccountService = inject(BankAccountService);
  protected bankAccountDetailService = inject(BankAccountDetailService);
  protected currencyService = inject(CurrencyService);

  bankAccountId = this.bankAccountService.currentBankAccountId;
  protected loans = toSignal<LoanGet[]>(this.route.data.pipe(map((data) => data['loans'])));

  tableColumns: TableColumns = [
    {
      name: 'amount',
      label: 'Capitale investito'
    },
    {
      name: 'startDate',
      label: 'Data sottoscrizione'
    },
    {
      name: 'endDate',
      label: 'Data termine'
    },
    {
      name: 'status',
      label: 'Stato'
    },
    {
      name: 'loanProductId',
      label: 'Tipologia'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const loans = this.loans();
    if (!loans) {
      return [];
    }
    return loans.map((loan: LoanGet) => ({
      amount: {
        label: `${loan.amount} ${this.currencyService.defaultAccountCurrency}`
      },
      startDate: {
        label: this.datePipe.transform(loan.startDate)
      },
      endDate: {
        label: this.datePipe.transform(loan.endDate)
      },
      status: {
        label: new LoanStatusNamePipe().transform(loan.status!)
      },
      loanProductId: {
        label: new LoanProductTypeNamePipe().transform(
          this.loanProductService.getLoanProduct(loan.loanProductId)?.type!
        )
      },
      actions: {
        label: 'Dettaglio',
        route: `/bank-account/${this.bankAccountId()}/loan/${loan.id}`
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
