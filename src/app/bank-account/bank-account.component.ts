import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { BankAccountService } from './bank-account.service';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-bank-account',
  imports: [RouterOutlet],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css'
})
export class BankAccountComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected bankAccountService = inject(BankAccountService);
  protected sidenavService = inject(SidenavService);

  protected bankAccountId = this.bankAccountService.currentBankAccountId;
  protected changeNavlistOnBankAccountIdChange = effect(() => {
    const bankAccountId = this.bankAccountId();
    const navlistRoutes: { routePath: string; routeLabel: string; iconName?: string }[] = [
      {
        routePath: `/bank-account/${bankAccountId}/transaction`,
        routeLabel: 'Operazioni',
        iconName: 'payments'
      },
      {
        routePath: `/bank-account/${bankAccountId}/investment`,
        routeLabel: 'Investimenti',
        iconName: 'currency_exchange'
      },
      {
        routePath: `/bank-account/${bankAccountId}/loan`,
        routeLabel: 'Prestiti',
        iconName: 'real_estate_agent'
      },
      {
        routePath: `/bank-account/${bankAccountId}/insurance-policy`,
        routeLabel: 'Polizze Assicurative',
        iconName: 'shield'
      }
    ];
    this.sidenavService.setNavlistConfig(navlistRoutes);
  });
}
