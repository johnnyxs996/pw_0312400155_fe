import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { BankNamePipe } from '../../management/bank/bank-name.pipe';
import { BankAccountGet } from '../../../api';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SidenavService } from '../../shared/services/sidenav.service';

@Component({
  selector: 'app-bank-account-list',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    DatePipe,
    BankNamePipe,
    AsyncPipe,
    MatIconModule
  ],
  templateUrl: './bank-account-list.component.html',
  styleUrl: './bank-account-list.component.css'
})
export class BankAccountListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sidenavService = inject(SidenavService);

  protected userBankAccounts = toSignal<BankAccountGet[]>(
    this.route.data.pipe(map((data) => data['userBankAccounts']))
  );

  tableColumns: string[] = ['bankId', 'createdAt', 'accountNumber', 'actions'];

  ngOnInit() {
    const navlistRoutes: { routePath: string; routeLabel: string; iconName?: string }[] = [
      { routePath: '/bank-account/list', routeLabel: 'Conti bancari', iconName: 'account_balance' }
    ];
    this.sidenavService.setNavlistConfig(navlistRoutes);
  }
}
