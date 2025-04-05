import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, EMPTY, map, tap } from 'rxjs';

import { LoanService } from '../loan.service';
import { ErrorModelType } from '../../../../shared/models/error.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ModelError, LoansPost } from '../../../../../api';
import { UserProfileService } from '../../../../user-profile/user-profile.service';
import { LoanProductTypeNamePipe } from '../../../../management/loan-product/loan-product-type-name.pipe';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoanProductService } from '../../../../management/loan-product/loan-product.service';

@Component({
  selector: 'app-loan-new',
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    LoanProductTypeNamePipe,
    PageHeaderComponent
  ],
  templateUrl: './loan-new.component.html',
  styleUrl: './loan-new.component.css'
})
export class LoanNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected notificationService = inject(NotificationService);
  protected loanService = inject(LoanService);
  protected loanProductService = inject(LoanProductService);
  protected userProfileService = inject(UserProfileService);

  bankAccountId = toSignal(this.route.parent!.parent!.params.pipe(map((params) => params['bankAccountId'])));

  // TODO: aggiungere prodotti di investimento
  loanProducts = toSignal(this.loanProductService.getLoanProducts());
  selectedLoanProductId = signal<string>('');

  loanForm = this.fb.group({
    amount: [0, Validators.required],
    endDate: [null, Validators.required],
    loanProductId: [null, Validators.required],
    bankAccountId: [this.bankAccountId(), Validators.required]
  });

  createLoan(): void {
    if (this.loanForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.loanService
      .createLoan(this.loanForm.getRawValue() as unknown as LoansPost)
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
          this.router.navigate(['/bank-account', this.bankAccountId()]);
        })
      )
      .subscribe();
  }
}
