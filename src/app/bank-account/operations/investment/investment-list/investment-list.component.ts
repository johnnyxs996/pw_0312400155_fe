import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';

import { InvestmentGet } from '../../../../../api';
import { InvestmentStatusNamePipe } from '../investment-status-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';

@Component({
  selector: 'app-investment-list',
  imports: [MatButtonModule, MatTableModule, RouterLink, DatePipe, InvestmentStatusNamePipe, MatIconModule],
  templateUrl: './investment-list.component.html',
  styleUrl: './investment-list.component.css'
})
export class InvestmentListComponent implements OnDestroy, OnInit {
  protected route = inject(ActivatedRoute);
  protected bankAccountDetailService = inject(BankAccountDetailService);
  protected currencyService = inject(CurrencyService);

  bankAccountId: Signal<string> = toSignal(this.route.params.pipe(map((params) => params['bankAccountId'])));
  protected investments = toSignal<InvestmentGet[]>(this.route.data.pipe(map((data) => data['investments'])));

  tableColumns: string[] = ['amount', 'startDate', 'endDate', 'status', 'investmentProductId', 'actions'];

  ngOnInit() {
    this.bankAccountDetailService.bankAccountRootVisible.set(true);
  }

  ngOnDestroy() {
    this.bankAccountDetailService.bankAccountRootVisible.set(false);
  }
}
