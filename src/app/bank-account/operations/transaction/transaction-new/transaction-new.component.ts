import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, combineLatest, EMPTY, filter, map, tap } from 'rxjs';

import { TransactionService } from '../transaction.service';
import { ErrorModelType } from '../../../../shared/models/error.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ModelError, TransactionsPost, UserProfileGet } from '../../../../../api';
import { TransactionTypeNamePipe } from '../transaction-type-name.pipe';
import { BankAccountService } from '../../../../bank-account/bank-account.service';
import { UserProfileService } from '../../../../user-profile/user-profile.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BankNamePipe } from '../../../../management/bank/bank-name.pipe';

@Component({
  selector: 'app-transaction-new',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    TransactionTypeNamePipe,
    BankNamePipe,
    PageHeaderComponent
  ],
  templateUrl: './transaction-new.component.html',
  styleUrl: './transaction-new.component.css'
})
export class TransactionNewComponent implements OnInit {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected notificationService = inject(NotificationService);
  protected bankAccountService = inject(BankAccountService);
  protected transactionService = inject(TransactionService);
  protected userProfileService = inject(UserProfileService);

  sourceBankAccountId = toSignal(this.route.parent!.parent!.params.pipe(map((params) => params['bankAccountId'])));
  transactionTypes = signal(Object.values(TransactionsPost.TypeEnum));

  selectedTransactionType = signal<TransactionsPost.TypeEnum>(TransactionsPost.TypeEnum.Transfer);
  destinationUserProfile = signal<UserProfileGet | undefined>(undefined);

  executingTransferTransaction = computed(() => this.selectedTransactionType() === TransactionsPost.TypeEnum.Transfer);
  transactionTypeChangeEffect = effect(() => {
    this.transactionTypeChange(this.selectedTransactionType());
  });

  destinationBankAccounts = toSignal(
    this.bankAccountService
      .getBankAccounts()
      .pipe(map((bankAccounts) => bankAccounts.filter((ba) => ba.id !== this.sourceBankAccountId())))
  );

  transactionForm = this.fb.group({
    amount: [0, Validators.required],
    description: [null, Validators.required],
    type: [TransactionsPost.TypeEnum.Transfer, Validators.required],
    fee: [null],
    sourceAccountId: [this.sourceBankAccountId(), Validators.required],
    destinationAccountId: [null, Validators.required]
  });

  ngOnInit() {
    combineLatest([
      this.transactionForm.get('type')?.valueChanges.pipe(
        filter((transactionType) => transactionType !== null),
        tap((transactionType) => {
          this.selectedTransactionType.set(transactionType);
        })
      ),
      this.transactionForm.get('destinationAccountId')?.valueChanges.pipe(
        tap((destinationAccountId) => {
          this.getUserProfileFromBankAccountId(destinationAccountId);
        })
      )
    ]).subscribe();
  }

  createTransaction(): void {
    if (this.transactionForm.invalid) {
      console.log('AAAAA');
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.transactionService
      .createTransaction(this.transactionForm.getRawValue() as unknown as TransactionsPost)
      .pipe(
        catchError((err, caught) => {
          let errorMessage = "Impossibile effettuare l'operazione. Riprovare.";
          if ((err.error as ModelError).type === ErrorModelType.OperationAmountTooLargeError) {
            errorMessage = 'Importo non sufficiente. Riprovare.';
          }
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => {
          this.notificationService.create('Operazione eseguita con successo', 'success');
          this.router.navigate(['/bank-account', this.sourceBankAccountId()]);
        })
      )
      .subscribe();
  }

  transactionTypeChange(transactionType: TransactionsPost.TypeEnum) {
    const transactionSourceAccountFormControl = this.transactionForm.get('sourceAccountId')!;
    const transactionDestinationAccountFormControl = this.transactionForm.get('destinationAccountId')!;
    switch (transactionType) {
      case TransactionsPost.TypeEnum.Transfer:
        this.transactionForm.get('sourceAccountId')!.setValue(this.sourceBankAccountId());
        this.transactionForm.get('sourceAccountId')!.setValidators(Validators.required);
        this.transactionForm.get('destinationAccountId')!.setValue(null);
        this.transactionForm.get('destinationAccountId')!.setValidators(Validators.required);
        break;
      case TransactionsPost.TypeEnum.Deposit:
        this.transactionForm.get('sourceAccountId')!.setValue(null);
        this.transactionForm.get('sourceAccountId')!.clearValidators();
        this.transactionForm.get('destinationAccountId')!.setValue(this.sourceBankAccountId());
        this.transactionForm.get('destinationAccountId')!.setValidators(Validators.required);
        break;
      case TransactionsPost.TypeEnum.Withdraw:
        this.transactionForm.get('sourceAccountId')!.setValidators(Validators.required);
        this.transactionForm.get('sourceAccountId')!.setValue(this.sourceBankAccountId());
        this.transactionForm.get('destinationAccountId')!.clearValidators();
        this.transactionForm.get('destinationAccountId')!.setValue(null);
        break;
    }
    this.transactionForm.get('sourceAccountId')!.updateValueAndValidity({ emitEvent: false });
    this.transactionForm.get('destinationAccountId')!.updateValueAndValidity({ emitEvent: false });
  }

  getUserProfileFromBankAccountId(bankAccountId: string | null) {
    const userProfileId = this.destinationBankAccounts()?.find((b) => b.id === bankAccountId)?.userProfileId;
    if (!userProfileId) {
      this.destinationUserProfile.set(undefined);
      return;
    }
    this.userProfileService
      .getUserProfile(userProfileId)
      .pipe(tap((userProfile) => this.destinationUserProfile.set(userProfile)))
      .subscribe();
  }
}
