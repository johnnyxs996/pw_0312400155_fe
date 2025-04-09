import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { BankAccountGet } from '../../../api';
import { TableComponent } from '../../shared/components/table/table.component';
import { TableColumns, TableRows } from '../../shared/components/table/table.model';
import { SidenavService } from '../../shared/services/sidenav.service';
import { BankService } from '../../management/bank/bank.service';

@Component({
  selector: 'app-bank-account-list',
  imports: [TableComponent],
  templateUrl: './bank-account-list.component.html',
  styleUrl: './bank-account-list.component.css'
})
export class BankAccountListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private datePipe = inject(DatePipe);
  private bankService = inject(BankService);
  private sidenavService = inject(SidenavService);

  protected userBankAccounts = toSignal<BankAccountGet[]>(
    this.route.data.pipe(map((data) => data['userBankAccounts']))
  );

  tableColumns: TableColumns = [
    {
      name: 'bankId',
      label: 'Filiale'
    },
    {
      name: 'createdAt',
      label: 'Data di apertura'
    },
    {
      name: 'accountNumber',
      label: 'Numero conto'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const userBankAccounts = this.userBankAccounts();
    if (!userBankAccounts) {
      return [];
    }
    return userBankAccounts.map((userBankAccount: BankAccountGet) => ({
      bankId: {
        label: this.bankService.getBank(userBankAccount.bankId)?.name
      },
      createdAt: {
        label: this.datePipe.transform(userBankAccount.createdAt)
      },
      accountNumber: {
        label: userBankAccount.accountNumber
      },
      actions: {
        label: 'Dettaglio',
        route: `/bank-account/${userBankAccount.id}`
      }
    })) as TableRows;
  });

  ngOnInit() {
    const navlistRoutes: { routePath: string; routeLabel: string; iconName?: string }[] = [
      { routePath: '/bank-account/list', routeLabel: 'Conti bancari', iconName: 'account_balance' }
    ];
    this.sidenavService.setNavlistConfig(navlistRoutes);
  }
}
