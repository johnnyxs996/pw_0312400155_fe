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
import { InvestmentProductService } from '../investment-product.service';
import { InvestmentProductsPost } from '../../../../api';
import { InvestmentProductTypeNamePipe } from '../investment-product-type-name.pipe';

@Component({
  selector: 'app-investment-product-new',
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PageHeaderComponent,
    InvestmentProductTypeNamePipe
  ],
  templateUrl: './investment-product-new.component.html',
  styleUrl: './investment-product-new.component.css'
})
export class InvestmentProductNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected bankAccountService = inject(BankAccountService);
  protected notificationService = inject(NotificationService);
  protected investmentProductService = inject(InvestmentProductService);

  bankAccountId = this.bankAccountService.currentBankAccountId;

  investmentProductTypes = Object.values(InvestmentProductsPost.TypeEnum);

  investmentProductForm = this.fb.group({
    name: [null, Validators.required],
    rate: [0, Validators.required],
    type: [null, Validators.required]
  });

  createInvestmentProduct(): void {
    if (this.investmentProductForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.investmentProductService
      .createInvestmentProduct(this.investmentProductForm.getRawValue() as unknown as InvestmentProductsPost)
      .pipe(
        catchError((err, caught) => {
          let errorMessage = "Impossibile effettuare l'operazione. Riprovare.";
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => {
          this.notificationService.create('Operazione eseguita con successo', 'success');
          this.router.navigate(['/management', 'investment-product', 'list']);
        })
      )
      .subscribe();
  }
}
