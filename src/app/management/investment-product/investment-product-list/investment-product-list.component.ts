import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { TableComponent } from '../../../shared/components/table/table.component';
import { CurrencyService } from '../../../shared/services/currency.service';
import { InvestmentProductGet } from '../../../../api';
import { TableColumns, TableRows } from '../../../shared/components/table/table.model';
import { InvestmentProductTypeNamePipe } from '../investment-product-type-name.pipe';

@Component({
  selector: 'app-investment-product-list',
  imports: [TableComponent],
  templateUrl: './investment-product-list.component.html',
  styleUrl: './investment-product-list.component.css'
})
export class InvestmentProductListComponent {
  protected route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected readonly investmentProducts = toSignal<InvestmentProductGet[]>(
    this.route.data.pipe(map((data) => data['investmentProducts']))
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
    const investmentProducts = this.investmentProducts();
    if (!investmentProducts) {
      return [];
    }
    return investmentProducts.map((investmentProduct: InvestmentProductGet) => ({
      name: {
        label: investmentProduct.name
      },
      rate: {
        label: `${investmentProduct.rate}%`
      },
      type: {
        label: new InvestmentProductTypeNamePipe().transform(investmentProduct.type)
      },
      actions: {
        label: 'Dettaglio',
        route: `/management/investment-product/${investmentProduct.id}`
      }
    })) as TableRows;
  });
}
