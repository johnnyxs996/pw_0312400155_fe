import { inject, Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private NOTIFICATION_DURATION = 4_000;

  public create(message: string, type: 'error' | 'info' | 'success' = 'info', action?: string): void {
    this.snackBar.open(message, action, {
      duration: this.NOTIFICATION_DURATION,
      panelClass: `snackbar-${type}`
    });
  }
}
