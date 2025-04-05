import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { distinctUntilChanged, map, startWith } from 'rxjs';

import { SidenavService } from '../../services/sidenav.service';
import { UserProfileComponent } from '../../../user-profile/user-profile.component';

@Component({
  selector: 'app-sidenav-layout',
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListItem,
    MatNavList,
    NgClass,
    RouterLink,
    UserProfileComponent
  ],
  templateUrl: './sidenav-layout.component.html',
  styleUrl: './sidenav-layout.component.css'
})
export class SidenavLayoutComponent {
  protected router = inject(Router);
  protected sidenavService = inject(SidenavService);

  title = input<string>('UniPegaso Bank');

  protected currentRoutePath = toSignal(
    this.router.events.pipe(
      distinctUntilChanged(),
      map(() => window.location.href),
      startWith(window.location.href)
    )
  );
}
