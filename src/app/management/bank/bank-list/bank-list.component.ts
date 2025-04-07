import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

import { TableColumns, TableRows } from '../../../shared/components/table/table.model';
import { BankGet } from '../../../../api';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-bank-list',
  imports: [TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css'
})
export class BankListComponent {
  protected route = inject(ActivatedRoute);

  protected readonly banks = toSignal<BankGet[]>(this.route.data.pipe(map((data) => data['banks'])));

  tableColumns: TableColumns = [
    {
      name: 'name',
      label: 'Filiale'
    },
    {
      name: 'swiftCode',
      label: 'Codice Swift'
    },
    {
      name: 'address',
      label: 'Indirizzo'
    },
    {
      name: 'phone',
      label: 'Numero di telefono'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const banks = this.banks();
    if (!banks) {
      return [];
    }
    return banks.map((bank: BankGet) => ({
      name: {
        label: bank.name
      },
      swiftCode: {
        label: bank.swiftCode
      },
      address: {
        label: bank.address
      },
      phone: {
        label: bank.phone
      },
      actions: {
        label: 'Dettaglio',
        route: `/management/bank/${bank.id}`
      }
    })) as TableRows;
  });
}
