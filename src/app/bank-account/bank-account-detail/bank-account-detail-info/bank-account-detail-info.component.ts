import { Component, inject, input, signal } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { BankAccountGet } from '../../../../api';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-bank-account-detail-info',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './bank-account-detail-info.component.html',
  styleUrl: './bank-account-detail-info.component.css'
})
export class BankAccountDetailInfoComponent {
  protected clipboard = inject(Clipboard);
  protected notificationService = inject(NotificationService);

  bankAccount = input.required<BankAccountGet>();

  balanceVisible = signal(false);

  toggleBalanceVisibility(): void {
    this.balanceVisible.update((visible) => !visible);
  }

  copyIbanCodeToClipboard(): void {
    if (this.bankAccount()?.ibanCode) {
      this.clipboard.copy(this.bankAccount()!.ibanCode!);
      this.notificationService.create('Codice IBAN copiato negli appunti!', 'success');
    }
  }

  copyAccountNumberToClipboard(): void {
    if (this.bankAccount()?.accountNumber) {
      this.clipboard.copy(this.bankAccount()!.accountNumber!);
      this.notificationService.create('Numero conto copiato negli appunti!', 'success');
    }
  }
}
