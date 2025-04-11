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

import { InsurancePolicyService } from '../insurance-policy.service';
import { ErrorModelType } from '../../../../shared/models/error.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ModelError, InsurancePoliciesPost } from '../../../../../api';
import { UserProfileService } from '../../../../user-profile/user-profile.service';
import { InsurancePolicyProductService } from '../../../../management/insurance-policy-product/insurance-policy-product.service';
import { InsurancePolicyProductTypeNamePipe } from '../../../../management/insurance-policy-product/insurance-policy-product-type-name.pipe';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BankAccountService } from '../../../bank-account.service';

@Component({
  selector: 'app-insurance-policy-new',
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
    InsurancePolicyProductTypeNamePipe,
    PageHeaderComponent
  ],
  templateUrl: './insurance-policy-new.component.html',
  styleUrl: './insurance-policy-new.component.css'
})
export class InsurancePolicyNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected bankAccountService = inject(BankAccountService);
  protected notificationService = inject(NotificationService);
  protected insurancePolicyService = inject(InsurancePolicyService);
  protected insurancePolicyProductService = inject(InsurancePolicyProductService);
  protected userProfileService = inject(UserProfileService);

  bankAccountId = this.bankAccountService.currentBankAccountId;

  insurancePolicyProducts = toSignal(this.insurancePolicyProductService.getInsurancePolicyProducts());

  insurancePolicyForm = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    insurancePolicyProductId: [null, Validators.required],
    bankAccountId: [this.bankAccountId(), Validators.required]
  });

  createInsurancePolicy(): void {
    if (this.insurancePolicyForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.insurancePolicyService
      .createInsurancePolicy(this.insurancePolicyForm.getRawValue() as unknown as InsurancePoliciesPost)
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
