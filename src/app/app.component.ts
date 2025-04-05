import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { GlobalSpinnerService } from './shared/services/global-spinner.service';
import { SidenavService } from './shared/services/sidenav.service';
import { SidenavLayoutComponent } from './shared/components/sidenav-layout/sidenav-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinner, SidenavLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
  protected globalSpinnerService = inject(GlobalSpinnerService);
  protected sidenavService = inject(SidenavService);
}
