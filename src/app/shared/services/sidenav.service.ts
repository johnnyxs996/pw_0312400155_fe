import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private breakpointObserver = inject(BreakpointObserver);

  navlistConfig: WritableSignal<NavlistConfig[]> = signal([]);
  showSidenav = computed(() => !!this.navlistConfig().length);

  isHandset: Signal<boolean | undefined> = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );

  setNavlistConfig(navlistConfig: NavlistConfig[]) {
    this.navlistConfig.set(navlistConfig);
  }
}

export interface NavlistConfig {
  routePath: string;
  routeLabel: string;
  iconName?: string;
}
