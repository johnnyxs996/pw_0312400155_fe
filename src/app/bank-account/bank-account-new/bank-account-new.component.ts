import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, tap } from 'rxjs';

import { LoggedUserProfileService } from '../../auth/logged-user-profile.service';
import { BankService } from '../../management/bank/bank.service';
import { BankAccountService } from '../bank-account.service';
import { NotificationService } from '../../shared/services/notification.service';
import { BankAccountsPost, BankGet } from '../../../api';
import { Currencies } from '../../shared/models/currency.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-bank-account-new',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    PageHeaderComponent
  ],
  templateUrl: './bank-account-new.component.html',
  styleUrl: './bank-account-new.component.css'
})
export class BankAccountNewComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private bankService = inject(BankService);
  private bankAccountService = inject(BankAccountService);
  private loggedUserProfileService = inject(LoggedUserProfileService);

  protected loggedUserProfileId = signal(this.loggedUserProfileService.loggedUserProfileId);
  protected banksList = toSignal<BankGet[]>(this.bankService.getBanks());
  protected currencies = Currencies;

  userBankAccountForm = this.fb.group({
    bankId: [null, Validators.required],
    currency: ['EUR', Validators.required]
  });

  createBankAccount(): void {
    if (this.userBankAccountForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.bankAccountService
      .createBankAccountForUserProfile(
        this.loggedUserProfileId()!,
        this.userBankAccountForm.getRawValue() as unknown as BankAccountsPost
      )
      .pipe(
        map((bankAccountResponse) => bankAccountResponse.id),
        tap((bankAccountId) => this.router.navigate(['/bank-account', bankAccountId]))
      )
      .subscribe({
        error: (err) => {
          this.notificationService.create(err.message, 'error');
        }
      });
  }
}
