import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';

import { InvestmentGet } from '../../../../../api';
import { InvestmentStatusNamePipe } from '../investment-status-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';
import { TableColumns, TableRows } from '../../../../shared/components/table/table.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BankAccountService } from '../../../bank-account.service';
import { InvestmentProductService } from '../../../../management/investment-product/investment-product.service';
import { InvestmentProductTypeNamePipe } from '../../../../management/investment-product/investment-product-type-name.pipe';

@Component({
  selector: 'app-investment-list',
  imports: [TableComponent],
  templateUrl: './investment-list.component.html',
  styleUrl: './investment-list.component.css'
})
export class InvestmentListComponent implements OnDestroy, OnInit {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected datePipe = inject(DatePipe);
  protected bankAccountDetailService = inject(BankAccountDetailService);
  protected bankAccountService = inject(BankAccountService);
  protected investmentProductService = inject(InvestmentProductService);
  protected currencyService = inject(CurrencyService);

  bankAccountId = this.bankAccountService.currentBankAccountId;
  protected investments = toSignal<InvestmentGet[]>(this.route.data.pipe(map((data) => data['investments'])));

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
      name: 'investmentProductId',
      label: 'Tipologia'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const investments = this.investments();
    if (!investments) {
      return [];
    }
    return investments.map((investment: InvestmentGet) => ({
      amount: {
        label: `${investment.amount} ${this.currencyService.defaultAccountCurrency}`
      },
      startDate: {
        label: this.datePipe.transform(investment.startDate)
      },
      endDate: {
        label: this.datePipe.transform(investment.endDate)
      },
      status: {
        label: new InvestmentStatusNamePipe().transform(investment.status!)
      },
      investmentProductId: {
        label: new InvestmentProductTypeNamePipe().transform(
          this.investmentProductService.getInvestmentProduct(investment.investmentProductId!)?.type!
        )
      },
      actions: {
        label: 'Dettaglio',
        route: `/bank-account/${this.bankAccountId()}/investment/${investment.id}`
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
