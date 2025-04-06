import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { SidenavService } from '../../shared/services/sidenav.service';

@Component({
  selector: 'app-logout',
  imports: [MatButton, RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  protected sidenavService = inject(SidenavService);

  ngOnInit() {
    this.sidenavService.setNavlistConfig([]);
  }
}
