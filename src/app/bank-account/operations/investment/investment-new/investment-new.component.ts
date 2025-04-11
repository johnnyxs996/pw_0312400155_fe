import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, EMPTY, tap } from 'rxjs';

import { InvestmentService } from '../investment.service';
import { ErrorModelType } from '../../../../shared/models/error.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ModelError, InvestmentsPost } from '../../../../../api';
import { UserProfileService } from '../../../../user-profile/user-profile.service';
import { InvestmentProductTypeNamePipe } from '../../../../management/investment-product/investment-product-type-name.pipe';
import { InvestmentProductService } from '../../../../management/investment-product/investment-product.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BankAccountService } from '../../../bank-account.service';

@Component({
  selector: 'app-investment-new',
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
    InvestmentProductTypeNamePipe,
    PageHeaderComponent
  ],
  templateUrl: './investment-new.component.html',
  styleUrl: './investment-new.component.css'
})
export class InvestmentNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected bankAccountService = inject(BankAccountService);
  protected notificationService = inject(NotificationService);
  protected investmentService = inject(InvestmentService);
  protected investmentProductService = inject(InvestmentProductService);
  protected userProfileService = inject(UserProfileService);

  bankAccountId = this.bankAccountService.currentBankAccountId;

  investmentProducts = toSignal(this.investmentProductService.getInvestmentProducts());

  investmentForm = this.fb.group({
    amount: [0, Validators.required],
    endDate: [null, Validators.required],
    investmentProductId: [null, Validators.required],
    bankAccountId: [this.bankAccountId(), Validators.required]
  });

  createInvestment(): void {
    if (this.investmentForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.investmentService
      .createInvestment(this.investmentForm.getRawValue() as unknown as InvestmentsPost)
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
