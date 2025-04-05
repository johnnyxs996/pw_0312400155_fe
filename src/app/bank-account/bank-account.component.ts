import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter, map, startWith } from 'rxjs';

import { getAllPathParams } from '../shared/utils/route';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-bank-account',
  imports: [MatIconModule, MatButtonModule, MatTabsModule, MatSidenavModule, MatToolbarModule, RouterOutlet],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css'
})
export class BankAccountComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected sidenavService = inject(SidenavService);

  protected pathParamsFromRoot = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => getAllPathParams(this.route)),
      startWith(getAllPathParams(this.route))
    )
  );

  protected bankAccountId = computed(() => this.pathParamsFromRoot()?.['bankAccountId']);
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
