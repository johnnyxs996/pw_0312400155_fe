import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

import { InsurancePolicyGet } from '../../../../../api';
import { InsurancePolicyStatusNamePipe } from '../insurance-policy-status-name.pipe';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-insurance-policy-detail',
  imports: [MatCardModule, InsurancePolicyStatusNamePipe, DatePipe, PageHeaderComponent],
  templateUrl: './insurance-policy-detail.component.html',
  styleUrl: './insurance-policy-detail.component.css'
})
export class InsurancePolicyDetailComponent {
  private route = inject(ActivatedRoute);
  protected currencyService = inject(CurrencyService);

  protected insurancePolicy = toSignal<InsurancePolicyGet>(
    this.route.data.pipe(map((data) => data['insurancePolicy']))
  );
}
