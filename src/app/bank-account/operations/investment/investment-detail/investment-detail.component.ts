import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { InvestmentGet } from '../../../../../api';
import { InvestmentStatusNamePipe } from '../investment-status-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-investment-detail',
  imports: [MatCardModule, InvestmentStatusNamePipe, DatePipe, PageHeaderComponent],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css'
})
export class InvestmentDetailComponent {
  private route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected investment = toSignal<InvestmentGet>(this.route.data.pipe(map((data) => data['investment'])));
}
