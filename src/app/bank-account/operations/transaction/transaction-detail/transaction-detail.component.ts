import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
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
import { CardConfig, DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { BankService } from '../../../../management/bank/bank.service';

@Component({
  selector: 'app-transaction-detail',
  imports: [MatCardModule, MatDividerModule, PageHeaderComponent, DetailCardComponent],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent implements OnInit {
  protected route = inject(ActivatedRoute);
  protected datePipe = inject(DatePipe);
  protected bankService = inject(BankService);
  protected bankAccountService = inject(BankAccountService);
  protected currencyService = inject(CurrencyService);
  protected userProfileService = inject(UserProfileService);

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

  baseTransactionDetail: Signal<CardConfig> = computed(
    () =>
      ({
        rows: [
          [
            {
              title: 'Tipologia',
              description: new TransactionTypeNamePipe().transform(this.transaction()!.type)
            },
            {
              title: 'Causale',
              description: this.transaction()!.description
            }
          ],
          [
            {
              title: 'Importo',
              description: `${this.transaction()!.amount} ${this.currencyService.defaultAccountCurrency}`
            },
            {
              title: 'Data operazione',
              description: this.datePipe.transform(this.transaction()!.createdAt)
            }
          ]
        ]
      }) as CardConfig
  );

  sourceTransactionDetail: Signal<CardConfig | undefined> = computed(() => {
    const sourceUserProfile = this.sourceUserProfile();
    const sourceBankAccount = this.sourceBankAccount();
    if (!sourceUserProfile || !sourceBankAccount) {
      return undefined;
    }
    return {
      title: 'Ordinante',
      rows: [
        [
          {
            title: 'Nome',
            description: `${sourceUserProfile!.name} ${sourceUserProfile!.surname}`
          },
          {
            title: 'Numero Conto',
            description: sourceBankAccount!.accountNumber
          }
        ],
        [
          {
            title: 'Filiale',
            description: this.bankService.getBank(sourceBankAccount!.bankId)?.name
          },
          {
            title: 'Codice IBAN',
            description: sourceBankAccount!.ibanCode
          }
        ]
      ]
    };
  });

  destinationTransactionDetail: Signal<CardConfig | undefined> = computed(() => {
    const destinationUserProfile = this.destinationUserProfile();
    const destinationBankAccount = this.destinationBankAccount();
    if (!destinationUserProfile || !destinationBankAccount) {
      return undefined;
    }
    return {
      title: 'Beneficiario',
      rows: [
        [
          {
            title: 'Nome',
            description: `${destinationUserProfile!.name} ${destinationUserProfile!.surname}`
          },
          {
            title: 'Numero Conto',
            description: destinationBankAccount!.accountNumber
          }
        ],
        [
          {
            title: 'Filiale',
            description: this.bankService.getBank(destinationBankAccount!.bankId)?.name
          },
          {
            title: 'Codice IBAN',
            description: destinationBankAccount!.ibanCode
          }
        ]
      ]
    };
  });
}
