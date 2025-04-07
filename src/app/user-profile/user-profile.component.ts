import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-profile',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  protected router = inject(Router);

  changeAccount() {
    this.router.navigate(['/bank-account', 'list']);
  }

  logout(): void {
    this.router.navigate(['/auth', 'logout']);
  }
}
