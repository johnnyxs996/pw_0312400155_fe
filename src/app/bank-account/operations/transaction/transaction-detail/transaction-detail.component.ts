import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { map, switchMap, tap } from 'rxjs';

import { BankAccountService } from '../../../../bank-account/bank-account.service';
import { UserProfileService } from '../../../../user-profile/user-profile.service';
import { BankAccountGet, TransactionGet, TransactionsPost, UserProfileGet } from '../../../../../api';
import { TransactionTypeNamePipe } from '../transaction-type-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BankNamePipe } from '../../../../management/bank/bank-name.pipe';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    MatCardModule,
    MatDividerModule,
    PageHeaderComponent,
    TransactionTypeNamePipe,
    DatePipe,
    BankNamePipe,
    AsyncPipe
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bankAccountService = inject(BankAccountService);
  protected currencyService = inject(CurrencyService);
  private userProfileService = inject(UserProfileService);

  sourceBankAccount = signal<BankAccountGet | undefined>(undefined);
  sourceUserProfile = signal<UserProfileGet | undefined>(undefined);
  destinationBankAccount = signal<BankAccountGet | undefined>(undefined);
  destinationUserProfile = signal<UserProfileGet | undefined>(undefined);

  protected transaction = toSignal<TransactionGet>(this.route.data.pipe(map((data) => data['transaction'])));
  transactionIsOfTypeTransfer = computed(() => this.transaction()?.type === TransactionsPost.TypeEnum.Transfer);

  ngOnInit() {
    if (this.transaction()?.sourceAccountId) {
      this.bankAccountService
        .getBankAccount(this.transaction()!.sourceAccountId)
        .pipe(
          tap((bankAccount) => this.sourceBankAccount.set(bankAccount)),
          switchMap((bankAccount) => this.userProfileService.getUserProfile(bankAccount.userProfileId!))
        )
        .pipe(tap((userProfile) => this.sourceUserProfile.set(userProfile)))
        .subscribe();
    }

    if (this.transaction()?.destinationAccountId) {
      this.bankAccountService
        .getBankAccount(this.transaction()!.destinationAccountId)
        .pipe(
          tap((bankAccount) => this.destinationBankAccount.set(bankAccount)),
          switchMap((bankAccount) => this.userProfileService.getUserProfile(bankAccount.userProfileId!))
        )
        .pipe(tap((userProfile) => this.destinationUserProfile.set(userProfile)))
        .subscribe();
    }
  }
}
