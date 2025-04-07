import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { TableComponent } from '../../../shared/components/table/table.component';
import { InsurancePolicyProductGet } from '../../../../api';
import { TableColumns, TableRows } from '../../../shared/components/table/table.model';
import { CurrencyService } from '../../../shared/services/currency.service';
import { InsurancePolicyProductTypeNamePipe } from '../insurance-policy-product-type-name.pipe';

@Component({
  selector: 'app-insurance-policy-product-list',
  imports: [TableComponent],
  templateUrl: './insurance-policy-product-list.component.html',
  styleUrl: './insurance-policy-product-list.component.css'
})
export class InsurancePolicyProductListComponent {
  protected route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected readonly insurancePolicyProducts = toSignal<InsurancePolicyProductGet[]>(
    this.route.data.pipe(map((data) => data['insurancePolicyProducts']))
  );

  tableColumns: TableColumns = [
    {
      name: 'name',
      label: 'Nome'
    },
    {
      name: 'annualPremium',
      label: 'Premio annuale'
    },
    {
      name: 'type',
      label: 'Tipologia'
    },
    {
      name: 'coverageCap',
      label: 'Massimale'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const insurancePolicyProducts = this.insurancePolicyProducts();
    if (!insurancePolicyProducts) {
      return [];
    }
    return insurancePolicyProducts.map((insurancePolicyProduct: InsurancePolicyProductGet) => ({
      name: {
        label: insurancePolicyProduct.name
      },
      annualPremium: {
        label: `${insurancePolicyProduct.annualPremium} ${this.currencyService.defaultAccountCurrency}`
      },
      type: {
        label: new InsurancePolicyProductTypeNamePipe().transform(insurancePolicyProduct.type)
      },
      coverageCap: {
        label: `${insurancePolicyProduct.coverageCap} ${this.currencyService.defaultAccountCurrency}`
      },
      actions: {
        label: 'Dettaglio',
        route: `/management/insurance-policy-product/${insurancePolicyProduct.id}`
      }
    })) as TableRows;
  });
}
