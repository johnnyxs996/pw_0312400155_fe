import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, EMPTY, tap } from 'rxjs';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { BankService } from '../bank.service';
import { BanksPost } from '../../../../api';

@Component({
  selector: 'app-bank-new',
  imports: [FormsModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, PageHeaderComponent],
  templateUrl: './bank-new.component.html',
  styleUrl: './bank-new.component.css'
})
export class BankNewComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected fb = inject(FormBuilder);
  protected notificationService = inject(NotificationService);
  protected bankService = inject(BankService);

  bankForm = this.fb.group({
    name: [null, Validators.required],
    address: [null],
    phone: [null]
  });

  createBank(): void {
    if (this.bankForm.invalid) {
      this.notificationService.create('Controllare i dati inseriti e riprovare.', 'error');
      return;
    }
    this.bankService
      .createBank(this.bankForm.getRawValue() as unknown as BanksPost)
      .pipe(
        catchError((err, caught) => {
          let errorMessage = "Impossibile effettuare l'operazione. Riprovare.";
          this.notificationService.create(errorMessage, 'error');
          return EMPTY;
        }),
        tap(() => {
          this.notificationService.create('Operazione eseguita con successo', 'success');
          this.router.navigate(['/management', 'bank', 'list']);
        })
      )
      .subscribe();
  }
}
