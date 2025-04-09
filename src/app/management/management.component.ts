import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';

import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-management',
  imports: [RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  private router = inject(Router);
  protected sidenavService = inject(SidenavService);

  protected navigationEvent = toSignal(this.router.events);

  protected changeNavlistOnRouteChange = effect(() => {
    const trigger = this.navigationEvent();
    const navlistRoutes: { routePath: string; routeLabel: string; iconName?: string }[] = [
      {
        routePath: `/management/bank`,
        routeLabel: 'Filiali',
        iconName: 'account_balance'
      },
      {
        routePath: `/management/investment-product`,
        routeLabel: 'Prodotti di investimento',
        iconName: 'currency_exchange'
      },
      {
        routePath: `/management/loan-product`,
        routeLabel: 'Tipologie di prestito',
        iconName: 'real_estate_agent'
      },
      {
        routePath: `/management/insurance-policy-product`,
        routeLabel: 'Prodotti assicurativi',
        iconName: 'shield'
      }
    ];
    this.sidenavService.setNavlistConfig(navlistRoutes);
  });
}
