import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { LoanGet } from '../../../../../api';
import { LoanStatusNamePipe } from '../loan-status-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-loan-detail',
  imports: [MatCardModule, LoanStatusNamePipe, DatePipe, PageHeaderComponent],
  templateUrl: './loan-detail.component.html',
  styleUrl: './loan-detail.component.css'
})
export class LoanDetailComponent {
  private route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected loan = toSignal<LoanGet>(this.route.data.pipe(map((data) => data['loan'])));
}
