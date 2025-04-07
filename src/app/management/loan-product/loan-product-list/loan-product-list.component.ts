import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { CurrencyService } from '../../../shared/services/currency.service';
import { LoanProductGet } from '../../../../api';
import { TableColumns, TableRows } from '../../../shared/components/table/table.model';
import { LoanProductTypeNamePipe } from '../loan-product-type-name.pipe';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-loan-product-list',
  imports: [TableComponent],
  templateUrl: './loan-product-list.component.html',
  styleUrl: './loan-product-list.component.css'
})
export class LoanProductListComponent {
  protected route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected readonly loanProducts = toSignal<LoanProductGet[]>(
    this.route.data.pipe(map((data) => data['loanProducts']))
  );

  tableColumns: TableColumns = [
    {
      name: 'name',
      label: 'Nome'
    },
    {
      name: 'rate',
      label: 'Tasso'
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
    const loanProducts = this.loanProducts();
    if (!loanProducts) {
      return [];
    }
    return loanProducts.map((loanProduct: LoanProductGet) => ({
      name: {
        label: loanProduct.name
      },
      rate: {
        label: `${loanProduct.rate}%`
      },
      type: {
        label: new LoanProductTypeNamePipe().transform(loanProduct.type)
      },
      actions: {
        label: 'Dettaglio',
        route: `/management/loan-product/${loanProduct.id}`
      }
    })) as TableRows;
  });
}
