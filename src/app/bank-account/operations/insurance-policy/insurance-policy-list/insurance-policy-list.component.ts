import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { InsurancePolicyGet } from '../../../../../api';
import { InsurancePolicyStatusNamePipe } from '../insurance-policy-status-name.pipe';
import { BankAccountDetailService } from '../../../bank-account-detail/bank-account-detail.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumns, TableRows } from '../../../../shared/components/table/table.model';
import { BankAccountService } from '../../../bank-account.service';
import { InsurancePolicyProductService } from '../../../../management/insurance-policy-product/insurance-policy-product.service';
import { InsurancePolicyProductTypeNamePipe } from '../../../../management/insurance-policy-product/insurance-policy-product-type-name.pipe';

@Component({
  selector: 'app-insurance-policy-list',
  imports: [TableComponent],
  templateUrl: './insurance-policy-list.component.html',
  styleUrl: './insurance-policy-list.component.css'
})
export class InsurancePolicyListComponent implements OnDestroy, OnInit {
  private route = inject(ActivatedRoute);
  private datePipe = inject(DatePipe);
  private bankAccountService = inject(BankAccountService);
  private bankAccountDetailService = inject(BankAccountDetailService);
  private insurancePolicyProductService = inject(InsurancePolicyProductService);

  bankAccountId = this.bankAccountService.currentBankAccountId;
  protected insurancePolicies = toSignal<InsurancePolicyGet[]>(
    this.route.data.pipe(map((data) => data['insurancePolicies']))
  );

  tableColumns: TableColumns = [
    {
      name: 'startDate',
      label: 'Data di inizio'
    },
    {
      name: 'endDate',
      label: 'Data di fine'
    },
    {
      name: 'status',
      label: 'Stato'
    },
    {
      name: 'insurancePolicyProductId',
      label: 'Tipologia'
    },
    {
      name: 'actions',
      label: 'Azioni'
    }
  ];

  tableRows: Signal<TableRows> = computed(() => {
    const insurancePolicies = this.insurancePolicies();
    if (!insurancePolicies) {
      return [];
    }
    return insurancePolicies.map((insurancePolicy: InsurancePolicyGet) => ({
      startDate: {
        label: this.datePipe.transform(insurancePolicy.startDate)
      },
      endDate: {
        label: this.datePipe.transform(insurancePolicy.endDate)
      },
      status: {
        label: new InsurancePolicyStatusNamePipe().transform(insurancePolicy.status!)
      },
      insurancePolicyProductId: {
        label: new InsurancePolicyProductTypeNamePipe().transform(
          this.insurancePolicyProductService.getInsurancePolicyProduct(insurancePolicy.insurancePolicyProductId!)?.type!
        )
      },
      actions: {
        label: 'Dettaglio',
        route: `/bank-account/${this.bankAccountId()}/insurance-policy/${insurancePolicy.id}`
      }
    })) as TableRows;
  });

  ngOnInit() {
    this.bankAccountDetailService.bankAccountRootVisible.set(true);
  }

  ngOnDestroy() {
    this.bankAccountDetailService.bankAccountRootVisible.set(false);
  }
}
