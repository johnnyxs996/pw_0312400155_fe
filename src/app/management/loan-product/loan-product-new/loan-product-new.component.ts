import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, EMPTY, tap } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { BankAccountService } from '../../../bank-account/bank-account.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { LoanProductService } from '../loan-product.service';
import { LoanProductsPost } from '../../../../api';
import { LoanProductTypeNamePipe } from '../loan-product-type-name.pipe';

@Component({
  selector: 'app-loan-product-new',
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PageHeaderComponent,
    LoanProductTypeNamePipe
  ],
  templateUrl: './loan-product-new.component.html',
  styleUrl: './loan-product-new.component.css'
})
export class LoanProductNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected bankAccountService = inject(BankAccountService);
  protected notificationService = inject(NotificationService);
  protected loanProductService = inject(LoanProductService);

  bankAccountId = this.bankAccountService.currentBankAccountId;

  loanProductTypes = Object.values(LoanProductsPost.TypeEnum);

  loanProductForm = this.fb.group({
    name: [null, Validators.required],
    rate: [0, Validators.required],
    type: [null, Validators.required]
  });

  createLoanProduct(): void {
    if (this.loanProductForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.loanProductService
      .createLoanProduct(this.loanProductForm.getRawValue() as unknown as LoanProductsPost)
      .pipe(
        catchError((err, caught) => {
          let errorMessage = "Impossibile effettuare l'operazione. Riprovare.";
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => {
          this.notificationService.create('Operazione eseguita con successo', 'success');
          this.router.navigate(['/management', 'loan-product', 'list']);
        })
      )
      .subscribe();
  }
}
