import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { filter, map, startWith } from 'rxjs';

import { SidenavService } from '../shared/services/sidenav.service';
import { getAllPathParams } from '../shared/utils/route';

@Component({
  selector: 'app-management',
  imports: [RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
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

  protected changeNavlistOnRouteChange = effect(() => {
    const trigger = this.pathParamsFromRoot();
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
