import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, EMPTY, tap } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { InsurancePolicyProductService } from '../insurance-policy-product.service';
import { InsurancePolicyProductsPost } from '../../../../api';
import { InsurancePolicyProductTypeNamePipe } from '../insurance-policy-product-type-name.pipe';

@Component({
  selector: 'app-insurance-policy-product-new',
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PageHeaderComponent,
    InsurancePolicyProductTypeNamePipe
  ],
  templateUrl: './insurance-policy-product-new.component.html',
  styleUrl: './insurance-policy-product-new.component.css'
})
export class InsurancePolicyProductNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected notificationService = inject(NotificationService);
  protected insurancePolicyProductService = inject(InsurancePolicyProductService);

  insurancePolicyProductTypes = Object.values(InsurancePolicyProductsPost.TypeEnum);

  insurancePolicyProductForm = this.fb.group({
    name: [null, Validators.required],
    annualPremium: [0, Validators.required],
    coverageCap: [0, Validators.required],
    type: [null, Validators.required]
  });

  createInsurancePolicyProduct(): void {
    if (this.insurancePolicyProductForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.insurancePolicyProductService
      .createInsurancePolicyProduct(
        this.insurancePolicyProductForm.getRawValue() as unknown as InsurancePolicyProductsPost
      )
      .pipe(
        catchError((err, caught) => {
          let errorMessage = "Impossibile effettuare l'operazione. Riprovare.";
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => {
          this.notificationService.create('Operazione eseguita con successo', 'success');
          this.router.navigate(['/management', 'insurance-policy-product', 'list']);
        })
      )
      .subscribe();
  }
}
