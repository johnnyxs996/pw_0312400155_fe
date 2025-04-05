import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';

import { InsurancePolicyGet } from '../../../../../api';
import { InsurancePolicyStatusNamePipe } from '../insurance-policy-status-name.pipe';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';

@Component({
  selector: 'app-insurance-policy-list',
  imports: [MatButtonModule, MatIconModule, RouterLink, DatePipe, MatTableModule, InsurancePolicyStatusNamePipe],
  templateUrl: './insurance-policy-list.component.html',
  styleUrl: './insurance-policy-list.component.css'
})
export class InsurancePolicyListComponent implements OnDestroy, OnInit {
  private route = inject(ActivatedRoute);
  private bankAccountDetailService = inject(BankAccountDetailService);

  bankAccountId: Signal<string> = toSignal(this.route.params.pipe(map((params) => params['bankAccountId'])));
  protected insurancePolicies = toSignal<InsurancePolicyGet[]>(
    this.route.data.pipe(map((data) => data['insurancePolicies']))
  );

  tableColumns: string[] = ['startDate', 'endDate', 'status', 'insurancePolicyProductId', 'actions'];

  ngOnInit() {
    this.bankAccountDetailService.bankAccountRootVisible.set(true);
  }

  ngOnDestroy() {
    this.bankAccountDetailService.bankAccountRootVisible.set(false);
  }
}
