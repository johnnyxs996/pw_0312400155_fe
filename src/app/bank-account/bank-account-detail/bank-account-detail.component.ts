import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { map } from 'rxjs';

import { BankAccountGet } from '../../../api';
import { BankAccountDetailService } from './bank-account-detail.service';
import { BankAccountDetailInfoComponent } from './bank-account-detail-info/bank-account-detail-info.component';

@Component({
  selector: 'app-bank-account-detail',
  imports: [RouterOutlet, BankAccountDetailInfoComponent],
  templateUrl: './bank-account-detail.component.html',
  styleUrl: './bank-account-detail.component.css'
})
export class BankAccountDetailComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected bankAccountDetailService = inject(BankAccountDetailService);

  protected bankAccount = toSignal<BankAccountGet>(this.route.data.pipe(map((data) => data['bankAccount'])));
}
